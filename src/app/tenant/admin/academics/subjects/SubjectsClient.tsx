"use client"
import React, { useState, useTransition } from "react"
import { Plus, BookOpen, AlertCircle, ChevronDown, ChevronRight, User, Trash2 } from "lucide-react"
import { createSubject, allocateSubject, removeSubjectAllocation } from "./actions"

export default function SubjectsClient({ 
  initialSubjects, 
  classArms,
  staffList,
  activeSession 
}: { 
  initialSubjects: any[],
  classArms: any[],
  staffList: any[],
  activeSession: any
}) {
  const [subjects, setSubjects] = useState(initialSubjects)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // Modals and UI state
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [showAllocationModal, setShowAllocationModal] = useState<string | null>(null) // holds subject_id
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({})

  const toggleSubject = (id: string) => {
    setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }))
  }

  async function handleCreateSubject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await createSubject(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setShowSubjectModal(false)
      }
    })
  }

  async function handleAllocateSubject(e: React.FormEvent<HTMLFormElement>, subject_id: string) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.append("subject_id", subject_id)
    
    startTransition(async () => {
      const res = await allocateSubject(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setShowAllocationModal(null)
      }
    })
  }

  async function handleRemoveAllocation(class_subject_id: string) {
    startTransition(async () => {
      const formData = new FormData()
      formData.append("class_subject_id", class_subject_id)
      const res = await removeSubjectAllocation(formData)
      if (res.error) setError(res.error)
    })
  }

  return (
    <div className="space-y-8 relative">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
            <p className="text-sm mt-1">You must set an active session in the Sessions tab before you can allocate subjects to class arms.</p>
          </div>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowSubjectModal(true)}
          className="flex items-center gap-2 bg-[#1E2522] hover:bg-[#2C3531] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>New Subject</span>
        </button>
      </div>

      {/* Subjects Table */}
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
          <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-[#788B81]/10">
            <thead className="bg-[#F4F1EC]/30">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Subject</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Code</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Section</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Allocations</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#788B81]/5">
              {subjects.map((sub) => (
                <React.Fragment key={sub.id}>
                  <tr 
                    className={`hover:bg-[#F4F1EC]/30 transition-colors cursor-pointer ${expandedSubjects[sub.id] ? 'bg-[#F4F1EC]/10' : ''}`}
                    onClick={() => toggleSubject(sub.id)}
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        {expandedSubjects[sub.id] ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                        <div className="h-10 w-10 flex-shrink-0 bg-[#F4F1EC] rounded-full border border-[#788B81]/20 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-[#2C3531]" />
                        </div>
                        <div className="text-sm font-bold text-[#2C3531]">{sub.name}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-xs font-bold text-[#2C3531] bg-[#F4F1EC] px-3 py-1 rounded-full">{sub.code || 'N/A'}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-50 text-blue-700">
                        {sub.section.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 font-bold px-2.5 py-1 rounded-lg text-xs">
                        {sub.class_subjects.length} Classes
                      </span>
                    </td>
                  </tr>
                  
                  {/* Expanded Allocations View */}
                  {expandedSubjects[sub.id] && (
                    <tr className="bg-gray-50/50">
                      <td colSpan={4} className="p-0">
                        <div className="px-16 py-6 border-b border-[#788B81]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Class Allocations</h4>
                            <button
                              onClick={(e) => { e.stopPropagation(); setShowAllocationModal(sub.id); }}
                              disabled={!activeSession}
                              className="text-xs bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-medium shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5"
                            >
                              <Plus className="w-3 h-3" /> Allocate to Class
                            </button>
                          </div>

                          {sub.class_subjects.length === 0 ? (
                            <div className="text-center py-6 bg-white rounded-xl border border-dashed border-gray-200">
                              <p className="text-sm text-gray-500">This subject has not been allocated to any classes yet.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {sub.class_subjects.map((alloc: any) => (
                                <div key={alloc.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
                                  <div>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-50 text-purple-700 mb-2">
                                      {alloc.class_arm.name}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                                      <User className="w-3.5 h-3.5 text-gray-400" />
                                      {alloc.teacher ? `${alloc.teacher.first_name} ${alloc.teacher.last_name}` : <span className="italic text-gray-400">Unassigned</span>}
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleRemoveAllocation(alloc.id); }}
                                    disabled={isPending}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {subjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">No Subjects Found</h3>
                    <p className="text-gray-500 mt-2 text-center max-w-sm mx-auto">
                      Create standard subjects like Mathematics or English to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* New Subject Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Create Global Subject</h3>
              <button onClick={() => setShowSubjectModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                ×
              </button>
            </div>
            <form onSubmit={handleCreateSubject} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. Mathematics"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject Code (Optional)</label>
                <input 
                  type="text" 
                  name="code" 
                  placeholder="e.g. MTH101"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">School Section</label>
                <select 
                  name="section" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="CRECHE">Creche</option>
                  <option value="NURSERY">Nursery</option>
                  <option value="PRIMARY">Primary</option>
                  <option value="JUNIOR_SECONDARY">Junior Secondary</option>
                  <option value="SENIOR_SECONDARY">Senior Secondary</option>
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubjectModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-[#1E2522] hover:bg-[#2C3531] text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  {isPending ? "Creating..." : "Create Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Allocate Subject Modal */}
      {showAllocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Allocate Subject to Class</h3>
              <button onClick={() => setShowAllocationModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                ×
              </button>
            </div>
            <form onSubmit={(e) => handleAllocateSubject(e, showAllocationModal)} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class Arm</label>
                <select 
                  name="class_arm_id" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Select a class...</option>
                  {classArms.map(arm => (
                    <option key={arm.id} value={arm.id}>{arm.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject Teacher (Optional)</label>
                <select 
                  name="teacher_id" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Leave unassigned for now...</option>
                  {staffList.map(staff => (
                    <option key={staff.id} value={staff.id}>{staff.first_name} {staff.last_name}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAllocationModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-[#1E2522] hover:bg-[#2C3531] text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  {isPending ? "Allocating..." : "Allocate Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
