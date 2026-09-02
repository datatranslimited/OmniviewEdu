"use client"

import React, { useState, useTransition, useEffect } from "react"
import { AlertCircle, Save, CheckCircle2, Calculator } from "lucide-react"
import { useRouter } from "next/navigation"
import { saveSubjectScores } from "./actions"

export default function ScoreEntryClient({
  activeTerm,
  classSubjects,
  enrolledStudents,
  existingScores,
  selectedClassSubjectId
}: {
  activeTerm: any
  classSubjects: any[]
  enrolledStudents: any[]
  existingScores: any[]
  selectedClassSubjectId: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Local state for the scores grid
  const [scoresGrid, setScoresGrid] = useState<Record<string, { ca1: number | null, ca2: number | null, exam: number | null }>>({})

  // Initialize the grid when enrolledStudents or existingScores change
  useEffect(() => {
    if (enrolledStudents.length > 0) {
      const initialGrid: Record<string, any> = {}
      enrolledStudents.forEach(enr => {
        const existing = existingScores.find(s => s.student_id === enr.student_id)
        initialGrid[enr.student_id] = {
          ca1: existing?.ca1_score ? Number(existing.ca1_score) : null,
          ca2: existing?.ca2_score ? Number(existing.ca2_score) : null,
          exam: existing?.exam_score ? Number(existing.exam_score) : null,
        }
      })
      setScoresGrid(initialGrid)
    }
  }, [enrolledStudents, existingScores])

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    if (val) {
      router.push(`/tenant/admin/academics/scores?class_subject_id=${val}`)
    } else {
      router.push(`/tenant/admin/academics/scores`)
    }
  }

  const handleScoreChange = (studentId: string, field: 'ca1' | 'ca2' | 'exam', value: string) => {
    const numValue = value === "" ? null : Number(value)
    
    // Basic validation (cap CA at 20, Exam at 60 usually, but we'll let them type and validate on blur or just trust the input for now, capping at 100 max logic)
    setScoresGrid(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: numValue
      }
    }))
    setSuccess(false)
  }

  const handleSave = () => {
    if (!activeTerm || !selectedClassSubjectId) return
    setError(null)
    setSuccess(false)

    // Construct the payload
    const payload = Object.entries(scoresGrid).map(([student_id, scores]) => ({
      student_id,
      ca1_score: scores.ca1,
      ca2_score: scores.ca2,
      exam_score: scores.exam
    }))

    startTransition(async () => {
      const res = await saveSubjectScores(selectedClassSubjectId, activeTerm.id, payload)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  return (
    <div className="space-y-8 relative">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between shadow-sm">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-center gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="font-medium">Scores saved successfully! Total grades have been recalculated.</span>
        </div>
      )}

      {!activeTerm && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">No Active Academic Term</h4>
            <p className="text-sm mt-1">Scores must be attached to a specific Term. Please set an Active Term in the Sessions module.</p>
          </div>
        </div>
      )}

      {/* Selection Panel */}
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-6 flex flex-col md:flex-row gap-6 items-center">
          
          <div className="w-full md:w-1/3">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Subject & Class</label>
            <select 
              value={selectedClassSubjectId}
              onChange={handleSubjectChange}
              disabled={!activeTerm}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white font-medium text-gray-900 shadow-sm"
            >
              <option value="">-- Choose an allocated subject --</option>
              {classSubjects.map(cs => (
                <option key={cs.id} value={cs.id}>
                  {cs.class_arm.name} - {cs.subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex justify-end gap-4">
             {selectedClassSubjectId && enrolledStudents.length > 0 && (
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="bg-[#1E2522] hover:bg-[#2C3531] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 duration-300 disabled:opacity-70 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isPending ? "Saving..." : "Save Scores"}
                </button>
             )}
          </div>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      {selectedClassSubjectId && (
        <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[400px]">
          <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col h-full">
            
            <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Master Score Sheet</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Input CA 1 (20%), CA 2 (20%), and Exam (60%) scores.</p>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                 <Calculator className="w-4 h-4 text-blue-500" />
                 <span className="text-xs font-bold text-gray-700">Auto-Calculate Enabled</span>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="min-w-full divide-y divide-[#788B81]/10">
                <thead className="bg-[#F4F1EC]/10">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest sticky left-0 bg-white z-10 w-1/3">Student</th>
                    <th className="px-4 py-5 text-center text-xs font-bold text-[#788B81] uppercase tracking-widest border-l border-gray-100">CA 1</th>
                    <th className="px-4 py-5 text-center text-xs font-bold text-[#788B81] uppercase tracking-widest border-l border-gray-100">CA 2</th>
                    <th className="px-4 py-5 text-center text-xs font-bold text-[#788B81] uppercase tracking-widest border-l border-gray-100 bg-blue-50/30">Exam</th>
                    <th className="px-6 py-5 text-center text-xs font-bold text-gray-900 uppercase tracking-widest border-l border-gray-100 bg-gray-50">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#788B81]/10">
                  {enrolledStudents.map((enr) => {
                    const studentId = enr.student_id
                    const student = enr.student
                    const scores = scoresGrid[studentId] || { ca1: null, ca2: null, exam: null }
                    
                    const c1 = scores.ca1 || 0
                    const c2 = scores.ca2 || 0
                    const ex = scores.exam || 0
                    const total = c1 + c2 + ex
                    
                    return (
                      <tr key={studentId} className="hover:bg-blue-50/20 transition-colors group">
                        <td className="px-8 py-4 whitespace-nowrap sticky left-0 bg-white group-hover:bg-blue-50/20 z-10 transition-colors">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#2C3531]">{student.first_name} {student.last_name}</span>
                            <span className="text-xs font-medium text-[#788B81]">{student.admission_number}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">
                          <input 
                            type="number" 
                            min="0" max="20"
                            value={scores.ca1 ?? ""}
                            onChange={(e) => handleScoreChange(studentId, 'ca1', e.target.value)}
                            placeholder="-"
                            className="w-full max-w-[80px] mx-auto block text-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm font-bold text-[#2C3531] focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">
                          <input 
                            type="number" 
                            min="0" max="20"
                            value={scores.ca2 ?? ""}
                            onChange={(e) => handleScoreChange(studentId, 'ca2', e.target.value)}
                            placeholder="-"
                            className="w-full max-w-[80px] mx-auto block text-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm font-bold text-[#2C3531] focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100 bg-blue-50/10">
                          <input 
                            type="number" 
                            min="0" max="60"
                            value={scores.exam ?? ""}
                            onChange={(e) => handleScoreChange(studentId, 'exam', e.target.value)}
                            placeholder="-"
                            className="w-full max-w-[80px] mx-auto block text-center bg-blue-50/50 border border-blue-200 rounded-lg px-2 py-2 text-sm font-bold text-[#2C3531] focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap border-l border-gray-100 bg-gray-50 text-center">
                          <span className={`inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded-md text-sm font-bold ${
                            total >= 50 ? 'bg-green-100 text-green-800' : 
                            total > 0 ? 'bg-red-100 text-red-800' : 'text-gray-400'
                          }`}>
                            {total > 0 ? total : '-'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                  {enrolledStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Students Enrolled</h3>
                        <p className="text-gray-500 mt-2 text-center max-w-sm mx-auto">
                          There are no students enrolled in this class for the active session.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
