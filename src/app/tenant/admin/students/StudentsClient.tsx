"use client"

import React, { useState, useTransition, useMemo } from "react"
import { PlusCircle, Search, Filter, GraduationCap, AlertCircle, RefreshCw, Key } from "lucide-react"
import { createStudent, enrollStudent, generateLinkPin } from "./actions"

export default function StudentsClient({ 
  initialStudents, 
  classArms,
  activeSession 
}: { 
  initialStudents: any[],
  classArms: any[],
  activeSession: any
}) {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false)
  const [showEnrollModal, setShowEnrollModal] = useState<string | null>(null) // holds student_id

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students
    const lower = searchTerm.toLowerCase()
    return students.filter(s => 
      s.first_name.toLowerCase().includes(lower) || 
      s.last_name.toLowerCase().includes(lower) || 
      s.admission_number.toLowerCase().includes(lower)
    )
  }, [students, searchTerm])

  async function handleCreateStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await createStudent(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setShowAddStudentModal(false)
      }
    })
  }

  async function handleEnrollStudent(e: React.FormEvent<HTMLFormElement>, student_id: string) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.append("student_id", student_id)
    
    startTransition(async () => {
      const res = await enrollStudent(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setShowEnrollModal(null)
      }
    })
  }

  async function handleGeneratePin(student_id: string) {
    startTransition(async () => {
      const fd = new FormData()
      fd.append("student_id", student_id)
      const res = await generateLinkPin(fd)
      if (res.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="space-y-8 relative">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between shadow-sm">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {!activeSession && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">No Active Academic Session</h4>
            <p className="text-sm mt-1">You must set an active session in the Academics tab before you can enroll students into classes.</p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[600px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col h-full">
          
          {/* Toolbar */}
          <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm transition-shadow outline-none"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center text-sm font-bold text-[#2C3531] bg-white border border-[#788B81]/20 px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#F4F1EC]/50 transition-colors">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </button>
              <button 
                onClick={() => setShowAddStudentModal(true)}
                className="flex-1 sm:flex-none bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Add Student
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-[#788B81]/10">
              <thead className="bg-[#F4F1EC]/10">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Student</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Gender</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Current Class</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Enrollment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#788B81]/10">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-[#F4F1EC] rounded-full border border-[#788B81]/20 flex items-center justify-center overflow-hidden">
                          {student.photo_url ? (
                            <img src={student.photo_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-[#2C3531]" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-[#2C3531]">
                            {student.first_name} {student.last_name}
                          </div>
                          <div className="text-xs font-medium text-[#788B81]">{student.admission_number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-[#788B81]">
                      {student.gender === 'M' ? 'Male' : student.gender === 'F' ? 'Female' : 'Other'}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      {student.current_class_arm ? (
                        <span className="text-xs font-bold text-[#2C3531] bg-[#F4F1EC] px-3 py-1 rounded-full">
                          {student.current_class_arm.name}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                      {student.secure_link_pin ? (
                        <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-xl font-mono font-bold text-xs border border-purple-200 flex items-center justify-center min-w-[120px]">
                          PIN: {student.secure_link_pin}
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleGeneratePin(student.id)}
                          disabled={isPending}
                          className="text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors px-3 py-2 rounded-xl shadow-sm font-bold disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                        >
                          <Key className="w-3.5 h-3.5 mr-1" />
                          Generate PIN
                        </button>
                      )}
                      <button 
                        onClick={() => setShowEnrollModal(student.id)}
                        disabled={!activeSession}
                        className="text-[#2C3531] bg-white border border-[#788B81]/20 hover:bg-[#F4F1EC] transition-colors px-4 py-2 rounded-xl shadow-sm font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Enroll
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No Students Found</h3>
                      <p className="text-gray-500 mt-2 text-center max-w-sm mx-auto">
                        Your registry is empty. Add a student to start enrolling them into classes.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-[#F4F1EC]/30 px-8 py-4 border-t border-[#788B81]/10 flex justify-between items-center">
            <p className="text-sm font-bold text-[#788B81]">Showing {filteredStudents.length} students</p>
          </div>

        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Add New Student</h3>
              <button onClick={() => setShowAddStudentModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                ×
              </button>
            </div>
            <form onSubmit={handleCreateStudent} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                  <input 
                    type="text" 
                    name="first_name" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                  <input 
                    type="text" 
                    name="last_name" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admission Number</label>
                  <input 
                    type="text" 
                    name="admission_number" 
                    required 
                    placeholder="e.g. OMV-001"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
                  <select 
                    name="gender" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  Initial Class Assignment
                  {!activeSession && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">Disabled (No Active Session)</span>}
                </label>
                <select 
                  name="class_arm_id" 
                  disabled={!activeSession}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white disabled:opacity-50 disabled:bg-gray-50"
                >
                  <option value="">Do not assign yet...</option>
                  {classArms.map(arm => (
                    <option key={arm.id} value={arm.id}>{arm.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-[#1E2522] hover:bg-[#2C3531] text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  {isPending ? "Creating..." : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enroll Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Enroll Student</h3>
                <p className="text-xs text-blue-700 font-medium mt-1">Active Session: {activeSession?.name}</p>
              </div>
              <button onClick={() => setShowEnrollModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                ×
              </button>
            </div>
            <form onSubmit={(e) => handleEnrollStudent(e, showEnrollModal)} className="p-6 space-y-5">
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-600 mb-2">
                Select the class arm this student should be enrolled in for the current academic session. This will update their primary class and log their historical enrollment.
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Class Arm</label>
                <select 
                  name="class_arm_id" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Choose a class...</option>
                  {classArms.map(arm => (
                    <option key={arm.id} value={arm.id}>{arm.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  {isPending ? "Enrolling..." : "Confirm Enrollment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
