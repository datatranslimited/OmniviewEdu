"use client"

import React, { useState, useTransition } from "react"
import { submitLessonNote, reviewLessonNote, generateAiDigest } from "./actions"
import { AlertCircle, CheckCircle2, Sparkles, Send, FileText, Check, X } from "lucide-react"

export default function LessonNotesClient({
  activeTerm,
  classSubjects,
  lessonNotes,
  aiDigests,
  classArms
}: {
  activeTerm: any
  classSubjects: any[]
  lessonNotes: any[]
  aiDigests: any[]
  classArms: any[]
}) {
  const [activeTab, setActiveTab] = useState<'SUBMIT' | 'REVIEW' | 'AI'>('SUBMIT')
  
  // Submit State
  const [isPendingSubmit, startSubmit] = useTransition()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Review State
  const [isPendingReview, startReview] = useTransition()
  
  // AI State
  const [isPendingAi, startAi] = useTransition()
  const [aiError, setAiError] = useState<string | null>(null)
  const [aiClassArmId, setAiClassArmId] = useState("")
  const [aiWeek, setAiWeek] = useState("1")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)
    const formData = new FormData(e.currentTarget)
    if (activeTerm) {
      formData.append("term_id", activeTerm.id)
    }

    startSubmit(async () => {
      const res = await submitLessonNote(formData)
      if (res.error) {
        setSubmitError(res.error)
      } else {
        setSubmitSuccess(true)
        setTimeout(() => setSubmitSuccess(false), 3000)
        ;(e.target as HTMLFormElement).reset()
      }
    })
  }

  const handleReview = (noteId: string, status: string) => {
    startReview(async () => {
      const fd = new FormData()
      fd.append("note_id", noteId)
      fd.append("status", status)
      await reviewLessonNote(fd)
    })
  }

  const handleGenerateAi = () => {
    if (!aiClassArmId || !activeTerm) return
    setAiError(null)

    startAi(async () => {
      const fd = new FormData()
      fd.append("class_arm_id", aiClassArmId)
      fd.append("term_id", activeTerm.id)
      fd.append("week_number", aiWeek)
      
      const res = await generateAiDigest(fd)
      if (res.error) {
        setAiError(res.error)
      }
    })
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'APPROVED': return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Approved</span>
      case 'SUBMITTED_FOR_REVIEW': return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Pending Review</span>
      case 'REJECTED': return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">Rejected</span>
      default: return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">{status}</span>
    }
  }

  return (
    <div className="space-y-6">
      
      {!activeTerm && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">No Active Academic Term</h4>
            <p className="text-sm mt-1">Lesson notes must be attached to a specific Term. Please set an Active Term in the Sessions module.</p>
          </div>
        </div>
      )}

      {/* Internal Tabs */}
      <div className="flex space-x-2 bg-gray-100/50 p-1.5 rounded-xl border border-gray-200 w-fit">
        <button 
          onClick={() => setActiveTab('SUBMIT')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'SUBMIT' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          1. Submit Note (Teacher)
        </button>
        <button 
          onClick={() => setActiveTab('REVIEW')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'REVIEW' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          2. Review Board (Principal)
        </button>
        <button 
          onClick={() => setActiveTab('AI')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'AI' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm' : 'text-purple-600 hover:text-purple-800'}`}
        >
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> 3. AI Parent Nuggets</span>
        </button>
      </div>

      {/* TAB 1: SUBMIT */}
      {activeTab === 'SUBMIT' && (
        <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] max-w-3xl">
          <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Write Lesson Note
            </h2>

            {submitError && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 text-sm font-medium">{submitError}</div>
            )}
            {submitSuccess && (
              <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg border border-green-200 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Successfully submitted for review!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject / Class</label>
                  <select name="class_subject_id" required disabled={!activeTerm} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium text-sm">
                    <option value="">Select subject allocation...</option>
                    {classSubjects.map(cs => (
                      <option key={cs.id} value={cs.id}>
                        {cs.class_arm.name} - {cs.subject.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Week Number</label>
                  <select name="week_number" required disabled={!activeTerm} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium text-sm">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => <option key={w} value={w}>Week {w}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Topic</label>
                <input type="text" name="topic" required disabled={!activeTerm} placeholder="e.g. Introduction to Algebra" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Learning Objectives & Content</label>
                <textarea name="content" required disabled={!activeTerm} rows={5} placeholder="Describe the lesson objectives, activities, and homework..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium text-sm resize-none" />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" disabled={!activeTerm || isPendingSubmit} className="bg-[#1E2522] hover:bg-black text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-70">
                  <Send className="w-4 h-4" /> {isPendingSubmit ? 'Submitting...' : 'Submit for Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: REVIEW */}
      {activeTab === 'REVIEW' && (
        <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
             <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#788B81]/10">
                <thead className="bg-[#F4F1EC]/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Class / Subject</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Topic (Week)</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#788B81]/10">
                  {lessonNotes.map(note => (
                    <tr key={note.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{note.class_subject?.class_arm?.name}</div>
                        <div className="text-sm text-gray-500">{note.class_subject?.subject?.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{note.topic}</div>
                        <div className="text-xs text-gray-500 font-bold">Week {note.week_number}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(note.status)}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {note.status === 'SUBMITTED_FOR_REVIEW' && (
                          <>
                            <button onClick={() => handleReview(note.id, 'APPROVED')} disabled={isPendingReview} className="inline-flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg text-sm font-bold border border-green-200 transition-colors">
                              <Check className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button onClick={() => handleReview(note.id, 'REJECTED')} disabled={isPendingReview} className="inline-flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-bold border border-red-200 transition-colors">
                              <X className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {lessonNotes.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                        No lesson notes found for the active term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI ENGINE */}
      {activeTab === 'AI' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
           
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-lg">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-purple-100 p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Generate Parent Digest</h3>
                  <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
                    Select a class and week to consolidate all approved lesson notes into an engaging weekly summary for parents.
                  </p>
                  
                  {aiError && (
                    <div className="mb-4 w-full bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 text-sm font-medium">{aiError}</div>
                  )}

                  <div className="w-full space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-purple-800 uppercase tracking-wider mb-2">Class Arm</label>
                      <select value={aiClassArmId} onChange={(e) => setAiClassArmId(e.target.value)} disabled={!activeTerm} className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 font-medium text-sm">
                        <option value="">Select a class...</option>
                        {classArms.map(ca => (
                          <option key={ca.id} value={ca.id}>{ca.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-purple-800 uppercase tracking-wider mb-2">Week Number</label>
                      <select value={aiWeek} onChange={(e) => setAiWeek(e.target.value)} disabled={!activeTerm} className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 font-medium text-sm">
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => <option key={w} value={w}>Week {w}</option>)}
                      </select>
                    </div>
                    
                    <button 
                      onClick={handleGenerateAi}
                      disabled={!aiClassArmId || isPendingAi || !activeTerm}
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:grayscale"
                    >
                      {isPendingAi ? <><Sparkles className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Sparkles className="w-4 h-4" /> Generate AI Digest</>}
                    </button>
                  </div>
                </div>
              </div>
           </div>

           <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 px-2">Generated Digests</h3>
              
              <div className="grid gap-6">
                {aiDigests.map(digest => (
                  <div key={digest.id} className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-sm">
                    <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-6">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full font-bold mb-2">Week {digest.week_number}</span>
                            <h4 className="font-bold text-gray-900 text-lg">{digest.class_arm?.name} Weekly Update</h4>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{new Date(digest.generated_at).toLocaleDateString()}</span>
                       </div>

                       <div className="prose prose-sm prose-purple max-w-none bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-wrap">
                          {digest.digest_summary_markdown}
                       </div>

                       <div className="mt-6">
                          <h5 className="font-bold text-gray-900 text-sm mb-3">Dinner Table Questions</h5>
                          <div className="space-y-2">
                             {(digest.discussion_questions_jsonb as any[]).map((q, i) => (
                               <div key={i} className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex gap-3">
                                 <span className="text-indigo-600 font-bold">{i+1}.</span>
                                 <div>
                                   <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block mb-0.5">{q.subject}</span>
                                   <span className="text-sm font-medium text-gray-800">{q.question}</span>
                                 </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
                
                {aiDigests.length === 0 && (
                  <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-sm flex flex-col items-center justify-center py-20">
                     <Sparkles className="w-12 h-12 text-gray-300 mb-4" />
                     <p className="text-gray-500 font-medium">No AI digests generated yet for this term.</p>
                  </div>
                )}
              </div>
           </div>
        </div>
      )}
      
    </div>
  )
}
