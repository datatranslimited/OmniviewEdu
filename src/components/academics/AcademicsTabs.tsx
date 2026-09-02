"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AcademicsTabs() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Sessions', href: '/tenant/admin/academics/sessions' },
    { name: 'Classes', href: '/tenant/admin/academics/classes' },
    { name: 'Subjects', href: '/tenant/admin/academics/subjects' },
    { name: 'Scores', href: '/tenant/admin/academics/scores' },
    { name: 'Lesson Plans', href: '/tenant/admin/academics/lesson-notes' },
    { name: 'Assignments', href: '/tenant/admin/academics/assignments' },
    { name: 'Exams', href: '/tenant/admin/academics/exams' },
    { name: 'Grades', href: '/tenant/admin/academics/grades' },
  ]

  return (
    <div className="mb-8 w-full overflow-x-auto pb-4 hide-scrollbar">
      <nav className="inline-flex items-center bg-white/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/60 shadow-sm min-w-max">
        {tabs.map((tab) => {
          // Exact match for Subjects so it doesn't highlight when on child routes
          const isActive = tab.href === '/tenant/admin/academics' 
            ? pathname === tab.href 
            : pathname.includes(tab.href)

          return (
            <Link 
              key={tab.name}
              href={tab.href} 
              className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                isActive 
                  ? "bg-[#2C3531] text-[#F4F1EC] shadow-md shadow-[#2C3531]/20 scale-100" 
                  : "bg-transparent text-[#788B81] hover:text-[#2C3531] hover:bg-[#F4F1EC]/50 scale-95 hover:scale-100"
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
