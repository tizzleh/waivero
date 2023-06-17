import { Icons } from "@/components/icons"
import { Testimonials } from "@/components/testimonials"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { Repeat, FileMinus, FileText, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60

export default async function IndexPage() {

    const featuredCardData = [
        {
            image: "/pixel-background.png",
            title: "Backgrounds",
            prompts: [
                "Snow-capped peaks",
                "cozy cabin",
                "lush green landscape",
            ],
            imageAlt: "Image showing a cozy cabin with snow",
        },
        {
            image: "/warhammer.png",
            title: "Fantasy RPG",
            prompts: ["Warhammer 40k", "space marine", "galactic"],
            imageAlt: "Image showing a warhammer character portrait pixelated",
        },
        {
            image: "/examples/skillArt/frostbolt4.png",
            title: "32x32 Skill Art",
            prompts: ["Frostbolt", "frigid air", "shades of blue and white"],
            imageAlt: "Image showing a frostbolt skill art pixelated",
        },
        {
            image: "/energy.png",
            title: "16x16 Pixel Portraits",
            prompts: [
                "otherworldly avatar",
                "glowing eyes",
                "neon energy",
                "ethereal form",
            ],
            imageAlt: "16 bit cyberpunk robot portrait",
        },
    ]

    return (
        <>
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                        <Badge variant="secondary">
 Seamlessly Secure, Digitally Signed - Waivero
                        </Badge>
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Streamlining Signatures with Waivero
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                     The Future of Hassle-Free Waivers
                    </p>
                    <div className="space-x-4">
                        <Link
                            href="/login"
                            className={cn(buttonVariants({ size: "lg" }))}
                        >
                            Start for free
                        </Link>
                        <Link
                            href="/admin"
                            className={cn(buttonVariants({ size: "lg" }))}
                        >
                        Go to admin Dashboard
                        </Link>
                        <Link
                            href="/user/dashboard/waivers"
                            className={cn(buttonVariants({ size: "lg" }))}
                        >
                        Go to admin Dashboard
                        </Link>
                        <Link
                            href="/org/dashboard/waivers/view"
                            className={cn(buttonVariants({ size: "lg" }))}
                        >
                        Go to admin Dashboard
                        </Link>
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "lg",
                                })
                            )}
                        >
                            GitHub
                        </Link>
                    </div>
                </div>
            </section>
            <section
                id="examples"
                className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                     Seamlessly Secure, Digitally Signed
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                     Waivero is a digital waiver platform that allows you to create, deploy, and manage waivers.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                    {featuredCardData.map((card) => (
                        <Card key={card.title}>
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                            </CardHeader>

                            <CardContent className="grid gap-4 relative">
                                {card?.image && (
                                    <Image
                                        unoptimized
                                        height={512}
                                        width={512}
                                        src={card.image}
                                        className="w-full rounded-lg overflow-hidden"
                                        alt={card.imageAlt}
                                    />
                                )}
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col items-start flex-wrap">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {card.prompts.map((prompt) => (
                                            <Badge
                                                key={prompt}
                                                variant="secondary"
                                            >
                                                {prompt}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mt-8">
                    <h2 className="font-heading text-xl leading-[1.1] sm:text-xl md:text-4xl my-4">
                        And many more
                    </h2>
                    <Link href="/examples/pixel-background">
                        <Button>View more examples</Button>
                    </Link>
                </div>
            </section>

            <section
                id="features"
                className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Features
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground pb-6 sm:text-lg sm:leading-7">
                    From firsthand experience, we've understood the pitfalls of conventional waiver systems.
                    The tedious navigation through convoluted pages and intricate forms, coupled with the
                    added burden of monitoring expiry dates, present challenges that are unnecessarily complex in our modern,
                    digital era. Such obstacles are not only time-consuming but also detract from the seamless experience we all
                    deserve.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[220rh] flex-col items-center justify-between rounded-md p-6">
                            <Icons.userPlus pb-4 size={48} />
                            <div className="space-y-2">
                                <h3 className="items-center text-center font-bold">Save Profiles</h3>
                                <hr/>
                                <p className="text-sm text-muted-foreground">
                                By enabling users to securely save their profile information,
                                the painful process of repeated data entry becomes a thing of the past.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[220rh] flex-col items-center justify-between rounded-md p-6">
                            <Icons.fileDown pb-4 size={48} />
                            <div className="space-y-2">
                                <h3 className="items-center text-center font-bold">Dowload Waivers</h3>
                                <hr/>
                                <p className="text-sm text-muted-foreground">
                                With Waivero, you can effortlessly download and view your signed waivers at any time
                                and from anywhere.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[220rh] flex-col items-center justify-between rounded-md p-6">
                            <Icons.bellRing pb-4 size={48} />
                            <div className="space-y-2">
                                <h3 className="items-center text-center font-bold">Smart Notifications</h3>
                                <hr/>
                                <p className="text-sm text-muted-foreground">
                                We've integrated a smart notification system to alert users
                                ahead of waiver expiration. Users recieve an email allowing them to sign
                                waivers before their visit.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[220rh] flex-col items-center justify-between rounded-md p-6">
                            <Icons.fileSignature pb-4 size={48} />
                            <div className="space-y-2">
                                <h3 className="items-center text-center font-bold">Electronic Signature</h3>
                                <hr/>
                                <p className="text-sm text-muted-foreground">
                                Create, apply, and validate your unique signatures on digital waivers effortlessly.
                                With Waivero, trust in the confidence of secure, credible, and efficient digital transactions.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[220rh] flex-col items-center justify-between rounded-md p-6">
                            <Icons.layoutDashboard pb-4 size={48} />
                            <div className="space-y-2">
                                <h3 className="items-center text-center font-bold">Organization Dashboard</h3>
                                <hr/>
                                <p className="text-sm text-muted-foreground">
                                Get a real-time view of all waivers associated with your organization, sorted, and easily accessible.
                                With Waivero, take control of your waivers, so you can focus on what really matters – running your
                                organization smoothly.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[220rh] flex-col items-center justify-between rounded-md p-6">
                            <Icons.layoutDashboard pb-4 size={48} />
                            <div className="space-y-2">
                                <h3 className="items-center text-center font-bold">Organization Dashboard</h3>
                                <hr/>
                                <p className="text-sm text-muted-foreground">
                                Get a real-time view of all waivers associated with your organization, sorted, and easily accessible.
                                With Waivero, take control of your waivers, so you can focus on what really matters – running your
                                organization smoothly.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Testimonials />

            <section
                id="open-source"
                className="container py-8 md:py-12 lg:py-24"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Proudly Supporting The Access Fund.
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Waivero is changing the way we deal with waivers.
                        <br /> The code is available on{" "}
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4"
                        >
                            Change Me
                        </Link>
                        .{" "}
                    </p>
                </div>
            </section>
        </>
    )
}
