import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function get(req, res) {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
        console.error(error);
    }
}

