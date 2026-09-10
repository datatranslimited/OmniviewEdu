import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import DashboardLayoutClient from '@/components/shared/DashboardLayoutClient'

export default async function PlatformLayout({
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
  })

  if (!appUser || appUser.role !== 'PLATFORM_OWNER') {
    redirect('/tenant')
  }
  
  return (
    <DashboardLayoutClient 
      userRole={appUser.role} 
      schoolName="OmniviewEdu Global HQ"
      userEmail={appUser.email}
      userFirstName={appUser.first_name}
      userLastName={appUser.last_name}
    >
      {children}
    </DashboardLayoutClient>
  )
}
