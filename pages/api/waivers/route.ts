import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type WaiverRequestBody = {
  userId: number;
  text: string;
  signature: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, text, signature } = req.body as WaiverRequestBody;

  if (req.method === "POST") {
    try {
      const waiver = await prisma.waiver.create({
        data: {
          userId,
          text,
          signature
        },
      });
      res.status(200).json(waiver);
    } catch (error) {
      res.status(500).json({ error: "Unable to save waiver" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

