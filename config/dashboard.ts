import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Create",
            href: "/dashboard",
        },
        {
            title: "Examples",
            href: "/examples/pixel-background",
        },
    ],
    sidebarNav: [
        {
            title: "Create",
            href: "/dashboard",
            icon: "terminal",
        },
        {
            title: "Signed Waivers",
            href: "/dashboard/waivers",
            icon: "imagePlus",
        },
        {
            title: "Refer & Earn",
            href: "/dashboard/refer-users",
            icon: "userPlus",
        },
        {
            title: "Plans & Billing",
            href: "/dashboard/billing",
            icon: "billing",
        },
    ],
}
