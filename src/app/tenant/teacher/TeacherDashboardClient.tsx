"use client"
import { Users, BookOpen, Calendar, Clock, ChevronRight, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboardClient() {
  const stats = [
    { label: "Total Students", value: "142", icon: Users, color: "text-[#788B81]", bg: "bg-[#788B81]/10" },
    { label: "Classes Assigned", value: "4", icon: BookOpen, color: "text-[#788B81]", bg: "bg-[#788B81]/10" },
    { label: "Pending Grades", value: "12", icon: FileText, color: "text-amber-600", bg: "bg-amber-100" },
  ]

  const upcomingClasses = [
    { subject: "Mathematics", class: "JSS 1 A", time: "08:00 AM - 09:00 AM", room: "Block A, Rm 1" },
    { subject: "Mathematics", class: "JSS 2 B", time: "10:30 AM - 11:30 AM", room: "Block B, Rm 4" },
    { subject: "Further Math", class: "SS 1 Science", time: "12:30 PM - 01:30 PM", room: "Science Lab" },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3531]">Teacher Dashboard</h1>
          <p className="text-[#788B81] mt-2 font-medium">Welcome back, Mr. Ebenezer. Here is your schedule for today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/tenant/teacher/notes" className="bg-white border border-[#788B81]/20 text-[#2C3531] hover:border-[#2C3531] px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center">
            Write Lesson Note
          </Link>
          <button className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95">
            Mark Attendance
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-6 flex flex-col h-full flex-row items-center">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-[#788B81] text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
                  <p className="text-2xl font-black text-[#2C3531] mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2C3531]">Today's Schedule</h2>
                <Link href="/tenant/teacher/timetable" className="text-sm font-bold text-[#788B81] hover:text-[#2C3531] flex items-center">
                  Full Timetable <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingClasses.map((cls, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex w-12 h-12 bg-white rounded-xl shadow-sm border border-[#788B81]/20 flex-col items-center justify-center text-[#2C3531]">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2C3531] text-lg">{cls.subject}</h4>
                        <p className="text-sm font-medium text-[#788B81]">{cls.class} • {cls.room}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <span className="flex items-center text-sm font-bold text-[#2C3531] bg-white px-3 py-1.5 rounded-lg border border-[#788B81]/20">
                        <Clock className="w-4 h-4 mr-2 text-[#788B81]" /> {cls.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tasks */}
        <div className="space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full flex flex-col">
              <h2 className="text-xl font-bold text-[#2C3531] mb-6">Pending Tasks</h2>
              <div className="space-y-4 flex-1">
                {[
                  { text: "Grade JSS 1 Math Mid-Terms", status: "urgent" },
                  { text: "Submit Week 4 Lesson Notes", status: "pending" },
                  { text: "Reply to HR Query", status: "urgent" },
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#788B81]/10 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="mt-0.5">
                      {task.status === 'urgent' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-bold text-[#2C3531] leading-snug">{task.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
