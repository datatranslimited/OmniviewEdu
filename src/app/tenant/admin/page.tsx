import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboardClient from './AdminDashboardClient'
import prisma from '@/lib/prisma'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/auth/login')
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (appUser?.role !== 'SUPER_ADMIN') {
    redirect('/tenant')
  }

  // Fetch Real Dashboard Metrics
  const tenantId = appUser.tenant_id

  const activeSession = await prisma.academicSession.findFirst({
    where: { tenant_id: tenantId, is_current: true }
  })

  const totalStudents = await prisma.student.count({
    where: { tenant_id: tenantId }
  })

  let activeStudents = 0
  if (activeSession) {
    activeStudents = await prisma.studentSessionEnrollment.count({
      where: { tenant_id: tenantId, session_id: activeSession.id }
    })
  }

  const totalStaff = await prisma.user.count({
    where: {
      tenant_id: tenantId,
      role: {
        notIn: ['SUPER_ADMIN', 'PLATFORM_OWNER', 'STUDENT', 'PARENT'] as any
      }
    }
  })

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <AdminDashboardClient 
        metrics={{ totalStudents, activeStudents, totalStaff }} 
        activeSessionName={activeSession ? activeSession.name : "No Active Session"}
      />
    </div>
  )
}
