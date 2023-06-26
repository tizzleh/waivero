import { db } from '@/lib/db';
import { z } from 'zod';

const createTestSchema = z.object({
  waiverText: z.string(),
  orgId: z.number(),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validatedBody = createTestSchema.parse(body);

    const newTest = await db.waiverTemplate.create({
      data: {
        waiverText: validatedBody.waiverText,
        orgId: validatedBody.orgId,
      },
    });
      return new Response(JSON.stringify(newTest), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 400 })
    } else {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 })
    }
  }
};

export async function GET(req, res) {
  const waiverTemplates = await db.waiverTemplate.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  return new Response(JSON.stringify(waiverTemplates), { status: 200 });
}
