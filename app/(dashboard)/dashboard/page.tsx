import { WaiverCreateForm } from "@/components/create/waiver-create-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Dashboard",
}

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Create"
                text="Create and view waivers"
            >
                {/* <ModelSelectButton /> */}
            </DashboardHeader>

            <div className="mb-24">
                <WaiverCreateForm
                    user={{
                        id: user.id,
                        name: user.name || "",
                    }}
                />
            </div>
        </DashboardShell>
    )
}
