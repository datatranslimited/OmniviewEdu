import prisma from "@/lib/prisma"
import PlatformClient from "./PlatformClient"

export default async function PlatformDashboardPage() {
  // Fetch real data from the database
  const tenants = await prisma.tenant.findMany({
    orderBy: { created_at: 'desc' }
  })

  // Get total student count across all tenants
  const totalStudents = await prisma.student.count()

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <PlatformClient tenants={tenants} totalStudents={totalStudents} />
    </div>
  )
}
