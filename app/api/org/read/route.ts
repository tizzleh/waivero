import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
      console.error(error); // Log the detailed error in the server console
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

