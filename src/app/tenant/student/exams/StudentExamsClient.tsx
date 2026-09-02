"use client"

import React, { useState, useTransition, useEffect } from "react"
import { Play, CheckCircle2, Clock, BookOpen, AlertTriangle, Loader2 } from "lucide-react"
import { startExamAttempt, submitExam } from "./actions"

export default function StudentExamsClient({ availableExams }: any) {
  const [activeExam, setActiveExam] = useState<any | null>(null)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const [resultScore, setResultScore] = useState<number | null>(null)

  // Timer logic
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || !activeExam) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev && prev <= 1) {
          clearInterval(timer)
          handleAutoSubmit()
          return 0
        }
        return prev ? prev - 1 : 0
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, activeExam])

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  function handleStartExam(exam: any) {
    startTransition(async () => {
      const res = await startExamAttempt(exam.id)
      if (res?.error) {
        alert(res.error)
      } else if (res?.success) {
        setAttemptId(res.attemptId)
        setActiveExam(exam)
        setAnswers({})
        setTimeLeft(exam.duration_minutes * 60)
        setResultScore(null)
      }
    })
  }

  function handleSelectOption(questionId: string, optionId: string) {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  function handleSubmit() {
    if (!confirm("Are you sure you want to submit your exam? You cannot change your answers after this.")) {
      return
    }
    executeSubmit()
  }

  function handleAutoSubmit() {
    alert("Time is up! Your exam will be automatically submitted.")
    executeSubmit()
  }

  function executeSubmit() {
    if (!attemptId) return
    startTransition(async () => {
      const res = await submitExam(attemptId, answers)
      if (res?.error) {
        alert(res.error)
      } else {
        setResultScore(res?.score ?? null)
        setActiveExam(null)
      }
    })
  }

  // Active Exam View (Taking Test)
  if (activeExam) {
    return (
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-[#788B81]/20 relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-[#788B81]/10">
          <div>
            <h2 className="text-2xl font-bold text-[#2C3531]">{activeExam.title}</h2>
            <p className="text-[#788B81] font-medium">{activeExam.class_subject.subject.name}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center bg-[#F4F1EC] py-2 px-4 rounded-xl border border-[#788B81]/20">
            <Clock className={`w-5 h-5 mr-2 ${timeLeft && timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-[#2C3531]'}`} />
            <span className={`font-bold font-mono text-xl ${timeLeft && timeLeft < 60 ? 'text-red-600' : 'text-[#2C3531]'}`}>
              {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
            </span>
          </div>
        </div>

        <div className="space-y-12">
          {activeExam.questions.map((q: any, i: number) => (
            <div key={q.id} className="space-y-4">
              <h3 className="text-lg font-bold text-[#2C3531] flex">
                <span className="mr-3 text-[#788B81]">{i + 1}.</span> {q.text}
              </h3>
              
              <div className="pl-8 space-y-3">
                {q.options.map((opt: any, oIndex: number) => {
                  const isSelected = answers[q.id] === opt.id
                  return (
                    <label 
                      key={opt.id} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-[#788B81]/20 hover:border-[#788B81]/50 bg-white'}`}
                    >
                      <input 
                        type="radio" 
                        name={`q_${q.id}`} 
                        value={opt.id} 
                        checked={isSelected}
                        onChange={() => handleSelectOption(q.id, opt.id)}
                        className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 mr-4"
                      />
                      <span className="font-medium text-[#2C3531]">
                        {String.fromCharCode(65 + oIndex)}. {opt.text}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#788B81]/10 flex justify-between items-center">
          <p className="text-sm font-bold text-[#788B81]">
            Answered {Object.keys(answers).length} of {activeExam.questions.length} questions
          </p>
          <button 
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-[#2C3531] hover:bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center transition-all disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
            Submit Exam
          </button>
        </div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="space-y-6">
      
      {resultScore !== null && (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex items-start shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-emerald-900 font-bold text-lg mb-1">Exam Submitted Successfully!</h3>
            <p className="text-emerald-800">Your final score is: <span className="font-bold text-xl">{resultScore}</span></p>
            <p className="text-sm text-emerald-700 mt-2">The result has been recorded in your academic profile.</p>
          </div>
        </div>
      )}

      {availableExams.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#788B81]/20">
          <BookOpen className="w-12 h-12 text-[#788B81]/40 mx-auto mb-4" />
          <p className="text-[#788B81] text-lg">You have no upcoming exams right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableExams.map((exam: any) => {
            const attempt = exam.attempts[0]
            const isCompleted = attempt?.status === 'COMPLETED'
            
            return (
              <div key={exam.id} className="bg-white rounded-3xl p-6 shadow-xl border border-[#788B81]/20 flex flex-col hover:-translate-y-1 transition-transform">
                <div className="mb-4">
                  {isCompleted ? (
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3">Completed</span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-3">Pending</span>
                  )}
                  <h3 className="text-xl font-bold text-[#2C3531] leading-tight mb-2">{exam.title}</h3>
                  <p className="text-sm text-[#788B81] font-medium">{exam.class_subject.subject.name}</p>
                </div>
                
                <div className="mt-auto pt-4 flex justify-between items-end">
                  <div className="space-y-1 text-sm text-[#788B81]">
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {exam.duration_minutes} Minutes</div>
                    <div className="flex items-center"><BookOpen className="w-4 h-4 mr-2" /> {exam.questions.length} Questions</div>
                  </div>
                  
                  {isCompleted ? (
                    <div className="text-right">
                      <p className="text-xs text-[#788B81] font-bold uppercase mb-1">Score</p>
                      <p className="text-2xl font-black text-[#2C3531]">{attempt.score}</p>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleStartExam(exam)}
                      disabled={isPending}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                    >
                      {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
