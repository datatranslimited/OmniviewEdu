"use client"
import { useState } from "react"
import { Check, Download, Search, Filter } from "lucide-react"

export default function ScoresClient() {
  const [selectedClass, setSelectedClass] = useState("JSS 1A")
  
  // Dummy Spreadsheet Data
  const students = [
    { id: "STU-001", name: "Adebayo Johnson", ca1: 18, ca2: 15, exam: 58, total: 91, grade: "A" },
    { id: "STU-002", name: "Chioma Nwosu", ca1: 15, ca2: 12, exam: 45, total: 72, grade: "B" },
    { id: "STU-003", name: "David Olatunji", ca1: 19, ca2: 19, exam: 60, total: 98, grade: "A" },
    { id: "STU-004", name: "Fatima Yusuf", ca1: 10, ca2: 14, exam: 35, total: 59, grade: "C" },
    { id: "STU-005", name: "Grace Chukwu", ca1: 12, ca2: 11, exam: 25, total: 48, grade: "D" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Scores & Grades</h1>
          <p className="text-gray-500 mt-1">Input continuous assessment and exam scores.</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm">
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </button>
          <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors shadow-sm">
            <Check className="w-5 h-5 mr-2" />
            Save Grades
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="JSS 1A">JSS 1A - Mathematics</option>
                <option value="JSS 1B">JSS 1B - Mathematics</option>
                <option value="SSS 2">SSS 2 - Further Math</option>
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search student..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
        </div>

        {/* Spreadsheet UI */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-16">S/N</th>
                <th className="px-6 py-4 w-64">Student Name</th>
                <th className="px-6 py-4 w-32">Student ID</th>
                <th className="px-4 py-4 w-28 text-center bg-blue-50/50">CA 1 (20)</th>
                <th className="px-4 py-4 w-28 text-center bg-blue-50/50">CA 2 (20)</th>
                <th className="px-4 py-4 w-28 text-center bg-indigo-50/50">Exam (60)</th>
                <th className="px-6 py-4 text-center">Total (100)</th>
                <th className="px-6 py-4 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-3 text-gray-400">{index + 1}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-3 text-gray-500 font-mono text-xs">{student.id}</td>
                  
                  {/* CA 1 Input */}
                  <td className="px-2 py-2 bg-blue-50/10">
                    <input 
                      type="number" 
                      defaultValue={student.ca1}
                      className="w-full text-center py-2 px-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700 bg-white"
                      min="0" max="20"
                    />
                  </td>
                  
                  {/* CA 2 Input */}
                  <td className="px-2 py-2 bg-blue-50/10">
                    <input 
                      type="number" 
                      defaultValue={student.ca2}
                      className="w-full text-center py-2 px-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700 bg-white"
                      min="0" max="20"
                    />
                  </td>
                  
                  {/* Exam Input */}
                  <td className="px-2 py-2 bg-indigo-50/10">
                    <input 
                      type="number" 
                      defaultValue={student.exam}
                      className="w-full text-center py-2 px-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-gray-700 bg-white"
                      min="0" max="60"
                    />
                  </td>
                  
                  <td className="px-6 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 font-bold text-gray-900 border border-gray-100">
                      {student.total}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold border
                      ${student.grade === 'A' ? 'bg-green-50 text-green-700 border-green-200' : 
                        student.grade === 'B' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        student.grade === 'C' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                      {student.grade}
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
