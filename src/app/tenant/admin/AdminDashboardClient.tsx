"use client"
import Link from "next/link"
import { formatUnambiguousDate } from "@/lib/formatDate"

export default function AdminDashboardClient({ 
  metrics,
  activeSessionName
}: {
  metrics: { totalStudents: number; activeStudents: number; totalStaff: number }
  activeSessionName: string
}) {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <div>
      {/* Greeting Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2C3531] tracking-normal leading-tight mb-2">Welcome back, Admin!</h1>
          <p className="text-[#788B81] font-medium leading-relaxed">Session: {activeSessionName}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Students Card */}
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col justify-between h-full">
            <div>
              <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">Total Students</p>
              <h3 className="text-4xl font-serif text-[#2C3531]">{metrics.totalStudents}</h3>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[#788B81] font-bold bg-[#F4F1EC] px-2 py-0.5 rounded mr-2">{metrics.activeStudents} Active</span>
              <span className="text-[#788B81]/60">currently enrolled</span>
            </div>
          </div>
        </div>

        {/* Staff Card */}
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col justify-between h-full">
            <div>
              <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">Total Staff</p>
              <h3 className="text-4xl font-serif text-[#2C3531]">{metrics.totalStaff}</h3>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[#788B81]/60">across all departments</span>
            </div>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col justify-between h-full opacity-50">
            <div>
              <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">Today's Attendance</p>
              <h3 className="text-4xl font-serif text-[#2C3531]">0%</h3>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[#788B81]/60">No data recorded today</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col justify-between h-full opacity-50">
            <div>
              <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">Term Revenue</p>
              <h3 className="text-3xl font-serif text-[#2C3531]">{formatCurrency(0)}</h3>
            </div>
            <div className="mt-4 w-full bg-[#F4F1EC] rounded-full h-2 mb-2">
              <div className="bg-[#788B81] h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#788B81] font-bold uppercase tracking-wider">
              <span>Collected</span>
              <span>{formatCurrency(0)} Target</span>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions (Takes up 1 column on LG) */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xl font-serif text-[#2C3531] border-b border-[#788B81]/20 pb-2">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/tenant/admin/students" className="flex items-center p-4 bg-white/60 border border-[#788B81]/20 rounded-2xl hover:border-[#788B81] hover:shadow-sm transition-all group backdrop-blur-sm">
              <div className="bg-[#F4F1EC] p-3 rounded-full text-[#788B81] group-hover:bg-[#788B81] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <div className="ml-4">
                <p className="font-bold text-[#2C3531] group-hover:text-[#788B81]">Enroll Student</p>
                <p className="text-xs text-[#788B81]/70">Add a new student to the roster</p>
              </div>
            </Link>
            
            <Link href="/tenant/admin/bursary" className="flex items-center p-4 bg-white/60 border border-[#788B81]/20 rounded-2xl hover:border-[#788B81] hover:shadow-sm transition-all group backdrop-blur-sm">
              <div className="bg-[#F4F1EC] p-3 rounded-full text-[#788B81] group-hover:bg-[#788B81] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="ml-4">
                <p className="font-bold text-[#2C3531] group-hover:text-[#788B81]">Generate Invoice</p>
                <p className="text-xs text-[#788B81]/70">Bill a student for school fees</p>
              </div>
            </Link>
            
            <Link href="/tenant/admin/attendance" className="flex items-center p-4 bg-white/60 border border-[#788B81]/20 rounded-2xl hover:border-[#788B81] hover:shadow-sm transition-all group backdrop-blur-sm">
              <div className="bg-[#F4F1EC] p-3 rounded-full text-[#788B81] group-hover:bg-[#788B81] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </div>
              <div className="ml-4">
                <p className="font-bold text-[#2C3531] group-hover:text-[#788B81]">Mark Attendance</p>
                <p className="text-xs text-[#788B81]/70">Record daily roll calls</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Activity Feed (Takes up 2 columns on LG) */}
        <div className="lg:col-span-2">
          <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 h-full overflow-hidden">
              <div className="px-6 py-5 border-b border-[#788B81]/10 flex justify-between items-center">
                <h3 className="text-xl font-serif text-[#2C3531]">Recent Activity</h3>
              </div>
              <div className="p-12 text-center text-[#788B81]">
                <p className="font-medium">No recent activity to display.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
