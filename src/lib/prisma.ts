// @ts-ignore
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Ensure Prisma client is a singleton in development to prevent too many connections
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

/**
 * Creates an RLS-enabled Prisma client instance for the current tenant context.
 * 
 * @param tenantId The current tenant's UUID
 */
export const getRLSPrismaClient = (tenantId: string) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }: { args: any, query: any }) {
          // Set the tenant ID in the Postgres transaction context
          // so the RLS policies can read it using current_setting('app.current_tenant_id')
          const [, result] = await prisma.$transaction([
            prisma.$executeRaw`SELECT set_config('app.current_tenant_id', ${tenantId}, true)`,
            query(args),
          ])
          return result
        },
      },
    },
  })
}
