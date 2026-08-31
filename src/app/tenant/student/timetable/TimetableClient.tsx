"use client"
import { Clock } from "lucide-react"

export default function TimetableClient() {
  const schedule = [
    { day: "Monday", slots: [{ time: "08:00 AM", subject: "Mathematics", teacher: "Mr. Johnson" }, { time: "11:00 AM", subject: "Physics", teacher: "Mrs. Okoro" }, { time: "01:00 PM", subject: "English", teacher: "Ms. Adams" }] },
    { day: "Tuesday", slots: [{ time: "08:00 AM", subject: "Chemistry", teacher: "Dr. Eze" }, { time: "10:30 AM", subject: "Biology", teacher: "Mr. Paul" }] },
    { day: "Wednesday", slots: [{ time: "08:00 AM", subject: "Mathematics", teacher: "Mr. Johnson" }, { time: "01:00 PM", subject: "Physics", teacher: "Mrs. Okoro" }] },
    { day: "Thursday", slots: [{ time: "09:00 AM", subject: "English", teacher: "Ms. Adams" }, { time: "11:30 AM", subject: "Chemistry", teacher: "Dr. Eze" }] },
    { day: "Friday", slots: [{ time: "08:00 AM", subject: "Biology", teacher: "Mr. Paul" }, { time: "10:30 AM", subject: "Physical Education", teacher: "Coach Ojo" }] },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Class Timetable</h1>
        <p className="text-gray-500 mt-1">Your weekly schedule for JSS 1A.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {schedule.map((dayItem, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-amber-500 px-4 py-3 text-center">
              <h3 className="font-bold text-white tracking-wide">{dayItem.day}</h3>
            </div>
            <div className="p-4 space-y-4 min-h-[300px]">
              {dayItem.slots.length === 0 ? (
                <div className="text-center text-gray-400 py-8 text-sm">No classes</div>
              ) : (
                dayItem.slots.map((slot, i) => (
                  <div key={i} className="p-3 bg-amber-50 border border-amber-100 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center text-xs font-semibold text-amber-600 mb-2">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {slot.time}
                    </div>
                    <p className="font-bold text-gray-900 leading-tight">{slot.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">{slot.teacher}</p>
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
