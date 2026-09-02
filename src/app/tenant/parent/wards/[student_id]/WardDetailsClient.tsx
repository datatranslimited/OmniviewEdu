"use client"
import React, { useState } from "react"
import { ArrowLeft, BookOpen, Brain, GraduationCap, TrendingUp, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function WardDetailsClient({ 
  student, 
  activeTerm, 
  scores, 
  aiDigests 
}: { 
  student: any, 
  activeTerm: any, 
  scores: any[], 
  aiDigests: any[] 
}) {
  const [activeTab, setActiveTab] = useState<'ACADEMIC' | 'AI'>('ACADEMIC')

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/tenant/parent" className="text-[#788B81] hover:text-[#2C3531] font-bold text-sm flex items-center mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-[#788B81]/20 flex items-center justify-center overflow-hidden text-[#2C3531]">
              {student.photo_url ? (
                <img src={student.photo_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <GraduationCap className="w-8 h-8" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2C3531]">{student.first_name} {student.last_name}</h1>
              <p className="text-[#788B81] mt-1 font-bold flex items-center">
                {student.current_class_arm?.name || 'Unassigned'} 
                <span className="mx-2">•</span> 
                {activeTerm?.name || 'No Active Term'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F4F1EC] p-1.5 rounded-2xl w-fit border border-[#788B81]/10 shadow-inner">
        <button
          onClick={() => setActiveTab('ACADEMIC')}
          className={`flex items-center px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'ACADEMIC' 
              ? 'bg-white text-[#2C3531] shadow-sm' 
              : 'text-[#788B81] hover:text-[#2C3531] hover:bg-white/50'
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-2" /> Academic Performance
        </button>
        <button
          onClick={() => setActiveTab('AI')}
          className={`flex items-center px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'AI' 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'text-[#788B81] hover:text-purple-600 hover:bg-purple-50'
          }`}
        >
          <Sparkles className="w-4 h-4 mr-2" /> AI Weekly Nuggets
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* ACADEMIC TAB */}
        {activeTab === 'ACADEMIC' && (
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8">
              <h2 className="text-xl font-bold text-[#2C3531] mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" /> Continuous Assessment & Exams
              </h2>

              {scores.length === 0 ? (
                <div className="text-center p-12 bg-[#F4F1EC]/30 rounded-2xl border border-[#788B81]/10">
                  <TrendingUp className="w-12 h-12 text-[#788B81]/50 mx-auto mb-4" />
                  <p className="text-[#788B81] font-bold">No scores recorded yet for this term.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#788B81]/10">
                    <thead className="bg-[#F4F1EC]/30">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-[#788B81] uppercase tracking-wider rounded-tl-xl">Subject</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-[#788B81] uppercase tracking-wider">CA 1</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-[#788B81] uppercase tracking-wider">CA 2</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-[#788B81] uppercase tracking-wider">Exam</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-[#788B81] uppercase tracking-wider rounded-tr-xl">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#788B81]/10">
                      {scores.map((s, idx) => {
                        const total = (s.ca1_score || 0) + (s.ca2_score || 0) + (s.exam_score || 0)
                        return (
                          <tr key={idx} className="hover:bg-[#F4F1EC]/20 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#2C3531]">{s.class_subject?.subject?.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-[#788B81]">{s.ca1_score ?? '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-[#788B81]">{s.ca2_score ?? '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-[#788B81]">{s.exam_score ?? '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-emerald-600">{total}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI NUGGETS TAB */}
        {activeTab === 'AI' && (
          <div className="space-y-6">
            
            {aiDigests.length === 0 ? (
              <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-12 text-center">
                  <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#2C3531] mb-2">No AI Nuggets Yet</h3>
                  <p className="text-[#788B81] max-w-md mx-auto">
                    Weekly insights and dinner table questions are generated based on the lesson plans approved by the school. Check back later!
                  </p>
                </div>
              </div>
            ) : (
              aiDigests.map((digest) => (
                <div key={digest.id} className="bg-gradient-to-br from-purple-50 to-white p-2 rounded-[2.5rem] border border-purple-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="bg-white/80 rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-purple-100/50 p-8 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-8 border-b border-purple-100 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                          <Brain className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-purple-900">Week {digest.week_number} Digest</h2>
                          <p className="text-sm font-bold text-purple-600">AI Engagement Engine</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Summary */}
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" /> What We Learned
                        </h3>
                        <div className="prose prose-purple prose-sm max-w-none text-[#2C3531] font-medium leading-relaxed">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{digest.summary_content}</ReactMarkdown>
                        </div>
                      </div>

                      {/* Dinner Table Questions */}
                      <div className="bg-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-200">
                        <h3 className="text-sm font-black uppercase tracking-widest text-purple-200 mb-6 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" /> Dinner Table Questions
                        </h3>
                        <ul className="space-y-4">
                          {(digest.questions_json as any[])?.map((q: any, i: number) => (
                            <li key={i} className="flex gap-4 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center font-black text-sm">
                                {i + 1}
                              </span>
                              <div>
                                <p className="font-bold text-white text-lg leading-snug">{q.question}</p>
                                {q.subject && (
                                  <span className="inline-block mt-2 text-xs font-bold bg-purple-500/50 px-2 py-1 rounded-lg">
                                    {q.subject}
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>
        )}

      </div>
    </div>
  )
}
