import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboardPage() {
  // --- MOCKED FOR FRONTEND-FIRST UI TESTING ---
  // const supabase = await createClient()
  // const { data: { user }, error } = await supabase.auth.getUser()
  // if (error || !user) {
  //   redirect('/login')
  // }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <AdminDashboardClient />
    </div>
  )
}
