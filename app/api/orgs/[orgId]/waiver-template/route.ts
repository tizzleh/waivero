import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const prisma = new PrismaClient()

const contextSchema = z.object({
  params: z.object({
    orgId: z.string(),
  }),
})

export async function PUT(req: NextApiRequest, context: z.infer<typeof contextSchema>) {
  const { params } = contextSchema.parse(context)
  const { orgId } = params

  try {
    // I assume your waiverTemplate table has a field called `text` for storing the string data,
    // and a field called `orgId` for associating the record with an organization.
    const waiverTemplate = await prisma.waiverTemplate.create({
      data: {
        content: "This is your string data.",
        orgId: orgId,
      },
    })

    return new NextApiResponse(201, waiverTemplate)
  } catch (error) {
    console.error(error)
    return new NextApiResponse(500, { message: "An unexpected error occurred." })
  }
}

