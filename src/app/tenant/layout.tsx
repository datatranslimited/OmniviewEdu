import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Sidebar from '@/components/shared/Sidebar'
import TopHeader from '@/components/shared/TopHeader'

import DashboardLayoutClient from '@/components/shared/DashboardLayoutClient'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // --- MOCKED FOR FRONTEND-FIRST UI TESTING ---
  const cookieStore = await cookies()
  const mockRole = cookieStore.get('mock_role')?.value || 'SUPER_ADMIN'
  const appUser = { role: mockRole, tenant: { name: "Omniview Academy" } }


  return (
    <DashboardLayoutClient userRole={appUser.role} schoolName={appUser.tenant?.name || "My School"}>
      {children}
    </DashboardLayoutClient>
  )
}
