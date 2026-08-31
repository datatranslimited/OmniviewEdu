"use client"
import { useState } from "react"
import { FileEdit, Send, Clock, CheckCircle2 } from "lucide-react"

export default function StudentAssignmentsClient() {
  const [assignments, setAssignments] = useState([
    { id: "ASS-001", title: "Algebra Exercises Ch 4", subject: "Mathematics", teacher: "Mr. Ebenezer", dueDate: "Oct 15, 2026", points: 10, status: "Pending", instructions: "Solve problems 1-5 on page 42. Show all workings clearly." },
    { id: "ASS-002", title: "Essay: The Effects of Global Warming", subject: "English Language", teacher: "Mrs. Victoria", dueDate: "Oct 10, 2026", points: 20, status: "Submitted", score: "18/20", feedback: "Excellent use of vocabulary!" }
  ])

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)

  const handleOpenSubmit = (ass: any) => {
    setSelectedAssignment(ass)
    setIsSubmitModalOpen(true)
  }

  const handleSubmit = () => {
    setAssignments(prev => prev.map(a => a.id === selectedAssignment.id ? { ...a, status: "Submitted" } : a))
    setIsSubmitModalOpen(false)
  }

  return (
    <div className="space-y-6">
      
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full">
          
          <div className="grid md:grid-cols-2 gap-6">
            {assignments.map(ass => (
              <div key={ass.id} className="p-6 rounded-3xl border border-[#788B81]/20 bg-[#F4F1EC]/20 flex flex-col h-full hover:bg-[#F4F1EC]/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-[#2C3531] text-white">
                      {ass.subject}
                    </span>
                    <h3 className="font-bold text-[#2C3531] text-lg mt-2">{ass.title}</h3>
                    <p className="text-sm font-medium text-[#788B81]">By {ass.teacher}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-[#2C3531] mb-1">{ass.points} Points</span>
                    {ass.status === 'Pending' ? (
                      <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                        <Clock className="w-3 h-3 mr-1" /> Due {ass.dueDate}
                      </span>
                    ) : (
                      <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Submitted
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm text-[#2C3531] mb-6 flex-1">
                  <p className="font-bold mb-1">Instructions:</p>
                  <p className="text-gray-600">{ass.instructions}</p>
                </div>

                {ass.status === 'Pending' ? (
                  <button 
                    onClick={() => handleOpenSubmit(ass)}
                    className="w-full py-3 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-sm transition-transform active:scale-95 flex justify-center items-center"
                  >
                    <FileEdit className="w-4 h-4 mr-2" /> Start Assignment
                  </button>
                ) : (
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Score</p>
                      <p className="text-lg font-black text-emerald-600">{ass.score || "Pending Grading"}</p>
                    </div>
                    {ass.feedback && (
                      <div className="text-right ml-4">
                        <p className="text-xs font-bold text-[#788B81] uppercase tracking-widest">Teacher Feedback</p>
                        <p className="text-sm font-medium text-[#2C3531] italic">"{ass.feedback}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Submit Assignment Modal */}
      {isSubmitModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-2xl shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-blue-50/50">
                <div className="flex items-center space-x-2">
                  <FileEdit className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-[#2C3531]">Submit Assignment</h3>
                </div>
                <button onClick={() => setIsSubmitModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              
              <div className="p-8 space-y-6">
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#2C3531] text-lg">{selectedAssignment.title}</h4>
                    <p className="text-sm text-[#788B81]">{selectedAssignment.subject}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                    Due {selectedAssignment.dueDate}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-700">
                  <span className="font-bold">Instructions:</span> {selectedAssignment.instructions}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Your Answer</label>
                  <textarea rows={8} placeholder="Type your answer here..." className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 resize-none"></textarea>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Work
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
