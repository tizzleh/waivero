import { PrismaClient, Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // creating dummy organizations
  const organizations = [];
  for(let i = 1; i <= 10; i++) {
    const organization = await prisma.organization.create({
      data: {
        id: uuidv4(),
        name: `Organization ${i}`,
        description: `Description for Organization ${i}`,
        // populate other fields as needed
      }
    });
    organizations.push(organization);
  }

  // creating dummy users and associate them with organizations
  for(let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        id: `user${i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: Role.USER,
        // populate other fields as needed
      }
    });

    // associate the user with all organizations
    for(const organization of organizations) {
      await prisma.userOrganization.create({
        data: {
          id: uuidv4(),
          userId: user.id,
          organizationId: organization.id
        }
      });
    }
  }

  // creating dummy waiver templates
  const waiverTemplates = [];
  for(let i = 1; i <= 10; i++) {
    const waiverTemplate = await prisma.waiverTemplate.create({
      data: {
        id: uuidv4(),
        title: `Waiver Template ${i}`,
        content: `Content for Waiver Template ${i}`,
        organizationId: organizations[i-1].id, // associate each waiver template with an organization
        // populate other fields as needed
      }
    });
    waiverTemplates.push(waiverTemplate);
  }

  // creating dummy waivers and associate them with users and organizations
  for(let i = 1; i <= 10; i++) {
    await prisma.waiver.create({
      data: {
        userId: `user${i}`,
        templateId: waiverTemplates[i-1].id,
        organizationId: organizations[i-1].id,
        signature: `Signature for Waiver ${i}`,
        waiverPdf: `waiver${i}.pdf`,
        // populate other fields as needed
      }
    });
  }

  console.log('Dummy data seeded.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

