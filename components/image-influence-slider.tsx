"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SliderProps } from "@radix-ui/react-slider"
import * as React from "react"

interface ImageInfluencerSliderProps {
    defaultValue: SliderProps["defaultValue"]
    onValueChange: SliderProps["onValueChange"]
    value: SliderProps["value"]
}

export function ImageInfluencerSlider({
    defaultValue,
    onValueChange,
    value,
}: ImageInfluencerSliderProps) {
    // const [value, setValue] = React.useState(defaultValue)

    return (
        <div className="grid gap-2 ">
            <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="influence">Influence</Label>
                            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                {value}
                            </span>
                        </div>
                        <Slider
                            id="influence"
                            max={99}
                            min={0}
                            defaultValue={defaultValue}
                            value={value}
                            step={1}
                            onValueChange={onValueChange}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                            aria-label="Reference image influence"
                        />
                    </div>
                </HoverCardTrigger>
                <HoverCardContent
                    align="start"
                    className="w-[260px] text-sm"
                    side="left"
                >
                    Higher values will keep images closer to the source image.
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}
