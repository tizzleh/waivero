import { db } from '@/lib/db';
import { z } from 'zod';

// Define the schema
const createWaiverSchema = z.object({
  waiverText: z.string(),
  signature: z.string(),
});

export async function POST(req, res) {
  try {
    const body = await req.json();
    const validatedBody = createWaiverSchema.parse(body);

    const newWaiver = await db.signedWaiver.create({
      data: {
        waiverText: validatedBody.waiverText,
        signature: validatedBody.signature,
      },
    });
      return new Response(JSON.stringify(newWaiver), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 400 })
    } else {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 })
    }
  }
};


