"use client"

import { useState } from "react"
import { submitDailyAttendance } from "./actions"
import { CheckCircle2, UserCheck, UserX, Clock, CalendarIcon } from "lucide-react"

export default function AttendanceClient({ staffList, todayStr }: { staffList: any[], todayStr: string }) {
  const [dateStr, setDateStr] = useState(todayStr)
  const [records, setRecords] = useState<Record<string, { status: any, notes: string }>>(() => {
    const init: any = {}
    staffList.forEach(staff => {
      init[staff.id] = { status: "PRESENT", notes: "" }
    })
    return init
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleStatusChange = (staffId: string, status: any) => {
    setRecords(prev => ({
      ...prev,
      [staffId]: { ...prev[staffId], status }
    }))
  }

  const handleNotesChange = (staffId: string, notes: string) => {
    setRecords(prev => ({
      ...prev,
      [staffId]: { ...prev[staffId], notes }
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setMessage("")
    try {
      const res = await submitDailyAttendance(dateStr, records)
      if (res.success) {
        setMessage("Attendance marked successfully!")
      } else {
        setMessage("Failed to mark attendance.")
      }
    } catch (e) {
      setMessage("An error occurred.")
    }
    setIsSubmitting(false)
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#788B81]/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#2C3531]">Staff Attendance</h2>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="border border-[#788B81]/30 rounded-xl px-4 py-2 outline-none focus:border-[#788B81] bg-[#FDFBF7]"
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#2C3531] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#788B81] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#788B81]/20">
              <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Staff Name</th>
              <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Role</th>
              <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Status</th>
              <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Notes</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} className="border-b border-[#788B81]/10 hover:bg-[#FDFBF7]">
                <td className="py-3 px-4 font-medium text-[#2C3531]">
                  {staff.first_name} {staff.last_name}
                </td>
                <td className="py-3 px-4 text-sm text-[#788B81]">
                  {staff.role.replace('_', ' ')}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(staff.id, "PRESENT")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-colors ${
                        records[staff.id]?.status === "PRESENT" 
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <UserCheck className="w-4 h-4 mr-1" /> Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(staff.id, "ABSENT")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-colors ${
                        records[staff.id]?.status === "ABSENT" 
                          ? "bg-red-100 text-red-700 border border-red-200" 
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <UserX className="w-4 h-4 mr-1" /> Absent
                    </button>
                    <button
                      onClick={() => handleStatusChange(staff.id, "LATE")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-colors ${
                        records[staff.id]?.status === "LATE" 
                          ? "bg-orange-100 text-orange-700 border border-orange-200" 
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <Clock className="w-4 h-4 mr-1" /> Late
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <input
                    type="text"
                    placeholder="Optional notes..."
                    value={records[staff.id]?.notes || ""}
                    onChange={(e) => handleNotesChange(staff.id, e.target.value)}
                    className="w-full bg-transparent border-b border-[#788B81]/30 px-2 py-1 outline-none focus:border-[#788B81] text-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
