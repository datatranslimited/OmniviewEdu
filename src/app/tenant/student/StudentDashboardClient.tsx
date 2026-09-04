"use client"
import { BookOpen, Calendar, Clock, FileText, ChevronRight, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function StudentDashboardClient() {
  const upcomingClasses = [
    { subject: "Mathematics", teacher: "Mr. Ebenezer", time: "08:00 AM - 09:00 AM", room: "Block A, Rm 1" },
    { subject: "English Language", teacher: "Mrs. Victoria", time: "09:00 AM - 10:00 AM", room: "Block A, Rm 1" },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3531]">Student Dashboard</h1>
          <p className="text-[#788B81] mt-2 font-medium">Welcome back, John Doe. Have a great day of learning!</p>
        </div>
        <div className="flex gap-3">
          <Link href="/tenant/student/timetable" className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center">
            <Calendar className="w-4 h-4 mr-2" /> View Timetable
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/40 p-2 sm:p-2 rounded-[2rem] sm:rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-4 sm:p-6 md:p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2C3531]">Next Classes</h2>
              </div>
              
              <div className="space-y-4">
                {upcomingClasses.map((cls, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex w-12 h-12 bg-white rounded-xl shadow-sm border border-[#788B81]/20 flex-col items-center justify-center text-[#2C3531]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2C3531] text-lg">{cls.subject}</h4>
                        <p className="text-sm font-medium text-[#788B81]">{cls.teacher} • {cls.room}</p>
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

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white/40 p-2 sm:p-2 rounded-[2rem] sm:rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-4 sm:p-6 md:p-8 h-full flex flex-col">
              <h2 className="text-xl font-bold text-[#2C3531] mb-6">Quick Links</h2>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {[
                  { label: "My Grades", icon: GraduationCap, href: "/tenant/student/grades" },
                  { label: "Assignments", icon: FileText, href: "/tenant/student/assignments" },
                  { label: "Exams", icon: BookOpen, href: "/tenant/student/exams" },
                  { label: "Feedback", icon: FileText, href: "/tenant/parent/feedback" },
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="group flex flex-col items-center p-6 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/30 hover:bg-[#F4F1EC]/60 transition-colors text-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-[#788B81]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <action.icon className="w-5 h-5 text-[#2C3531]" />
                    </div>
                    <span className="text-xs font-bold text-[#2C3531]">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
