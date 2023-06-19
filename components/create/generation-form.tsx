"use client"

import { QuillEditor } from "../ui/textarea"
import { Icons } from "@/components/icons"
import { ImageInfluencerSlider } from "@/components/image-influence-slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import {
    findMatchingStyleFromModelId,
    scenarioGenerators,
    scenarioModelData,
    sizeDisabledGenerators,
    sizeLockedGenerators,
    sizeLockedGeneratorsSizeValue,
    supplementalPromptMap,
} from "@/lib/generators"
import { cn, convertBase64 } from "@/lib/utils"
import { generateSchema } from "@/lib/validations/generate"
import { ScenarioInferenceResponse } from "@/types/scenario"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import va from "@vercel/analytics"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "id" | "name" >
}

type FormData = z.infer<typeof generateSchema>

export function GenerationForm({
    user,
    className,
    ...props
}: UserNameFormProps) {
    const {
        setValue,
        getValues,
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(generateSchema),
        defaultValues: {
            prompt: "",
        },
    })



    const [waiverText, setWaiverText] = React.useState<string>("400")

    const [samplingSteps, setSamplingSteps] = React.useState<number[]>([30])
    const [guidance, setGuidance] = React.useState<number[]>([7])
    const [referenceImage, setReferenceImage] = React.useState<any>(null)
    const [referenceImageInfluence, setReferenceImageInfluence] =
        React.useState<number[]>([25])

    const generatePrompt = async (e: any) => {
        e.preventDefault()


        const response = await fetch("/api/generate/prompt-generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        })

        if (!response.ok) {
            if (response.status === 429) {
                return toast({
                    title: "Too many requests",
                    description:
                        "You have gone over your limit for requests to generate prompts. Try again in a second.",
                    variant: "destructive",
                })
            } else {
                throw new Error(response.statusText)
            }
        }

        // This data is a ReadableStream
        const data = response.body
        if (!data) {
            return
        }

        const reader = data.getReader()
        const decoder = new TextDecoder()
        let done = false
        setValue("prompt", "")

        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            setValue(
                "prompt",
                getValues("prompt") + chunkValue?.replace(".", "")
            )
        }
    }

    async function onSubmit(data: FormData) {
        try {
            const response = await fetch(
                `
                /api/generate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        parameters: {
                            prompt: data.prompt,
                            samplingSteps: samplingSteps[0],
                            guidance: guidance[0],
                            influence: referenceImage
                                ? referenceImageInfluence[0]
                                : undefined,
                        },
                    }),
                }
            )

            if (!response?.ok && response.status === 402) {
                return toast({
                    title: "You are out of credits",
                    description:
                        "Purchase more credits to continue generating images, or reduce the amount of images in your generation.",
                    variant: "destructive",
                })
            } else if (!response.ok && response.status === 403) {
                return toast({
                    title: "Pending generations exceed credits",
                    description:
                        "Your current pending generations exceed your credit balance. Purchase more credits to continue generating concurrent image sets.",
                    variant: "destructive",
                })
            } else if (!response.ok) {
                await response.json()
            }

            toast({
                title: "We've queued your generation!",
                description:
                    "This may take a few minutes. Don't worry, if it fails you will not be charged credits. Feel free to generate another image set while you wait.",
                variant: "default",
            })

            const responseData: ScenarioInferenceResponse =
                await response.json()

            reset()
        } catch (e) {
            toast({
                title: "Something went wrong",
                description:
                    "Please try to generate your image again. If the issue persists contact support.",
                variant: "destructive",
            })
        } finally {
        }
    }



    return (
        <>
            <AnimatePresence initial={false}>
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                    >
                        <form
                            className={cn(className)}
                            onSubmit={handleSubmit(onSubmit)}
                            {...props}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex w-full justify-between items-center">
                                        Create Waiver
                                    </CardTitle>

                                    <CardDescription>
                                        Please enter the text of your waiver you would like to create.
                                    </CardDescription>
                                </CardHeader>
                                <QuillEditor setValue={setValue} register={register} />

                                <CardFooter className="flex-col items-start w-full">
                                    <div className="flex flex-col items-start mb-10 w-full">
                                        <div className="flex flex-col items-start w-full">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                   </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            Takes a phrase or
                                                            word from your input
                                                            and builds a prompt
                                                            for you. Powered by
                                                            ChatGPT 3.5 Turbo.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center gap-4 w-full mt-6">
                                    </div>
                                </CardFooter>
                            </Card>
                        </form>
                    </motion.div>
            </AnimatePresence>
        </>
    )
}
