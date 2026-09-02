"use client"
import React, { useState, useTransition } from "react"
import { Users, CreditCard, MessageSquare, Star, TrendingUp, Key, GraduationCap } from "lucide-react"
import Link from "next/link"
import { linkStudentWithPin } from "./actions"

export default function ParentDashboardClient({ appUser, wards }: { appUser: any, wards: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleLinkStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await linkStudentWithPin(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess("Student successfully linked to your account!")
        ;(e.target as HTMLFormElement).reset()
      }
    })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3531]">Parent Portal</h1>
          <p className="text-[#788B81] mt-2 font-medium">Welcome back, {appUser?.first_name || 'Parent'}. Track your children's progress here.</p>
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
                <h2 className="text-xl font-bold text-[#2C3531]">My Linked Wards</h2>
              </div>
              
              {wards.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-[#F4F1EC] rounded-2xl flex items-center justify-center mb-4 border border-[#788B81]/20">
                    <Users className="w-8 h-8 text-[#788B81]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3531] mb-2">No Children Linked Yet</h3>
                  <p className="text-sm text-[#788B81] max-w-sm">
                    Enter the Secure Linking PIN provided by the school using the form on the right to link your child to your account.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wards.map((ward) => (
                    <Link key={ward.id} href={`/tenant/parent/wards/${ward.id}`} className="block">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/50 hover:shadow-md transition-all gap-4">
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex w-12 h-12 bg-white rounded-xl shadow-sm border border-[#788B81]/20 flex-col items-center justify-center text-[#2C3531] overflow-hidden">
                            {ward.photo_url ? (
                              <img src={ward.photo_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <GraduationCap className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#2C3531] text-lg">{ward.first_name} {ward.last_name}</h4>
                            <p className="text-sm font-medium text-[#788B81]">{ward.current_class_arm?.name || 'Unassigned'}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                          <span className="flex items-center text-xs font-bold text-[#2C3531] bg-white px-3 py-2 rounded-xl border border-[#788B81]/20 shadow-sm transition-transform active:scale-95 hover:border-[#2C3531]">
                            View Academic Profile &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Link Child & Quick Links */}
        <div className="space-y-6">
          
          {/* Link Child Form */}
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8">
              <h2 className="text-lg font-bold text-[#2C3531] mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2" /> Link Your Child
              </h2>
              <form onSubmit={handleLinkStudent} className="space-y-4">
                {error && <div className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">{error}</div>}
                {success && <div className="text-xs font-bold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-200">{success}</div>}
                <div>
                  <label className="block text-xs font-bold text-[#788B81] mb-1.5 uppercase tracking-wider">Secure PIN</label>
                  <input 
                    type="text" 
                    name="pin"
                    required
                    placeholder="e.g. 8F3A29"
                    className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 transition-all outline-none uppercase"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#2C3531] hover:bg-black text-[#F4F1EC] font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center"
                >
                  {isPending ? 'Linking...' : 'Link Child'}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 flex flex-col">
              <h2 className="text-lg font-bold text-[#2C3531] mb-4">Quick Links</h2>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {[
                  { label: "Pay Fees", icon: CreditCard, href: "/tenant/parent/fees" },
                  { label: "Feedback", icon: MessageSquare, href: "/tenant/parent/feedback" },
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="group flex flex-col items-center p-4 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/30 hover:bg-[#F4F1EC]/60 transition-colors text-center">
                    <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-[#788B81]/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <action.icon className="w-4 h-4 text-[#2C3531]" />
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
