"use client"
import { CalendarDays, Clock } from "lucide-react"

export default function TimetableClient() {
  const schedule = [
    { day: "Monday", slots: [{ time: "08:00 AM", subject: "Math", class: "JSS 1A" }, { time: "11:00 AM", subject: "Further Math", class: "SSS 2" }] },
    { day: "Tuesday", slots: [{ time: "09:00 AM", subject: "Math", class: "JSS 1B" }, { time: "01:00 PM", subject: "Math", class: "JSS 1A" }] },
    { day: "Wednesday", slots: [{ time: "08:00 AM", subject: "Further Math", class: "SSS 2" }] },
    { day: "Thursday", slots: [{ time: "10:30 AM", subject: "Math", class: "JSS 1A" }, { time: "02:00 PM", subject: "Math", class: "JSS 1B" }] },
    { day: "Friday", slots: [{ time: "08:00 AM", subject: "Further Math", class: "SSS 2" }] },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Timetable</h1>
        <p className="text-gray-500 mt-1">Your weekly teaching schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {schedule.map((dayItem, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-blue-600 px-4 py-3 text-center">
              <h3 className="font-bold text-white tracking-wide">{dayItem.day}</h3>
            </div>
            <div className="p-4 space-y-4 min-h-[300px]">
              {dayItem.slots.length === 0 ? (
                <div className="text-center text-gray-400 py-8 text-sm">No classes</div>
              ) : (
                dayItem.slots.map((slot, i) => (
                  <div key={i} className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <div className="flex items-center text-xs font-semibold text-blue-600 mb-2">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {slot.time}
                    </div>
                    <p className="font-bold text-gray-900 leading-tight">{slot.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">{slot.class}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
