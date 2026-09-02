import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import ClassesClient from "./ClassesClient"
import AcademicsTabs from "@/components/academics/AcademicsTabs"

export default async function ClassesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') redirect("/tenant/admin")

  let classLevels: any[] = []
  let staffList: any[] = []
  
  try {
    // Fetch all staff members (excluding PARENT and STUDENT)
    staffList = await prisma.user.findMany({
      where: { 
        tenant_id: appUser.tenant_id,
        role: { notIn: ['PARENT', 'STUDENT'] } 
      },
      orderBy: { first_name: 'asc' },
      select: { id: true, first_name: true, last_name: true, role: true }
    })

    classLevels = await prisma.classLevel.findMany({
      where: { tenant_id: appUser.tenant_id },
      orderBy: { order_index: 'asc' },
      include: {
        class_arms: {
          orderBy: { name: 'asc' },
          include: {
            // We use try/catch so this won't break if db push hasn't happened yet
            staff_assignments: {
              include: { staff: true }
            },
            students: true // to get student count
          }
        }
      }
    })
  } catch (error) {
    // Fallback if the database schema is not yet pushed (e.g. staff_assignments table missing)
    console.warn("Prisma error fetching classes (possibly missing SCD tables):", error)
    try {
      classLevels = await prisma.classLevel.findMany({
        where: { tenant_id: appUser.tenant_id },
        orderBy: { order_index: 'asc' },
        include: {
          class_arms: {
            orderBy: { name: 'asc' }
          }
        }
      })
    } catch (e) {
      console.error("Critical error fetching classes:", e)
    }
  }

  // We map the raw Prisma data into the shape expected by ClassesClient
  // We will pass the raw classLevels down to the client.
  // The client will handle the UI logic.
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">Academics Management</h1>
          <p className="text-[#788B81] mt-1 font-medium">Manage classes, arms, and staff assignments.</p>
        </div>
      </div>

      <AcademicsTabs />
      
      {/* We render the interactive client component and pass the DB data to it */}
      <ClassesClient classLevels={classLevels} staffList={staffList} />
    </div>
  )
}

