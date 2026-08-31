import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name: "Test School",
          slug: "test-school-" + Date.now(),
          email: "test@test.com",
          phone_number: "0000000000",
        },
      });

      await tx.user.create({
        data: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          tenant_id: tenant.id,
          email: "test@test.com",
          role: "SUPER_ADMIN",
          first_name: "Admin",
          last_name: "User",
        },
      });
      console.log("Transaction succeeded!");
      throw new Error("ROLLBACK"); // rollback to keep db clean
    });
  } catch (error: any) {
    if (error.message === "ROLLBACK") {
      console.log("Test completed successfully and rolled back.");
    } else {
      console.error("DB Error:", error);
    }
  }
}
main();
