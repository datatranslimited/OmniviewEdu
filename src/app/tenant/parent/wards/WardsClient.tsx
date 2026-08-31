"use client"
import { Users, Plus, FileText, Activity } from "lucide-react"

export default function WardsClient() {
  const wards = [
    { name: "Adebayo Johnson", class: "JSS 1A", studentId: "STU-001", attendance: "98%", average: "B+" },
    { name: "Fatima Johnson", class: "Primary 4", studentId: "STU-082", attendance: "96%", average: "A-" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Wards</h1>
          <p className="text-gray-500 mt-1">Monitor the academic progress of your linked children.</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Link New Ward
        </button>
      </div>

      {/* Grid of Wards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {wards.map((ward, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                    {ward.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{ward.name}</h3>
                    <p className="text-sm font-medium text-gray-500">{ward.class} • {ward.studentId}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Activity className="w-4 h-4 mr-1 text-emerald-500" />
                    Attendance
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{ward.attendance}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <FileText className="w-4 h-4 mr-1 text-blue-500" />
                    Current Grade
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{ward.average}</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 bg-gray-50/50 p-4 flex gap-3">
              <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                View Timetable
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Full Report Card
              </button>
            </div>
          </div>
        ))}

        {/* Link New Ward Empty State Card */}
        <div className="bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Have another child?</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Enter the Secure Linking PIN provided by the school admin to link another ward to your account.
          </p>
          <div className="flex w-full max-w-xs">
            <input 
              type="text" 
              placeholder="Enter PIN (e.g. 1234-ABCD)" 
              className="flex-1 rounded-l-xl border border-r-0 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-xl text-sm font-medium hover:bg-blue-700 transition-colors">
              Link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
