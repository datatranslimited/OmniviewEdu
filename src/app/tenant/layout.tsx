import { redirect } from 'next/navigation'
import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import Sidebar from '@/components/shared/Sidebar'
import TopHeader from '@/components/shared/TopHeader'

import DashboardLayoutClient from '@/components/shared/DashboardLayoutClient'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { tenant: true }
  })

  if (!appUser) {
    // Edge case where user exists in Auth but not Prisma
    redirect('/auth/setup')
  }


  return (
    <DashboardLayoutClient userRole={appUser.role} schoolName={appUser.tenant?.name || "My School"}>
      {children}
    </DashboardLayoutClient>
  )
}
