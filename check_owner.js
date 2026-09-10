const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ where: { role: 'PLATFORM_OWNER' } });
  if (users.length === 0) {
    console.log("No PLATFORM_OWNER found in the database.");
  } else {
    console.log("Found PLATFORM_OWNER:");
    users.forEach(u => console.log(`Email: ${u.email} | Role: ${u.role}`));
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
