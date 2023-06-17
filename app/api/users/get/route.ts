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

// Define schema for the uploaded text
const uploadTextSchema = z.object({
  text: z.string(),
});

export async function POST(
  req: Request,
  context: z.infer<typeof uploadTextSchema>
) {
  try {
    // Save the uploaded text to the database
    const uploadedText = await db.waiverTemplate.create({
      data: {
        content: context.text,
      },
    });

    return new Response(JSON.stringify(uploadedText), { status: 201 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
