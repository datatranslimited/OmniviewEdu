"use client"
import { useState } from "react"
import { FileEdit, Send, CheckCircle2, XCircle } from "lucide-react"

export default function AssignmentsClient() {
  const [activeTab, setActiveTab] = useState<'post' | 'review'>('post')

  // Dummy submissions for the review tab
  const [submissions] = useState([
    { id: "SUB-001", studentName: "John Doe", assignment: "Algebra Exercises Ch 4", submittedAt: "Oct 12, 2026 - 4:00 PM", status: "Needs Grading", answerText: "The solution to question 1 is x = 4, because when you subtract 2 from both sides..." },
    { id: "SUB-002", studentName: "Sarah Williams", assignment: "Algebra Exercises Ch 4", submittedAt: "Oct 12, 2026 - 6:30 PM", status: "Needs Grading", answerText: "I found x = 4. For question 2, the quadratic formula yields..." }
  ])

  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)

  const handleGrade = (sub: any) => {
    setSelectedSubmission(sub)
    setIsGradingModalOpen(true)
  }

  return (
    <div className="space-y-6">
      
      {/* Tabs */}
      <div className="flex space-x-2 bg-[#F4F1EC] p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('post')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'post' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Post New Assignment
        </button>
        <button 
          onClick={() => setActiveTab('review')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'review' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Review Submissions
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full">
          
          {/* POST ASSIGNMENT TAB */}
          {activeTab === 'post' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#F4F1EC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileEdit className="w-8 h-8 text-[#788B81]" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3531]">Create New Assignment</h3>
                <p className="text-sm text-[#788B81]">Students will submit their answers directly via text.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Select Class</label>
                  <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                    <option>JSS 1 A - Mathematics</option>
                    <option>JSS 2 B - Mathematics</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Assignment Title</label>
                  <input type="text" placeholder="e.g. Algebra Exercises Ch 4" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Points</label>
                    <input type="number" defaultValue={10} className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Due Date</label>
                    <input type="date" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Instructions / Questions</label>
                  <textarea rows={6} placeholder="Type your questions or instructions here..." className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 resize-none"></textarea>
                </div>

                <button 
                  className="w-full py-3.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Post Assignment
                </button>
              </div>
            </div>
          )}

          {/* REVIEW SUBMISSIONS TAB */}
          {activeTab === 'review' && (
            <div>
              <h3 className="text-lg font-bold text-[#2C3531] mb-6">Pending Submissions</h3>
              
              <div className="space-y-4">
                {submissions.map(sub => (
                  <div key={sub.id} className="p-5 rounded-2xl border border-[#788B81]/20 bg-[#F4F1EC]/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-[#F4F1EC]/40 transition-colors">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="font-bold text-[#2C3531]">{sub.studentName}</span>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-200">
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#788B81]">{sub.assignment}</p>
                      <p className="text-xs font-medium text-[#788B81] mt-1">Submitted: {sub.submittedAt}</p>
                    </div>
                    <button 
                      onClick={() => handleGrade(sub)}
                      className="bg-white border border-[#788B81]/20 text-[#2C3531] hover:border-[#2C3531] px-5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
                    >
                      Review & Grade
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Grading Modal */}
      {isGradingModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-2xl shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-blue-50/50">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-[#2C3531]">Grade Submission</h3>
                </div>
                <button onClick={() => setIsGradingModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              
              <div className="p-8 space-y-6">
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#2C3531] text-lg">{selectedSubmission.studentName}</h4>
                    <p className="text-sm text-[#788B81]">{selectedSubmission.assignment}</p>
                  </div>
                  <span className="text-xs font-bold text-[#788B81] bg-[#F4F1EC] px-3 py-1 rounded-full">
                    Max: 10 Points
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Student's Answer</label>
                  <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 min-h-[150px]">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedSubmission.answerText}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Score</label>
                    <input type="number" placeholder="e.g. 8" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Feedback (Optional)</label>
                    <input type="text" placeholder="e.g. Great work!" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                </div>

                <button 
                  onClick={() => setIsGradingModalOpen(false)}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
