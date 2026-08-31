"use client"
import { Users, CreditCard, MessageSquare, Star, ChevronRight, CheckCircle2, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ParentDashboardClient() {
  const wards = [
    { name: "John Doe", class: "JSS 1 A", performance: "Excellent", feeStatus: "Paid" },
    { name: "Jane Doe", class: "Primary 4", performance: "Good", feeStatus: "Pending" },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3531]">Parent Portal</h1>
          <p className="text-[#788B81] mt-2 font-medium">Welcome back, Mr. Doe. Track your children's progress here.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/tenant/parent/fees" className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center">
            <CreditCard className="w-4 h-4 mr-2" /> Pay Outstanding Fees
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Wards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2C3531]">My Wards</h2>
              </div>
              
              <div className="space-y-4">
                {wards.map((ward, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex w-12 h-12 bg-white rounded-xl shadow-sm border border-[#788B81]/20 flex-col items-center justify-center text-[#2C3531]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2C3531] text-lg">{ward.name}</h4>
                        <p className="text-sm font-medium text-[#788B81]">{ward.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        <TrendingUp className="w-3 h-3 mr-1" /> {ward.performance}
                      </span>
                      {ward.feeStatus === 'Paid' ? (
                        <span className="flex items-center text-xs font-bold text-[#788B81] bg-white px-3 py-1.5 rounded-lg border border-[#788B81]/20">
                          Fees Paid
                        </span>
                      ) : (
                        <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                          Fees Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Links */}
        <div className="space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full flex flex-col">
              <h2 className="text-xl font-bold text-[#2C3531] mb-6">Quick Links</h2>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {[
                  { label: "Pay Fees", icon: CreditCard, href: "/tenant/parent/fees" },
                  { label: "Feedback", icon: MessageSquare, href: "/tenant/parent/feedback" },
                  { label: "Rate Teachers", icon: Star, href: "/tenant/parent/feedback" },
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
