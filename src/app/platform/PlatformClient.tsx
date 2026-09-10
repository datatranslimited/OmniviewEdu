"use client"

import { Building2, Users, Activity, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function PlatformClient({ 
  tenants, 
  totalStudents 
}: { 
  tenants: any[]
  totalStudents: number 
}) {
  const stats = [
    { label: "Active Tenants", value: tenants.length.toString(), icon: Building2 },
    { label: "Total Students", value: totalStudents.toLocaleString(), icon: Users },
    { label: "Platform Health", value: "99.9%", icon: Activity },
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#2C3531] tracking-normal leading-tight mb-2">Global Overview</h1>
          <p className="text-[#788B81] font-medium leading-relaxed">Manage all provisioned schools and platform health.</p>
        </div>
        <Link href="/platform/schools/new" className="flex items-center px-6 py-3 bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] rounded-full font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]">
          <PlusCircle className="w-5 h-5 mr-2" />
          Provision New School
        </Link>
      </div>

      {/* Stats - Double Bezel style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-4xl font-serif text-[#2C3531]">{stat.value}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#F4F1EC] flex items-center justify-center text-[#788B81]">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tenants Table */}
      <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2rem-0.5rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10">
          <h2 className="text-2xl font-serif text-[#2C3531] tracking-normal mb-6 leading-tight">Provisioned Schools (Tenants)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#788B81]/10">
                  <th className="pb-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">School Name</th>
                  <th className="pb-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Plan</th>
                  <th className="pb-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#788B81]/10">
                {tenants.map(tenant => (
                  <tr key={tenant.id} className="hover:bg-[#F4F1EC]/50 transition-colors">
                    <td className="py-5 font-semibold text-[#2C3531]">{tenant.name}</td>
                    <td className="py-5"><span className="px-3 py-1 bg-[#F4F1EC] text-[#2C3531] rounded-full text-xs font-bold">{tenant.subscription_plan}</span></td>
                    <td className="py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700`}>
                        Active
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="text-sm font-bold text-[#788B81] hover:text-[#2C3531] transition-colors">Manage</button>
                    </td>
                  </tr>
                ))}
                {tenants.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-[#788B81] font-medium">
                      No schools provisioned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
