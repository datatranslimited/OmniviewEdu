"use client"
import { Users, ClipboardCheck, ArrowRight } from "lucide-react"

export default function ClassesClient() {
  const classes = [
    { id: 1, name: "JSS 1A", subject: "Mathematics", students: 45, nextClass: "Today, 08:00 AM", attendance: "Pending" },
    { id: 2, name: "JSS 1B", subject: "Mathematics", students: 42, nextClass: "Today, 01:15 PM", attendance: "Pending" },
    { id: 3, name: "SSS 2 Science", subject: "Further Mathematics", students: 58, nextClass: "Tomorrow, 10:30 AM", attendance: "Completed" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Classes</h1>
          <p className="text-gray-500 mt-1">Manage your assigned classes and record daily attendance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{cls.name}</h3>
                  <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block mt-2">{cls.subject}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Students</span>
                  <span className="font-semibold text-gray-900">{cls.students}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Next Class</span>
                  <span className="font-semibold text-gray-900">{cls.nextClass}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Attendance Today</span>
                  <span className={`font-semibold ${cls.attendance === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                    {cls.attendance}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex gap-3">
              <button className="flex-1 flex items-center justify-center bg-white border border-gray-200 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors">
                <ClipboardCheck className="w-4 h-4 mr-2" />
                Attendance
              </button>
              <button className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                View Roster
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
