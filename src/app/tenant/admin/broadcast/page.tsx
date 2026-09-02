import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import BroadcastClient from "./BroadcastClient"

export default async function BroadcastPage() {
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

  const logs = await prisma.notificationLog.findMany({
    where: { tenant_id: appUser.tenant_id },
    include: {
      recipient_user: true
    },
    orderBy: { sent_at: 'desc' },
    take: 100 // Limit to recent 100 for MVP
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2C3531]">Broadcast Engine</h1>
        <p className="text-[#788B81] mt-2 font-medium">Send bulk Email and SMS notifications to parents and staff.</p>
      </div>

      <BroadcastClient logs={logs} />
    </div>
  )
}
