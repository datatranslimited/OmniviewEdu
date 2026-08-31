"use client"
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "1,248", change: "+12%", icon: Users, color: "text-[#788B81]", bg: "bg-[#788B81]/10" },
    { label: "Total Staff", value: "84", change: "+2%", icon: GraduationCap, color: "text-[#788B81]", bg: "bg-[#788B81]/10" },
    { label: "Active Classes", value: "42", change: "0%", icon: BookOpen, color: "text-[#788B81]", bg: "bg-[#788B81]/10" },
    { label: "Revenue (Term)", value: "₦42.5M", change: "+15%", icon: CreditCard, color: "text-[#788B81]", bg: "bg-[#788B81]/10" },
  ]

  const recentActivities = [
    { text: "Mrs. Victoria posted JSS 1 Mathematics results", time: "2 hours ago", type: "academic" },
    { text: "Fee payment received from OMV-2023-045", time: "3 hours ago", type: "financial" },
    { text: "New admission: Sarah Jenkins (Primary 4)", time: "5 hours ago", type: "admin" },
    { text: "Mr. Ebenezer requested Sick Leave", time: "1 day ago", type: "hr" },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3531]">Admin Overview</h1>
          <p className="text-[#788B81] mt-2 font-medium">Welcome back, Super Admin. Here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/tenant/admin/broadcast" className="bg-white border border-[#788B81]/20 text-[#2C3531] hover:border-[#2C3531] px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center">
            Send Broadcast
          </Link>
          <button className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" /> {stat.change}
                </span>
              </div>
              <h3 className="text-[#788B81] text-sm font-bold uppercase tracking-widest">{stat.label}</h3>
              <p className="text-3xl font-black text-[#2C3531] mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2C3531]">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Admit Student", icon: Users, href: "/tenant/admin/students" },
                  { label: "Collect Fees", icon: CreditCard, href: "/tenant/admin/bursary" },
                  { label: "Timetable", icon: Calendar, href: "/tenant/admin/timetable" },
                  { label: "Manage Staff", icon: GraduationCap, href: "/tenant/admin/hr" },
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="group flex flex-col items-center p-6 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/30 hover:bg-[#F4F1EC]/60 transition-colors text-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-[#788B81]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <action.icon className="w-5 h-5 text-[#2C3531]" />
                    </div>
                    <span className="text-sm font-bold text-[#2C3531]">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full flex flex-col">
              <h2 className="text-xl font-bold text-[#2C3531] mb-6">Recent Activity</h2>
              <div className="space-y-6 flex-1">
                {recentActivities.map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#788B81] ring-4 ring-[#788B81]/10"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#2C3531]">{act.text}</p>
                      <p className="text-xs font-medium text-[#788B81] mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-[#F4F1EC]/50 hover:bg-[#F4F1EC] text-[#2C3531] rounded-xl font-bold text-sm border border-[#788B81]/10 transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
