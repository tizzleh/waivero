import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import {
    ScenarioInferenceProgressResponse,
    ScenarioPixelateResponse,
} from "@/types/scenario"
import { getServerSession } from "next-auth/next"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

const routeContextSchema = z.object({
    params: z.object({
        inferenceId: z.string(),
    }),
})



export async function GET(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        const { params } = routeContextSchema.parse(context)
        const { searchParams } = new URL(req.url)
        const modelId = searchParams.get("modelId")
        const orgId = searchParams.get("orgId")

        if (!orgId) {
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

            const outputImages = await db.waiverTemplate.findMany({
                where: {
                    organizationId: session.user.organizationId,
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
            const waiver = await db.waiverTemplate.findUniqueOrThrow({
                where: {
                    uniqueGeneration: {
                        inferenceId: params.inferenceId,
                        modelId: modelId,
                    },
                },
            })

            await db.waiverTemplate.update({
                where: {
                },
                data: {
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
