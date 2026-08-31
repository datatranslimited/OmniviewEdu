"use client"
import Link from "next/link"
import { formatUnambiguousDate } from "@/lib/formatDate"

// --- DUMMY DATA ---
const metrics = {
  totalStudents: 452,
  activeStudents: 440,
  totalStaff: 48,
  attendanceRate: "94%",
  revenueCollected: 9250000,
  revenueExpected: 15500000
}

const recentActivities = [
  { id: 1, type: "PAYMENT", description: "Payment of ₦150,000 received for John Doe (Term 1 Tuition)", time: new Date(Date.now() - 1000 * 60 * 30).toISOString() }, // 30 mins ago
  { id: 2, type: "ENROLLMENT", description: "New student Neriah Igbowe was enrolled into JSS 1 A", time: new Date(Date.now() - 1000 * 60 * 120).toISOString() }, // 2 hours ago
  { id: 3, type: "ATTENDANCE", description: "Primary 1 Gold attendance marked (28/30 present)", time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }, // 1 day ago
  { id: 4, type: "STAFF", description: "Mr. Ebenezer Ali's profile was updated", time: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() }, // 2 days ago
]

export default function AdminDashboardClient() {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
  }

  const getTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours} hours ago`
    return formatUnambiguousDate(dateString)
  }

  return (
    <div>
      {/* Greeting Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2C3531] tracking-normal leading-tight mb-2">Welcome back, Admin!</h1>
          <p className="text-[#788B81] font-medium leading-relaxed">Session: 2024/2025 • First Term</p>
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
              <span className="text-[#788B81] font-bold bg-[#F4F1EC] px-2 py-0.5 rounded mr-2">Online</span>
              <span className="text-[#788B81]/60">across all departments</span>
            </div>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col justify-between h-full">
            <div>
              <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">Today's Attendance</p>
              <h3 className="text-4xl font-serif text-[#2C3531]">{metrics.attendanceRate}</h3>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[#788B81] font-bold flex items-center mr-2">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                +2%
              </span>
              <span className="text-[#788B81]/60">vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col justify-between h-full">
            <div>
              <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">Term Revenue</p>
              <h3 className="text-3xl font-serif text-[#2C3531]">{formatCurrency(metrics.revenueCollected)}</h3>
            </div>
            <div className="mt-4 w-full bg-[#F4F1EC] rounded-full h-2 mb-2">
              <div className="bg-[#788B81] h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#788B81] font-bold uppercase tracking-wider">
              <span>Collected</span>
              <span>{formatCurrency(metrics.revenueExpected)} Target</span>
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
                <button className="text-sm font-bold text-[#788B81] hover:text-[#2C3531] transition-colors uppercase tracking-wider">View All</button>
              </div>
              <div className="p-6">
                <ul className="space-y-6">
                  {recentActivities.map((activity, index) => (
                    <li key={activity.id} className="relative flex gap-x-4">
                      <div className={
                        `relative flex h-10 w-10 flex-none items-center justify-center rounded-full ring-2 ring-white shadow-sm
                        ${activity.type === 'PAYMENT' ? 'bg-[#788B81]/10 text-[#788B81]' :
                          activity.type === 'ENROLLMENT' ? 'bg-[#2C3531]/10 text-[#2C3531]' :
                          'bg-[#F4F1EC] text-[#788B81]'}`
                      }>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      {index !== recentActivities.length - 1 && (
                        <span className="absolute left-5 top-10 -ml-px h-full w-0.5 bg-[#788B81]/10" aria-hidden="true"></span>
                      )}
                      <div className="flex-auto rounded-md py-1">
                        <p className="text-sm font-medium text-[#2C3531]">{activity.description}</p>
                        <p className="text-xs text-[#788B81] font-medium mt-1">{getTimeAgo(activity.time)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
