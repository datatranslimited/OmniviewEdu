"use client"
import React, { useState, useTransition } from "react"
import { Megaphone, Users, Smartphone, Mail, Send, CheckCircle2, History, AlertCircle } from "lucide-react"
import { dispatchBroadcast } from "./actions"
import { format } from "date-fns"

export default function BroadcastClient({ 
  logs
}: {
  logs: any[]
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [messageText, setMessageText] = useState("")

  async function handleDispatch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await dispatchBroadcast(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess(`Successfully broadcasted message to ${res.sentCount} recipients (out of ${res.totalFound} found).`)
        setMessageText("") // Clear message on success
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Composer Side */}
      <div className="lg:col-span-1 space-y-6">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between shadow-sm">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
          </div>
        )}
        
        {success && (
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl border border-emerald-100 flex items-center justify-between shadow-sm">
            <span className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" /> {success}</span>
            <button onClick={() => setSuccess(null)} className="text-emerald-400 hover:text-emerald-600">×</button>
          </div>
        )}

        <div className="bg-[#2C3531] text-white p-6 rounded-[2.5rem] shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold flex items-center mb-6"><Megaphone className="w-5 h-5 mr-2 text-emerald-400" /> New Broadcast</h2>
            
            <form onSubmit={handleDispatch} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Target Audience</label>
                <select name="audience" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none">
                  <option value="" className="text-gray-900">Select Audience...</option>
                  <option value="ALL_PARENTS" className="text-gray-900">All Parents</option>
                  <option value="ALL_STAFF" className="text-gray-900">All Staff (Teachers, Admins)</option>
                  <option value="ALL_USERS" className="text-gray-900">Everyone</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Delivery Channel</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative cursor-pointer">
                    <input type="radio" name="channel" value="SMS" className="peer sr-only" required defaultChecked />
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-white/60 peer-checked:bg-emerald-500/20 peer-checked:border-emerald-500/50 peer-checked:text-emerald-400 transition-all hover:bg-white/10">
                      <Smartphone className="w-5 h-5 mb-1" />
                      <span className="text-xs font-bold">SMS</span>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <input type="radio" name="channel" value="EMAIL" className="peer sr-only" required />
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-white/60 peer-checked:bg-blue-500/20 peer-checked:border-blue-500/50 peer-checked:text-blue-400 transition-all hover:bg-white/10">
                      <Mail className="w-5 h-5 mb-1" />
                      <span className="text-xs font-bold">Email</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium text-white/80">Message Content</label>
                  <span className="text-xs text-white/40">{messageText.length} / 160 (SMS)</span>
                </div>
                <textarea 
                  name="message" 
                  required 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your broadcast message here..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[120px] resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isPending || !messageText.trim()} 
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Dispatching..." : <><Send className="w-4 h-4 mr-2" /> Send Broadcast</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* History Log Side */}
      <div className="lg:col-span-2">
        <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full min-h-[600px]">
          <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 h-full flex flex-col overflow-hidden">
            
            <div className="px-8 py-6 border-b border-[#788B81]/10 flex items-center justify-between bg-[#F4F1EC]/30">
              <h2 className="text-lg font-bold text-[#2C3531] flex items-center"><History className="w-5 h-5 mr-2 text-[#788B81]" /> Dispatch History</h2>
              <span className="text-xs font-bold text-[#788B81] bg-white px-3 py-1 rounded-full border border-[#788B81]/20">Recent 100</span>
            </div>

            <div className="flex-1 overflow-x-auto p-0">
              <table className="min-w-full divide-y divide-[#788B81]/10">
                <thead className="bg-white sticky top-0 z-10">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest border-b border-[#788B81]/10">Sent At</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest border-b border-[#788B81]/10">Recipient</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest border-b border-[#788B81]/10">Channel</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest border-b border-[#788B81]/10">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#788B81]/5">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F4F1EC]/20 transition-colors">
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-[#788B81]">
                        {log.sent_at ? format(new Date(log.sent_at), 'MMM d, yyyy HH:mm') : 'Unknown'}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-[#2C3531]">{log.recipient_user?.first_name} {log.recipient_user?.last_name}</div>
                        <div className="text-xs text-[#788B81]">{log.recipient_phone}</div>
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {log.channel === 'SMS' ? (
                          <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            <Smartphone className="w-3 h-3 mr-1" /> SMS
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                            <Mail className="w-3 h-3 mr-1" /> EMAIL
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {log.status === 'SENT' && <span className="text-xs font-bold text-emerald-600 flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Sent</span>}
                        {log.status === 'FAILED' && <span className="text-xs font-bold text-red-600 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Failed</span>}
                        {log.status === 'PENDING' && <span className="text-xs font-bold text-amber-600">Pending</span>}
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <Megaphone className="w-12 h-12 text-[#788B81]/30 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-[#2C3531]">No Broadcasts Yet</h3>
                        <p className="text-[#788B81] mt-2 text-sm max-w-sm mx-auto">
                          Messages you send from the composer will appear here in the dispatch history log.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
