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

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <AdminDashboardClient />
    </div>
  )
}
