"use client"
import { useState } from "react"
import { Megaphone, Send, Users, Smartphone, Mail, Globe, CheckCircle2, History } from "lucide-react"

export default function BroadcastClient() {
  const [selectedAudience, setSelectedAudience] = useState("all_parents")
  const [selectedChannels, setSelectedChannels] = useState({
    sms: false,
    email: true,
    portal: true
  })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSend = () => {
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setTimeout(() => setIsSent(false), 3000)
    }, 2000)
  }

  const dummyHistory = [
    { id: 1, title: "Mid-Term Break Announcement", date: "Oct 12, 2026", audience: "All Parents", channels: ["Email", "Portal"] },
    { id: 2, title: "PTA Meeting Reminder", date: "Oct 05, 2026", audience: "All Parents", channels: ["SMS", "Email"] },
    { id: 3, title: "Staff Briefing Rescheduled", date: "Sep 28, 2026", audience: "All Teachers", channels: ["Portal"] },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sans text-[#2C3531] font-bold tracking-tight mb-2">School Broadcasts</h1>
          <p className="text-[#788B81] font-medium leading-relaxed">Send important announcements to parents, students, or staff.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Compose Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 space-y-8">
              
              <div className="flex items-center space-x-3 mb-2 border-b border-[#788B81]/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#788B81]/10 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-[#788B81]" />
                </div>
                <h2 className="text-xl font-sans font-bold text-[#2C3531]">Compose Message</h2>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-3">1. Target Audience</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'all_parents', label: 'All Parents', icon: Users },
                    { id: 'all_teachers', label: 'All Teachers', icon: Users },
                    { id: 'all_students', label: 'All Students', icon: Users },
                    { id: 'specific_class', label: 'Specific Class', icon: Users },
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      onClick={() => setSelectedAudience(aud.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        selectedAudience === aud.id 
                          ? 'border-[#788B81] bg-[#F4F1EC] text-[#2C3531] shadow-sm' 
                          : 'border-[#788B81]/10 hover:border-[#788B81]/30 hover:bg-[#F4F1EC]/30 text-[#788B81]'
                      }`}
                    >
                      <aud.icon className={`w-6 h-6 mb-2 ${selectedAudience === aud.id ? 'text-[#788B81]' : 'text-[#788B81]/60'}`} />
                      <span className="text-sm font-bold">{aud.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Channels */}
              <div>
                <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-3">2. Delivery Channels</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedChannels(prev => ({...prev, sms: !prev.sms}))}
                    className={`flex items-center p-4 rounded-2xl border-2 transition-all ${
                      selectedChannels.sms ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm' : 'border-[#788B81]/10 hover:bg-[#F4F1EC]/30 text-[#788B81]'
                    }`}
                  >
                    <Smartphone className={`w-5 h-5 mr-3 ${selectedChannels.sms ? 'text-amber-500' : 'text-[#788B81]/60'}`} />
                    <div className="text-left">
                      <span className="block text-sm font-bold">SMS Text</span>
                      <span className="block text-xs opacity-70">(Cost applies)</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedChannels(prev => ({...prev, email: !prev.email}))}
                    className={`flex items-center p-4 rounded-2xl border-2 transition-all ${
                      selectedChannels.email ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-sm' : 'border-[#788B81]/10 hover:bg-[#F4F1EC]/30 text-[#788B81]'
                    }`}
                  >
                    <Mail className={`w-5 h-5 mr-3 ${selectedChannels.email ? 'text-blue-500' : 'text-[#788B81]/60'}`} />
                    <div className="text-left">
                      <span className="block text-sm font-bold">Email Blast</span>
                      <span className="block text-xs opacity-70">Free</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedChannels(prev => ({...prev, portal: !prev.portal}))}
                    className={`flex items-center p-4 rounded-2xl border-2 transition-all ${
                      selectedChannels.portal ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm' : 'border-[#788B81]/10 hover:bg-[#F4F1EC]/30 text-[#788B81]'
                    }`}
                  >
                    <Globe className={`w-5 h-5 mr-3 ${selectedChannels.portal ? 'text-emerald-500' : 'text-[#788B81]/60'}`} />
                    <div className="text-left">
                      <span className="block text-sm font-bold">Portal Push</span>
                      <span className="block text-xs opacity-70">Free</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-3">3. Message Content</label>
                <input 
                  type="text" 
                  placeholder="Subject line (e.g., Mid-Term Break Notice)" 
                  className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-t-xl px-4 py-3 text-sm font-bold text-[#2C3531] placeholder:text-[#788B81]/40 focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 border-b-0" 
                />
                <textarea 
                  rows={6} 
                  placeholder="Write your announcement here..." 
                  className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-b-xl px-4 py-3 text-sm font-medium text-[#2C3531] placeholder:text-[#788B81]/40 focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#788B81]/10">
                <button 
                  onClick={handleSend}
                  disabled={isSending || isSent || (!selectedChannels.sms && !selectedChannels.email && !selectedChannels.portal)}
                  className={`px-8 py-3 rounded-full text-sm font-bold shadow-lg transition-all flex items-center ${
                    isSent ? 'bg-emerald-600 hover:bg-emerald-700 text-white' :
                    isSending ? 'bg-[#64766C] text-[#F4F1EC] opacity-80 cursor-wait' :
                    'bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] hover:shadow-xl hover:-translate-y-0.5'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSent ? (
                    <><CheckCircle2 className="w-5 h-5 mr-2" /> Broadcast Sent Successfully</>
                  ) : isSending ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Sending Broadcast...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" /> Send Broadcast Now</>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Broadcast History Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 h-full p-6">
              
              <div className="flex items-center space-x-2 mb-6 border-b border-[#788B81]/10 pb-4">
                <History className="w-5 h-5 text-[#788B81]" />
                <h2 className="text-lg font-sans font-bold text-[#2C3531]">Recent Broadcasts</h2>
              </div>

              <div className="space-y-4">
                {dummyHistory.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-[#788B81]/10 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/50 transition-colors group cursor-pointer">
                    <h3 className="font-bold text-[#2C3531] text-sm group-hover:text-[#788B81] transition-colors line-clamp-2">{item.title}</h3>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#788B81] uppercase tracking-wider">{item.audience}</span>
                      <span className="text-xs font-medium text-[#788B81]/60">{item.date}</span>
                    </div>
                    
                    <div className="mt-2 flex gap-1">
                      {item.channels.map(ch => (
                        <span key={ch} className="px-2 py-0.5 bg-white border border-[#788B81]/20 rounded-md text-[9px] font-bold text-[#788B81] uppercase">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 text-sm font-bold text-[#788B81] hover:text-[#2C3531] transition-colors border-t border-[#788B81]/10 pt-4">
                View All History →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
