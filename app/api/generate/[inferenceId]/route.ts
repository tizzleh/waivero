import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { supabase } from "@/lib/supabase"
import { pixelateImage, scenarioAuthToken } from "@/lib/utils"
import {
    ScenarioInferenceProgressResponse,
    ScenarioPixelateResponse,
} from "@/types/scenario"
import { decode } from "base64-arraybuffer"
import { getServerSession } from "next-auth/next"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

const routeContextSchema = z.object({
    params: z.object({
        inferenceId: z.string(),
    }),
})

const gridSizeToScenarioPixelMap = {
    16: 32,
    8: 64,
    4: 128,
}

export const uploadImage = async (base64String: string) => {
    const base64FileData = base64String.split("base64,")?.[1]

    const uuid = uuidv4()
    const { data: upload, error } = await supabase.storage
        .from("pixelated")
        .upload(`${uuid}.png`, decode(base64FileData), {
            contentType: "image/png",
            cacheControl: "3600",
            upsert: false,
        })

    const { data } = await supabase.storage
        .from("pixelated")
        .getPublicUrl(`${uuid}.png`)

    if (error) {
        throw new Error(error.message)
    }

    return data
}

type PixelateImageParams = {
    assetId: string
    pixelGridSize: number
    remoteUrl: string
}
export const pixelateImageScenario = async ({
    assetId,
    pixelGridSize,
    remoteUrl,
}: PixelateImageParams) => {
    const pixelateResponse = await fetch(
        `https://api.cloud.scenario.com/v1/images/pixelate`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${scenarioAuthToken}`,
            },
            body: JSON.stringify({
                assetId,
                pixelGridSize: gridSizeToScenarioPixelMap[pixelGridSize],
                returnImage: true,
                removeNoise: true,
            }),
        }
    )

    if (!pixelateResponse.ok) {
        return pixelateImage({
            remoteUrl,
            pixelSize: pixelGridSize,
        })
    }

    const pixelateData: ScenarioPixelateResponse = await pixelateResponse.json()

    return pixelateData.image
}

export async function GET(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        const { params } = routeContextSchema.parse(context)
        const { searchParams } = new URL(req.url)
        const modelId = searchParams.get("modelId")

        if (!modelId) {
            return new Response(null, { status: 400 })
        }

        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new Response(null, { status: 403 })
        }

        // Track the status of our inference progress here
        const inferenceProgress: ScenarioInferenceProgressResponse =
            await fetch(
                `https://api.cloud.scenario.com/v1/models/${modelId}/inferences/${params.inferenceId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${scenarioAuthToken}`,
                    },
                }
            ).then((res) => res.json())

        // If the inference was a success, decrement the user's credits.
        if (inferenceProgress.inference.status === "succeeded") {
            const generation = await db.generation.findUniqueOrThrow({
                where: {
                    uniqueGeneration: {
                        inferenceId: params.inferenceId,
                        modelId: modelId,
                    },
                },
                include: {
                    outputImages: true,
                },
            })

            // If the generation is already complete, return the output images
            if (generation.status === "COMPLETE") {
                let copiedInferenceProgressWithImagesPixelated: ScenarioInferenceProgressResponse =
                    {
                        ...inferenceProgress,
                        outputImages: generation.outputImages,
                    }
                return new Response(
                    JSON.stringify(copiedInferenceProgressWithImagesPixelated),
                    { status: 200 }
                )
            }

            const pixelatedImagesScenario = await Promise.all(
                inferenceProgress.inference.images.map((image) => {
                    if (generation.pixelSize === 32) {
                        return pixelateImage({
                            remoteUrl: image.url,
                            pixelSize: generation.pixelSize,
                        })
                    }
                    return pixelateImageScenario({
                        remoteUrl: image.url,
                        assetId: image.id,
                        pixelGridSize: generation.pixelSize,
                    })
                })
            )

            const pixelatedImages = await Promise.all(
                pixelatedImagesScenario.map((image) => {
                    return uploadImage(image)
                })
            )

            const imagesWithPixelated = inferenceProgress.inference.images.map(
                (image, index) => {
                    return {
                        ...image,
                        pixelated: pixelatedImages[index].publicUrl,
                    }
                }
            )

            await db.$transaction([
                db.user.update({
                    where: {
                        id: session.user.id,
                    },
                    data: {
                        credits: {
                            decrement: generation.numSamples / 4,
                        },
                    },
                }),
                db.generation.update({
                    where: {
                        id: generation.id,
                    },
                    data: {
                        status: "COMPLETE",
                        outputImages: {
                            createMany: {
                                data: imagesWithPixelated.map((image) => {
                                    return {
                                        scenarioImageId: image.id,
                                        image: image.url,
                                        seed: image.seed,
                                        pixelatedImage: image.pixelated,
                                    }
                                }),
                            },
                        },
                    },
                }),
            ])

            const outputImages = await db.outputImage.findMany({
                where: {
                    generationId: generation.id,
                },
            })

            let copiedInferenceProgressWithImagesPixelated: ScenarioInferenceProgressResponse =
                {
                    ...inferenceProgress,
                    outputImages,
                }
            return new Response(
                JSON.stringify(copiedInferenceProgressWithImagesPixelated),
                { status: 200 }
            )
        } else if (inferenceProgress.inference.status === "failed") {
            const generation = await db.generation.findUniqueOrThrow({
                where: {
                    uniqueGeneration: {
                        inferenceId: params.inferenceId,
                        modelId: modelId,
                    },
                },
            })

            await db.generation.update({
                where: {
                    id: generation.id,
                },
                data: {
                    status: "FAILED",
                },
            })
        }

        return new Response(JSON.stringify(inferenceProgress), { status: 200 })
    } catch (error) {
        console.log("Error", error)
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}
