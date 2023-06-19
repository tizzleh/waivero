import LoginLink from "@/emails/LoginLink"
import WelcomeEmail from "@/emails/WelcomeEmail"
import { sendMail, sendMarketingMail } from "@/emails/index"
import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

const googleClientId = process.env.GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string

let authOptionsWithEvents = {
    ...authOptions,
    events: {
        async signIn(message) {
            if (message.isNewUser) {
                const email = message.user.email
                const name = message.user.name

                if (email) {
                  await Promise.all([
                        sendMarketingMail({
                            subject: "🎨 Welcome to Waivero",
                            to: email,
                            component: (
                                <WelcomeEmail name={name ?? undefined} />
                            ),
                        }),
                    ])
                }
            }
        },
    },
}

authOptionsWithEvents.providers = [
    GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
    }),
    EmailProvider({
        sendVerificationRequest: async ({ identifier, url, provider }) => {
            await sendMail({
                subject: "Your Waivero.com Login Link",
                to: identifier,
                component: <LoginLink url={url} />,
            })
        },
    }),
]

const handler = NextAuth(authOptionsWithEvents)

export { handler as GET, handler as POST }
