"use client"

import { useState } from "react"
import { updateLeaveStatus } from "./actions"
import { Check, X, CalendarIcon, User } from "lucide-react"

export default function LeaveClient({ leaveRequests }: { leaveRequests: any[] }) {
  const [processing, setProcessing] = useState<string | null>(null)

  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    setProcessing(id)
    await updateLeaveStatus(id, status)
    setProcessing(null)
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#788B81]/20">
      <h2 className="text-xl font-bold text-[#2C3531] mb-6">Leave Requests Queue</h2>

      {leaveRequests.length === 0 ? (
        <div className="text-center py-12 text-[#788B81]">
          No pending leave requests at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {leaveRequests.map((req) => (
            <div key={req.id} className="border border-[#788B81]/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center text-[#2C3531] font-bold text-lg">
                  <User className="w-5 h-5 mr-2 text-[#788B81]" />
                  {req.staff.first_name} {req.staff.last_name}
                  <span className="ml-3 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase">
                    Pending
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-[#788B81]">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                </div>

                <div className="text-sm bg-[#FDFBF7] p-3 rounded-xl border border-[#788B81]/10 mt-2">
                  <span className="font-semibold text-[#788B81]">Reason: </span>
                  {req.reason}
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => handleAction(req.id, "REJECTED")}
                  disabled={processing === req.id}
                  className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold transition-colors disabled:opacity-50 flex items-center"
                >
                  <X className="w-4 h-4 mr-2" /> Reject
                </button>
                <button
                  onClick={() => handleAction(req.id, "APPROVED")}
                  disabled={processing === req.id}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-bold transition-colors disabled:opacity-50 flex items-center"
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
