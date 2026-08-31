"use client"
import { useState } from "react"
import { FileText, Plus, Search, Edit3, Trash2, Eye, Sparkles, Send, CheckCircle2, AlertCircle } from "lucide-react"

type NoteStatus = "Draft" | "Pending" | "Approved" | "Rejected"

const dummyNotes = [
  { id: 1, title: "Algebraic Expressions", class: "JSS 1A", date: "Oct 12, 2026", status: "Approved" as NoteStatus, hasNugget: false },
  { id: 2, title: "Quadratic Equations", class: "SSS 2 Science", date: "Oct 14, 2026", status: "Pending" as NoteStatus, hasNugget: false },
  { id: 3, title: "Simultaneous Equations", class: "JSS 1B", date: "Oct 16, 2026", status: "Draft" as NoteStatus, hasNugget: false },
  { id: 4, title: "Intro to Geometry", class: "JSS 2A", date: "Oct 05, 2026", status: "Approved" as NoteStatus, hasNugget: true },
]

export default function NotesClient() {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false)
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [activeNote, setActiveNote] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const openAiModal = (note: any) => {
    setActiveNote(note)
    setIsAiModalOpen(true)
    setIsGenerating(false)
  }

  const simulateAiGeneration = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 2500)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sans text-[#2C3531] font-bold tracking-tight mb-2">Lesson Notes</h1>
          <p className="text-[#788B81] font-medium leading-relaxed">Draft and submit your weekly lesson plans for approval.</p>
        </div>
        <button 
          onClick={() => setIsDraftModalOpen(true)}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] rounded-full font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Draft New Note
        </button>
      </div>

      {/* Metrics Double Bezel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col justify-between h-full">
            <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1">Total Notes</p>
            <h3 className="text-4xl font-sans font-bold text-[#2C3531]">24</h3>
          </div>
        </div>
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-amber-500/20 flex flex-col justify-between h-full">
            <p className="text-[11px] font-bold text-amber-600 uppercase tracking-widest mb-1">Pending Review</p>
            <h3 className="text-4xl font-sans font-bold text-amber-700">3</h3>
          </div>
        </div>
        <div className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-emerald-500/20 flex flex-col justify-between h-full">
            <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Approved</p>
            <h3 className="text-4xl font-sans font-bold text-emerald-700">18</h3>
          </div>
        </div>
        <div className="bg-[#788B81]/10 p-2 rounded-[2rem] backdrop-blur-xl border border-[#788B81]/20 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24 text-[#788B81]" />
          </div>
          <div className="bg-white/60 rounded-[calc(2rem-0.5rem)] p-6 border border-[#788B81]/20 flex flex-col justify-between h-full relative z-10 backdrop-blur-md">
            <p className="text-[11px] font-bold text-[#788B81] uppercase tracking-widest mb-1 flex items-center">
              AI Nuggets Sent <Sparkles className="w-3 h-3 ml-1" />
            </p>
            <h3 className="text-4xl font-sans font-bold text-[#2C3531]">12</h3>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
          
          <div className="p-6 border-b border-[#788B81]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-sans font-bold text-[#2C3531]">Recent Lesson Plans</h2>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
              <input 
                type="text" 
                placeholder="Search by topic or class..." 
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#788B81]/20 bg-[#F4F1EC]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#788B81]/20 transition-all text-sm font-medium text-[#2C3531] placeholder:text-[#788B81]/60"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#788B81]/10 bg-[#F4F1EC]/20">
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Topic / Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Class Target</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Last Updated</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Parent Nugget</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#788B81]/10">
                {dummyNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-[#F4F1EC]/40 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className={`p-2.5 rounded-xl mr-4 border 
                          ${note.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            note.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                            'bg-[#F4F1EC] text-[#788B81] border-[#788B81]/10'}`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#2C3531]">{note.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-medium text-[#788B81]">{note.class}</td>
                    <td className="px-6 py-5 font-medium text-[#788B81]">{note.date}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold 
                        ${note.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                          note.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                          'bg-[#F4F1EC] text-[#788B81] border border-[#788B81]/20'}`}>
                        {note.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {note.status === 'Approved' ? (
                        note.hasNugget ? (
                          <span className="inline-flex items-center text-xs font-bold text-[#788B81] bg-[#F4F1EC] px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Sent
                          </span>
                        ) : (
                          <button 
                            onClick={() => openAiModal(note)}
                            className="inline-flex items-center text-xs font-bold text-[#F4F1EC] bg-[#788B81] hover:bg-[#64766C] px-3 py-1.5 rounded-full transition-colors shadow-sm"
                          >
                            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate
                          </button>
                        )
                      ) : (
                        <span className="text-xs font-medium text-[#788B81]/40 italic">Requires Approval</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-[#788B81] hover:text-[#2C3531] hover:bg-[#F4F1EC] rounded-xl transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#788B81] hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#788B81] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Draft Modal */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-3xl shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col h-[80vh]">
              
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-white z-10">
                <div>
                  <h3 className="text-2xl font-sans font-bold text-[#2C3531]">Draft Lesson Note</h3>
                  <p className="text-sm font-medium text-[#788B81] mt-1">Submit your plan for the Principal's review.</p>
                </div>
                <button onClick={() => setIsDraftModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F4F1EC] text-[#788B81] hover:text-[#2C3531] transition-colors">✕</button>
              </div>
              
              <div className="p-8 space-y-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Class</label>
                    <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30">
                      <option>JSS 1A</option>
                      <option>SSS 2 Science</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Subject</label>
                    <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30">
                      <option>Mathematics</option>
                      <option>Further Mathematics</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Topic</label>
                  <input type="text" placeholder="e.g., Algebraic Expressions" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] placeholder:text-[#788B81]/40 focus:outline-none focus:ring-2 focus:ring-[#788B81]/30" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Lesson Objectives</label>
                  <textarea rows={3} placeholder="At the end of the lesson, students should be able to..." className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] placeholder:text-[#788B81]/40 focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Teacher Activities & Content</label>
                  <div className="border border-[#788B81]/20 rounded-xl overflow-hidden">
                    <div className="bg-[#F4F1EC]/50 border-b border-[#788B81]/20 px-4 py-2 flex items-center space-x-2">
                      {/* Fake rich text toolbar */}
                      <button className="font-bold text-[#788B81] px-2 hover:bg-[#788B81]/10 rounded">B</button>
                      <button className="italic text-[#788B81] px-2 hover:bg-[#788B81]/10 rounded">I</button>
                      <button className="underline text-[#788B81] px-2 hover:bg-[#788B81]/10 rounded">U</button>
                      <div className="w-px h-4 bg-[#788B81]/20 mx-2"></div>
                      <button className="text-[#788B81] text-sm hover:bg-[#788B81]/10 px-2 rounded">List</button>
                    </div>
                    <textarea rows={8} className="w-full px-4 py-3 text-sm font-medium text-[#2C3531] placeholder:text-[#788B81]/40 focus:outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>

              <div className="px-8 py-5 border-t border-[#788B81]/10 flex justify-end gap-3 bg-white">
                <button onClick={() => setIsDraftModalOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-[#788B81] hover:bg-[#F4F1EC] transition-colors">Cancel</button>
                <button className="px-6 py-2.5 rounded-full text-sm font-bold text-[#788B81] border border-[#788B81]/30 hover:bg-[#F4F1EC] transition-colors">Save as Draft</button>
                <button onClick={() => setIsDraftModalOpen(false)} className="px-6 py-2.5 bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] rounded-full text-sm font-bold shadow-lg transition-all flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Submit to Principal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Nugget Generator Modal */}
      {isAiModalOpen && activeNote && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#788B81]/20 to-emerald-500/10 p-2 rounded-[2rem] w-full max-w-2xl shadow-2xl">
            <div className="bg-white/90 backdrop-blur-xl rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/20 overflow-hidden flex flex-col">
              
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-start bg-white/50">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#788B81]/10 flex items-center justify-center mr-4">
                    <Sparkles className="w-6 h-6 text-[#788B81]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-sans font-bold text-[#2C3531]">AI Parent Engagement Engine</h3>
                    <p className="text-sm font-medium text-[#788B81] mt-0.5">Generate a Weekly Nugget for {activeNote.title}</p>
                  </div>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-[#788B81] hover:bg-[#788B81]/10 transition-colors">✕</button>
              </div>
              
              <div className="p-8 space-y-6">
                {!isGenerating ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-[#F4F1EC] rounded-full flex items-center justify-center mb-4 relative">
                      <Sparkles className="w-8 h-8 text-[#788B81] absolute animate-pulse" />
                    </div>
                    <h4 className="text-lg font-bold text-[#2C3531] mb-2">Extract Insights</h4>
                    <p className="text-sm text-[#788B81] max-w-md mx-auto leading-relaxed">
                      OmniviewEdu AI will read your approved lesson note on <strong>{activeNote.title}</strong> and automatically draft a short, engaging summary and discussion question for parents.
                    </p>
                    <button 
                      onClick={simulateAiGeneration}
                      className="mt-8 px-8 py-3 bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center group"
                    >
                      <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Generate Nugget Now
                    </button>
                  </div>
                ) : (
                  <div className="py-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-6 h-6 border-2 border-[#788B81] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-bold text-[#788B81] animate-pulse">AI is reading your lesson plan...</span>
                    </div>
                    
                    {/* Simulated stream UI */}
                    <div className="bg-[#F4F1EC]/50 rounded-xl p-6 border border-[#788B81]/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#788B81] to-transparent opacity-30 animate-[slide_2s_infinite]"></div>
                      <p className="text-sm text-[#2C3531] font-medium leading-relaxed mb-4">
                        <span className="font-bold text-[#788B81]">Weekly Nugget: {activeNote.title}</span><br/><br/>
                        Dear Parents,<br/>
                        This week in Mathematics, we focused on understanding {activeNote.title}. The students learned how to identify variables and coefficients in everyday scenarios.<br/><br/>
                        <span className="italic">Engage at home:</span><br/>
                        Ask your child to find an example of a "variable" in the kitchen tonight (e.g., the number of plates depends on the people eating).
                      </p>
                    </div>
                    
                    <div className="mt-6 flex justify-end gap-3 opacity-0 animate-[fadeIn_0.5s_ease-out_2s_forwards]">
                      <button className="px-6 py-2.5 rounded-full text-sm font-bold text-[#788B81] hover:bg-[#F4F1EC] transition-colors">Discard</button>
                      <button className="px-6 py-2.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-full text-sm font-bold shadow-lg transition-all flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Push to Parent Portal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
