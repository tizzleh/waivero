import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, description } = req.body;

    // Create the organization in the database
    const organization = await prisma.organization.create({
      data: { name, description },
    });

    res.status(201).json(organization);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
