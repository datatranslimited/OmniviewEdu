"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function HrTabs() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Staff Directory', href: '/tenant/admin/hr/staff' },
    { name: 'Leave Management', href: '/tenant/admin/hr/leave' },
    { name: 'Queries & Disciplinary', href: '/tenant/admin/hr/queries' },
    { name: 'Payroll & Payslips', href: '/tenant/admin/hr/payroll' },
  ]

  return (
    <div className="border-b border-[#788B81]/20 mb-8 overflow-x-auto">
      <nav className="-mb-px flex space-x-8 min-w-max px-2">
        {tabs.map((tab) => {
          const isActive = pathname.includes(tab.href)

          return (
            <Link 
              key={tab.name}
              href={tab.href} 
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm transition-colors ${
                isActive 
                  ? "border-[#2C3531] text-[#2C3531]" 
                  : "border-transparent text-[#788B81] hover:text-[#2C3531] hover:border-[#788B81]/40"
              }`}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
