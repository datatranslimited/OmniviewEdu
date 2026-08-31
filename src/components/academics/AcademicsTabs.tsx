"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AcademicsTabs() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Subjects', href: '/tenant/admin/academics' },
    { name: 'Classes', href: '/tenant/admin/academics/classes' },
    { name: 'Lesson Plans', href: '/tenant/admin/academics/lesson-notes' },
    { name: 'Assignments', href: '/tenant/admin/academics/assignments' },
    { name: 'Exams', href: '/tenant/admin/academics/exams' },
    { name: 'Grades & Results', href: '/tenant/admin/academics/grades' },
  ]

  return (
    <div className="border-b border-gray-200 mb-8 overflow-x-auto">
      <nav className="-mb-px flex space-x-8 min-w-max px-2">
        {tabs.map((tab) => {
          // Exact match for Subjects so it doesn't highlight when on child routes
          const isActive = tab.href === '/tenant/admin/academics' 
            ? pathname === tab.href 
            : pathname.includes(tab.href)

          return (
            <Link 
              key={tab.name}
              href={tab.href} 
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive 
                  ? "border-blue-500 text-blue-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
