"use client"

import React, { useState, useTransition } from "react"
import { Plus, X, Check, Save, Loader2, BookOpen, Clock, Users } from "lucide-react"
import { createExam } from "./actions"

export default function TeacherExamsClient({ classSubjects, existingExams }: any) {
  const [isPending, startTransition] = useTransition()
  const [isCreating, setIsCreating] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])

  function addQuestion() {
    setQuestions([...questions, {
      id: Date.now(),
      text: "",
      marks: 1,
      options: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]
    }])
  }

  function updateQuestionText(qIndex: number, text: string) {
    const newQ = [...questions]
    newQ[qIndex].text = text
    setQuestions(newQ)
  }

  function updateOptionText(qIndex: number, oIndex: number, text: string) {
    const newQ = [...questions]
    newQ[qIndex].options[oIndex].text = text
    setQuestions(newQ)
  }

  function setCorrectOption(qIndex: number, oIndex: number) {
    const newQ = [...questions]
    newQ[qIndex].options.forEach((o: any, idx: number) => {
      o.isCorrect = (idx === oIndex)
    })
    setQuestions(newQ)
  }

  function removeQuestion(qIndex: number) {
    const newQ = [...questions]
    newQ.splice(qIndex, 1)
    setQuestions(newQ)
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (questions.length === 0) {
      alert("Please add at least one question")
      return
    }

    // Validate options
    for (let q of questions) {
      if (!q.text.trim()) {
        alert("All questions must have text")
        return
      }
      for (let o of q.options) {
        if (!o.text.trim()) {
          alert("All options must have text")
          return
        }
      }
    }

    const formData = new FormData(e.currentTarget)
    formData.append("questionsPayload", JSON.stringify(questions))

    startTransition(async () => {
      const res = await createExam(formData)
      if (res?.error) {
        alert(res.error)
      } else {
        setIsCreating(false)
        setQuestions([])
      }
    })
  }

  if (isCreating) {
    return (
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#788B81]/20">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-[#2C3531]">Drafting New Exam</h2>
          <button onClick={() => setIsCreating(false)} className="text-[#788B81] hover:text-red-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-[#2C3531]">Exam Title</label>
              <input 
                type="text" 
                name="title" 
                required 
                placeholder="e.g., Mid-Term Mathematics Test"
                className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#788B81]/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#2C3531]">Duration (Minutes)</label>
              <input 
                type="number" 
                name="duration" 
                required 
                defaultValue="30"
                min="5"
                className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#788B81]/40"
              />
            </div>
            <div className="space-y-2 md:col-span-3">
              <label className="text-sm font-bold text-[#2C3531]">Target Class & Subject</label>
              <select 
                name="classSubjectId" 
                required
                className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#788B81]/40"
              >
                <option value="">Select a subject you teach...</option>
                {classSubjects.map((cs: any) => (
                  <option key={cs.id} value={cs.id}>
                    {cs.class_arm.class_level.name} {cs.class_arm.name} - {cs.subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#2C3531]">Questions</h3>
              <button 
                type="button" 
                onClick={addQuestion}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 flex items-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Question
              </button>
            </div>

            {questions.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-[#788B81]/30 rounded-2xl">
                <p className="text-[#788B81]">No questions added yet. Click 'Add Question' to begin.</p>
              </div>
            )}

            {questions.map((q, qIndex) => (
              <div key={q.id} className="p-6 border border-[#788B81]/30 rounded-2xl bg-[#F4F1EC]/20 space-y-4 relative group">
                <button 
                  type="button" 
                  onClick={() => removeQuestion(qIndex)}
                  className="absolute top-4 right-4 text-[#788B81] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-start">
                  <span className="font-bold text-[#2C3531] mr-3 pt-3">Q{qIndex + 1}.</span>
                  <textarea 
                    value={q.text}
                    onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                    placeholder="Enter question text here..."
                    className="flex-1 bg-white border border-[#788B81]/20 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#788B81]/40 resize-none h-24"
                  />
                </div>

                <div className="pl-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt: any, oIndex: number) => (
                    <div key={oIndex} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setCorrectOption(qIndex, oIndex)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${opt.isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-[#788B81]/30 hover:border-emerald-500 text-transparent'}`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <input 
                        type="text"
                        value={opt.text}
                        onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                        className={`flex-1 bg-white border rounded-xl py-2 px-3 outline-none focus:ring-2 focus:ring-[#788B81]/40 ${opt.isCorrect ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-[#788B81]/20'}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-[#2C3531] hover:bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center transition-all disabled:opacity-50"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
              Publish Exam
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      
      <button 
        onClick={() => setIsCreating(true)}
        className="w-full py-8 border-2 border-dashed border-[#788B81]/40 rounded-3xl text-center hover:bg-[#F4F1EC]/50 hover:border-[#2C3531] transition-all group"
      >
        <div className="w-16 h-16 bg-[#2C3531] text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#2C3531]/20">
          <Plus className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#2C3531]">Create New Exam</h3>
        <p className="text-[#788B81] mt-1">Author a new multiple-choice test for your students</p>
      </button>

      <div>
        <h2 className="text-xl font-bold text-[#2C3531] mb-6">Published Exams</h2>
        
        {existingExams.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#788B81]/20">
            <BookOpen className="w-12 h-12 text-[#788B81]/40 mx-auto mb-4" />
            <p className="text-[#788B81] text-lg">You haven't published any exams yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {existingExams.map((exam: any) => (
              <div key={exam.id} className="bg-white rounded-3xl p-6 shadow-xl border border-[#788B81]/20 flex flex-col h-full hover:-translate-y-1 transition-transform">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3">Published</span>
                  <h3 className="text-lg font-bold text-[#2C3531] leading-tight mb-2">{exam.title}</h3>
                  <p className="text-sm text-[#788B81] font-medium">
                    {exam.class_subject.class_arm.class_level.name} {exam.class_subject.class_arm.name} • {exam.class_subject.subject.name}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-[#788B81]/10 flex justify-between items-center text-sm text-[#788B81]">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" /> {exam.duration_minutes}m
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1.5" /> {exam._count.questions} Qs
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5" /> {exam._count.attempts}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
