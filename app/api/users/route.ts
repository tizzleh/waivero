import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Unable to create user" });
    } finally {
      await prisma.$disconnect();
    }

  } else {
    res.status(405).json({ error: "Method not allowed" });  // Only POST method is allowed
  }
}

