import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Get all the users.
    const users = await db.user.findMany();

    return new Response(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

