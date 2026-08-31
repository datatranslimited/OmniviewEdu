const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ take: 5 });
  if (users.length === 0) {
    console.log("No users found in the database.");
  } else {
    console.log("Found users:");
    users.forEach(u => console.log(`Email: ${u.email} | Role: ${u.role}`));
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
