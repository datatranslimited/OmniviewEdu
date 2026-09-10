"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Users, 
  Settings, 
  LogOut, 
  BookOpen,
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  FileText,
  ClipboardCheck,
  BarChart3,
  Globe,
  Lock,
  Megaphone,
  MessageSquare,
  Star,
  Briefcase,
  FileEdit,
  GraduationCap,
  Package
} from 'lucide-react'

// Dynamic configuration based on user roles
const NAV_CONFIG = {
  SUPER_ADMIN: [
    { name: 'Dashboard', href: '/tenant/admin', icon: LayoutDashboard },
    { name: 'Academics', href: '/tenant/admin/academics', icon: BookOpen },
    { name: 'Students', href: '/tenant/admin/students', icon: Users },
    { name: 'HR & Staff', href: '/tenant/admin/hr', icon: Briefcase },
    { name: 'Inventory & Assets', href: '/tenant/admin/inventory', icon: Package },
    { name: 'Bursary', href: '/tenant/admin/bursary', icon: CreditCard },
    { name: 'Attendance', href: '/tenant/admin/attendance', icon: ClipboardCheck },
    { name: 'Analytics', href: '/tenant/admin/analytics', icon: BarChart3 },
    { name: 'Broadcasts', href: '/tenant/admin/broadcast', icon: Megaphone },
    { name: 'Roles & Permissions', href: '/tenant/admin/roles', icon: Lock },
    { name: 'School Settings', href: '/tenant/admin/settings', icon: Settings },
  ],
  TEACHER: [
    { name: 'Dashboard', href: '/tenant/teacher', icon: LayoutDashboard },
    { name: 'My Classes', href: '/tenant/teacher/classes', icon: Users },
    { name: 'Lesson Notes', href: '/tenant/teacher/notes', icon: FileText },
    { name: 'Assignments', href: '/tenant/teacher/assignments', icon: FileEdit },
    { name: 'Scores & Grades', href: '/tenant/teacher/scores', icon: BookOpen },
    { name: 'Exams & CBT', href: '/tenant/teacher/exams', icon: GraduationCap },
    { name: 'Timetable', href: '/tenant/teacher/timetable', icon: CalendarDays },
    { name: 'HR Hub', href: '/tenant/teacher/hr', icon: Briefcase },
  ],
  STUDENT: [
    { name: 'Dashboard', href: '/tenant/student', icon: LayoutDashboard },
    { name: 'My Grades', href: '/tenant/student/grades', icon: BookOpen },
    { name: 'Assignments', href: '/tenant/student/assignments', icon: FileEdit },
    { name: 'Exams & CBT', href: '/tenant/student/exams', icon: GraduationCap },
    { name: 'Timetable', href: '/tenant/student/timetable', icon: CalendarDays },
    { name: 'Fees & Invoices', href: '/tenant/student/fees', icon: CreditCard },
    { name: 'Feedback & Ratings', href: '/tenant/parent/feedback', icon: Star },
  ],
  PARENT: [
    { name: 'Dashboard', href: '/tenant/parent', icon: LayoutDashboard },
    { name: 'My Wards', href: '/tenant/parent/wards', icon: Users },
    { name: 'Pay Fees', href: '/tenant/parent/fees', icon: CreditCard },
    { name: 'Feedback & Ratings', href: '/tenant/parent/feedback', icon: MessageSquare },
  ],
  PLATFORM_OWNER: [
    { name: 'Platform Overview', href: '/platform', icon: Globe },
    { name: 'Provisioned Schools', href: '/platform/schools', icon: BookOpen },
    { name: 'Global Billing', href: '/platform/billing', icon: CreditCard },
  ]
}

export default function Sidebar({ 
  userRole = 'SUPER_ADMIN',
  isOpen = false,
  setIsOpen = () => {}
}: { 
  userRole?: string
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}) {
  const pathname = usePathname()
  
  // Cast safety: In production, ensure userRole strictly matches keys
  const links = NAV_CONFIG[userRole as keyof typeof NAV_CONFIG] || NAV_CONFIG.SUPER_ADMIN

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-[#788B81] text-[#F4F1EC] border-r border-[#64766C]
        transition-transform duration-300 ease-in-out md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-16 items-center justify-between border-b border-[#64766C] px-5">
          <Link href="/" className="text-xl sm:text-2xl font-serif font-bold tracking-normal leading-none text-[#F4F1EC] hover:text-white transition-colors truncate">
            OmniviewEdu
          </Link>
          {/* Mobile Close Button */}
          <button 
            className="md:hidden text-[#F4F1EC]/70 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <nav className="space-y-1.5 px-3">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Close menu on mobile when link is clicked
                  className={`
                  group flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 relative overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-transparent text-white border border-emerald-500/20 shadow-inner' 
                    : 'text-[#F4F1EC]/70 hover:bg-white/5 hover:text-white'}
                `}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />}
                <link.icon 
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'text-emerald-400 scale-110' : 'text-[#F4F1EC]/60 group-hover:text-emerald-400 group-hover:scale-110'}`} 
                />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
        <div className="border-t border-white/10 p-4 bg-gradient-to-t from-black/20 to-transparent">
          <Link href="/" className="flex items-center px-4 py-3 mb-3 text-sm font-bold text-[#F4F1EC]/90 bg-black/20 hover:bg-black/40 rounded-xl transition-colors w-full group">
            <Globe className="w-4 h-4 mr-3 text-[#F4F1EC]/70 group-hover:text-emerald-400 transition-colors" />
            Go to Landing Page
          </Link>
          <div className="flex items-center px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shadow-inner">
              {userRole.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-[#F4F1EC]/70 group-hover:text-emerald-400 transition-colors">Logged in as</p>
              <p className="text-[10px] font-bold tracking-widest text-white uppercase mt-0.5 truncate">{userRole.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
