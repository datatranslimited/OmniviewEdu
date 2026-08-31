const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function dedupe() {
  const subjects = await prisma.subject.findMany();
  const seen = new Set();
  const toDelete = [];
  
  for (const sub of subjects) {
    const key = `${sub.tenant_id}-${sub.name}-${sub.section}`;
    if (seen.has(key)) {
      toDelete.push(sub.id);
    } else {
      seen.add(key);
    }
  }
  
  if (toDelete.length > 0) {
    await prisma.subject.deleteMany({ where: { id: { in: toDelete } } });
    console.log(`Deleted ${toDelete.length} duplicates.`);
  } else {
    console.log('No duplicates found.');
  }
}
dedupe().catch(console.error).finally(() => prisma.$disconnect());
