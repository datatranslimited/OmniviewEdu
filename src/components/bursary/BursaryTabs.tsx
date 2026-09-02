"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BursaryTabs() {
  const pathname = usePathname()

  const tabs = [
    { name: "Fee Setup", href: "/tenant/admin/bursary/fees" },
    { name: "Invoices & Payments", href: "/tenant/admin/bursary/invoices" },
  ]

  return (
    <div className="flex space-x-1 border-b border-[#788B81]/20">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 ${
              isActive
                ? "border-[#2C3531] text-[#2C3531]"
                : "border-transparent text-[#788B81] hover:text-[#2C3531] hover:border-[#788B81]/40"
            }`}
          >
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
