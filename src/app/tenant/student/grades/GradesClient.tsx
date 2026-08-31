"use client"
import { Download, Filter, BookOpen } from "lucide-react"

export default function GradesClient() {
  const grades = [
    { subject: "Mathematics", ca1: 18, ca2: 15, exam: 58, total: 91, grade: "A" },
    { subject: "English Language", ca1: 15, ca2: 12, exam: 45, total: 72, grade: "B" },
    { subject: "Physics", ca1: 19, ca2: 19, exam: 60, total: 98, grade: "A" },
    { subject: "Chemistry", ca1: 10, ca2: 14, exam: 35, total: 59, grade: "C" },
    { subject: "Biology", ca1: 12, ca2: 11, exam: 45, total: 68, grade: "B" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Grades</h1>
          <p className="text-gray-500 mt-1">Review your performance across all subjects.</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                <option>2026/2027 Academic Session</option>
                <option>2025/2026 Academic Session</option>
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4 text-center bg-gray-50/50">CA 1 (20)</th>
                <th className="px-6 py-4 text-center bg-gray-50/50">CA 2 (20)</th>
                <th className="px-6 py-4 text-center bg-blue-50/30">Exam (60)</th>
                <th className="px-6 py-4 text-center font-bold">Total (100)</th>
                <th className="px-6 py-4 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grades.map((grade, index) => (
                <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-lg mr-3">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-gray-900">{grade.subject}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium bg-gray-50/20">{grade.ca1}</td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium bg-gray-50/20">{grade.ca2}</td>
                  <td className="px-6 py-4 text-center text-gray-900 font-bold bg-blue-50/10">{grade.exam}</td>
                  
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded-lg bg-gray-100 font-bold text-gray-900">
                      {grade.total}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold border
                      ${grade.grade === 'A' ? 'bg-green-50 text-green-700 border-green-200 shadow-sm' : 
                        grade.grade === 'B' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' :
                        grade.grade === 'C' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 shadow-sm' :
                        'bg-red-50 text-red-700 border-red-200 shadow-sm'
                      }`}>
                      {grade.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
