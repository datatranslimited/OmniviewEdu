import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import BursaryTabs from "@/components/bursary/BursaryTabs"
import InvoicesClient from "./InvoicesClient"

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser || appUser.role !== 'SUPER_ADMIN') {
    redirect("/tenant/admin/dashboard")
  }

  const activeTerm = await prisma.academicTerm.findFirst({
    where: { tenant_id: appUser.tenant_id, is_current: true }
  })

  const classLevels = await prisma.classLevel.findMany({
    where: { tenant_id: appUser.tenant_id },
    orderBy: { order_index: 'asc' }
  })

  let invoices: any[] = []
  
  if (activeTerm) {
    invoices = await prisma.invoice.findMany({
      where: {
        tenant_id: appUser.tenant_id,
        term_id: activeTerm.id
      },
      include: {
        student: {
          include: {
            current_class_arm: true
          }
        },
        items: {
          include: { fee_category: true }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2C3531]">Bursary & Finance</h1>
        <p className="text-[#788B81] mt-2 font-medium">Manage fee categories, structure matrices, and student invoicing.</p>
      </div>

      <BursaryTabs />

      <InvoicesClient 
        activeTerm={activeTerm}
        classLevels={classLevels}
        invoices={invoices}
      />
    </div>
  )
}
