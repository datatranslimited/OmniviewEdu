"use client"
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react"

export default function AnalyticsClient() {
  return (
    <div className="space-y-6">
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full flex flex-col items-center justify-center text-center">
          
          <div className="w-20 h-20 bg-[#F4F1EC] rounded-full flex items-center justify-center mb-6">
            <BarChart3 className="w-10 h-10 text-[#788B81]" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#2C3531] mb-2">Advanced Analytics</h2>
          <p className="text-[#788B81] max-w-md font-medium mb-8">
            Detailed charts, enrollment trends, and financial reports will be available here once real data is integrated from the database.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
            <div className="p-6 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 flex flex-col items-center">
              <TrendingUp className="w-6 h-6 text-[#788B81] mb-3" />
              <h4 className="font-bold text-[#2C3531]">Financial Trends</h4>
              <p className="text-xs text-[#788B81] mt-1">Fee collection over time</p>
            </div>
            <div className="p-6 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 flex flex-col items-center">
              <Users className="w-6 h-6 text-[#788B81] mb-3" />
              <h4 className="font-bold text-[#2C3531]">Enrollment Stats</h4>
              <p className="text-xs text-[#788B81] mt-1">Student population growth</p>
            </div>
            <div className="p-6 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 flex flex-col items-center">
              <BookOpen className="w-6 h-6 text-[#788B81] mb-3" />
              <h4 className="font-bold text-[#2C3531]">Academic Performance</h4>
              <p className="text-xs text-[#788B81] mt-1">Average grades per class</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
