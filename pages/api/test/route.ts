import { db } from '@/lib/db';
import { z } from 'zod';

const createTestSchema = z.object({
  data: z.string(),
});

export const POST = async (req, res) => {
  try {
    const body = await req.json();
    const validatedBody = createTestSchema.parse(body);

    const newTest = await db.test.create({
      data: validatedBody,
    });

    res.status(201).json(newTest);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
};

