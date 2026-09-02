import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ParentFeesClient from "./ParentFeesClient"

export default async function ParentFeesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser || appUser.role !== 'PARENT') {
    redirect("/tenant/dashboard")
  }

  // Find Guardian Record
  const guardian = await prisma.guardian.findFirst({
    where: { user_id: appUser.id }
  })

  let invoices: any[] = []

  if (guardian) {
    // Find all linked students
    const studentGuardians = await prisma.studentGuardian.findMany({
      where: { guardian_id: guardian.id },
      include: {
        student: {
          include: {
            current_class_arm: true
          }
        }
      }
    })

    const studentIds = studentGuardians.map(sg => sg.student_id)

    // Fetch invoices for these students
    if (studentIds.length > 0) {
      invoices = await prisma.invoice.findMany({
        where: {
          tenant_id: appUser.tenant_id,
          student_id: { in: studentIds }
        },
        include: {
          student: {
            include: { current_class_arm: true }
          },
          term: true,
          items: {
            include: { fee_category: true }
          }
        },
        orderBy: { created_at: 'desc' }
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2C3531]">School Fees & Billing</h1>
        <p className="text-[#788B81] mt-2 font-medium">Manage and pay your wards' outstanding invoices securely.</p>
      </div>

      {!guardian ? (
        <div className="bg-white p-8 rounded-2xl border border-[#788B81]/20 text-center">
          <p className="text-[#788B81] font-medium">Your parent profile is incomplete. Please contact the school administrator.</p>
        </div>
      ) : (
        <ParentFeesClient invoices={invoices} />
      )}
    </div>
  )
}
