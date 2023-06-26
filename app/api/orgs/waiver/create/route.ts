// File: pages/api/org/waiver/create.js

import { db } from '@/lib/db';
import { z } from 'zod';

// Define the schema
const createWaiverSchema = z.object({
  waiverText: z.string(),
  signature: z.string(),
});

export async function POST(req, res) {
  try {
    const validatedBody = createWaiverSchema.parse(req.body);

    const newWaiver = await db.waiver.create({
      data: {
        waiverText: validatedBody.waiverText,
        signature: validatedBody.signature,
      },
    });

    res.status(201).json(newWaiver);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.errors);
    } else {
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};

