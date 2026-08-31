"use client"
import { useState } from "react"
import { Settings2, Save, X, Search, CheckCircle2 } from "lucide-react"

// --- DUMMY DATA ---
const dummyClasses = ["Primary 1 Gold", "Primary 2 Silver", "JSS 1 A", "SS 3 Science"]
const dummySubjects = ["Mathematics", "English Language", "Basic Science", "Civic Education"]

const initialStudents = [
  { id: 1, name: "John Doe", admission: "OMV-001", caScore: 35, examScore: 55 },
  { id: 2, name: "Jane Smith", admission: "OMV-002", caScore: 28, examScore: 40 },
  { id: 3, name: "Michael Johnson", admission: "OMV-003", caScore: "", examScore: "" },
  { id: 4, name: "Sarah Williams", admission: "OMV-004", caScore: 40, examScore: 58 },
]

export default function GradesClient() {
  const [selectedClass, setSelectedClass] = useState("Primary 1 Gold")
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [students, setStudents] = useState<any[]>(initialStudents)
  
  // Grade Configuration State
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [gradeScale, setGradeScale] = useState([
    { id: 1, letter: 'A', min: 70, max: 100, remark: 'Excellent', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
    { id: 2, letter: 'B', min: 60, max: 69, remark: 'Very Good', color: 'text-blue-700 bg-blue-50 border-blue-100' },
    { id: 3, letter: 'C', min: 50, max: 59, remark: 'Good', color: 'text-yellow-700 bg-yellow-50 border-yellow-100' },
    { id: 4, letter: 'D', min: 40, max: 49, remark: 'Pass', color: 'text-orange-700 bg-orange-50 border-orange-100' },
    { id: 5, letter: 'F', min: 0, max: 39, remark: 'Fail', color: 'text-red-700 bg-red-50 border-red-100' },
  ])
  const [isSaved, setIsSaved] = useState(false)

  // Calculate Total & Grade dynamically based on the configurable scale
  const calculateTotal = (ca: string | number, exam: string | number) => {
    const total = (Number(ca) || 0) + (Number(exam) || 0)
    return total > 0 ? total : "-"
  }

  const getGradeBadge = (total: number | string) => {
    if (total === "-") return <span className="text-[#788B81]/40 font-bold">-</span>
    const t = Number(total)
    
    // Find the matching grade from the configured scale
    const grade = gradeScale.find(g => t >= g.min && t <= g.max)
    
    if (grade) {
      return (
        <span className={`px-2 py-1 rounded-md text-xs font-bold border ${grade.color}`}>
          {grade.letter}
        </span>
      )
    }
    return <span className="text-[#788B81]/40 font-bold">?</span>
  }

  const handleScoreChange = (id: number, field: "caScore" | "examScore", value: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const saveConfig = () => {
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      setIsConfigOpen(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header & Config Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-sans font-bold text-[#2C3531]">Gradebook</h2>
        </div>
        <button 
          onClick={() => setIsConfigOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-[#F4F1EC] hover:bg-[#788B81]/10 text-[#788B81] hover:text-[#2C3531] border border-[#788B81]/20 rounded-full font-bold transition-all shadow-sm"
        >
          <Settings2 className="w-4 h-4 mr-2" />
          Configure Grading Scale
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
          
          {/* Top Filter Bar */}
          <div className="bg-[#F4F1EC]/20 px-6 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Class</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-2.5 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all shadow-sm"
              >
                {dummyClasses.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Subject</label>
              <select 
                value={selectedSubject} 
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-2.5 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all shadow-sm"
              >
                {dummySubjects.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <button className="bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-transform active:scale-95 flex items-center h-[42px]">
                <Search className="w-4 h-4 mr-2" />
                Load Students
              </button>
            </div>
          </div>

          {/* Gradebook Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#788B81]/10 bg-white">
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center w-32">CA (40)</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center w-32">Exam (60)</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center w-24">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center w-24">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#788B81]/10">
                {students.map((student) => {
                  const total = calculateTotal(student.caScore, student.examScore)
                  return (
                    <tr key={student.id} className="hover:bg-[#F4F1EC]/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#2C3531]">{student.name}</div>
                        <div className="text-xs font-medium text-[#788B81]">{student.admission}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input 
                          type="number" 
                          min="0" max="40"
                          value={student.caScore} 
                          onChange={(e) => handleScoreChange(student.id, "caScore", e.target.value)}
                          className="w-16 text-center bg-white border border-[#788B81]/20 rounded-md shadow-sm focus:ring-2 focus:ring-[#788B81]/30 font-bold text-[#2C3531] py-1"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input 
                          type="number" 
                          min="0" max="60"
                          value={student.examScore} 
                          onChange={(e) => handleScoreChange(student.id, "examScore", e.target.value)}
                          className="w-16 text-center bg-white border border-[#788B81]/20 rounded-md shadow-sm focus:ring-2 focus:ring-[#788B81]/30 font-bold text-[#2C3531] py-1"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-6 py-4 text-center text-lg font-bold text-[#2C3531]">
                        {total}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getGradeBadge(total)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer / Publish Bar */}
          <div className="bg-[#F4F1EC]/20 px-6 py-4 border-t border-[#788B81]/10 flex justify-between items-center">
            <p className="text-sm font-medium text-[#788B81]">Showing {students.length} students.</p>
            <div className="space-x-3 flex">
              <button className="px-6 py-2.5 border border-[#788B81]/20 bg-white hover:bg-[#F4F1EC] text-[#788B81] hover:text-[#2C3531] rounded-full text-sm font-bold transition-colors">
                Save Draft
              </button>
              <button className="px-6 py-2.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-full text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Publish Results
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Configuration Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-2xl shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col max-h-[85vh]">
              
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-2xl font-sans font-bold text-[#2C3531]">Grade Configuration</h3>
                  <p className="text-sm font-medium text-[#788B81] mt-1">Define the grading scale for report cards.</p>
                </div>
                <button onClick={() => setIsConfigOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F4F1EC] text-[#788B81] hover:text-[#2C3531] transition-colors">✕</button>
              </div>
              
              <div className="p-8 space-y-4 overflow-y-auto">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-2 border-b border-[#788B81]/10">
                  <div className="col-span-2 text-xs font-bold text-[#788B81] uppercase tracking-widest">Letter</div>
                  <div className="col-span-3 text-xs font-bold text-[#788B81] uppercase tracking-widest">Min Score</div>
                  <div className="col-span-3 text-xs font-bold text-[#788B81] uppercase tracking-widest">Max Score</div>
                  <div className="col-span-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Remark</div>
                </div>

                {/* Editable Rows */}
                {gradeScale.map((grade, index) => (
                  <div key={grade.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <span className={`px-3 py-1.5 rounded-md text-sm font-bold border ${grade.color}`}>
                        {grade.letter}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <input 
                          type="number" 
                          value={grade.min}
                          onChange={(e) => {
                            const newScale = [...gradeScale]
                            newScale[index].min = Number(e.target.value)
                            setGradeScale(newScale)
                          }}
                          className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-lg px-3 py-2 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" 
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#788B81]/50">%</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <input 
                          type="number" 
                          value={grade.max}
                          onChange={(e) => {
                            const newScale = [...gradeScale]
                            newScale[index].max = Number(e.target.value)
                            setGradeScale(newScale)
                          }}
                          className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-lg px-3 py-2 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" 
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#788B81]/50">%</span>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <input 
                        type="text" 
                        value={grade.remark}
                        onChange={(e) => {
                          const newScale = [...gradeScale]
                          newScale[index].remark = e.target.value
                          setGradeScale(newScale)
                        }}
                        className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-lg px-3 py-2 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" 
                      />
                    </div>
                  </div>
                ))}

                <button className="text-sm font-bold text-[#788B81] hover:text-[#2C3531] mt-4 flex items-center transition-colors">
                  + Add Grade Level
                </button>
              </div>

              <div className="px-8 py-5 border-t border-[#788B81]/10 flex justify-end gap-3 bg-white">
                <button onClick={() => setIsConfigOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-[#788B81] hover:bg-[#F4F1EC] transition-colors">Cancel</button>
                <button 
                  onClick={saveConfig}
                  className="px-6 py-2.5 bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] rounded-full text-sm font-bold shadow-lg transition-all flex items-center min-w-[140px] justify-center"
                >
                  {isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved</> : <><Save className="w-4 h-4 mr-2" /> Save Scale</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
