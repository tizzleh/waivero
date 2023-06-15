import { db } from '@/lib/db';
import { z } from 'zod';

const getOrganizationSchema = z.object({
  id: z.number(),
});

export async function GET(req, res) {
  try {
    const body = await req.json();
    const validatedBody = getOrganizationSchema.parse(body);

    const organization = await db.organization.findUnique({
      where: { id: validatedBody.id },
      include: { waivers: true }, // include the associated waiver texts
    });

    if (!organization) {
      return new Response(JSON.stringify({error: 'Organization not found'}), { status: 404 })
    }

    return new Response(JSON.stringify(organization), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 400 })
    } else {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 })
    }
  }
};

