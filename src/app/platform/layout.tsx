import { cookies } from 'next/headers'
import DashboardLayoutClient from '@/components/shared/DashboardLayoutClient'

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const mockRole = cookieStore.get('mock_role')?.value || 'PLATFORM_OWNER'
  
  return (
    <DashboardLayoutClient userRole={mockRole} schoolName="OmniviewEdu Global HQ">
      {children}
    </DashboardLayoutClient>
  )
}
