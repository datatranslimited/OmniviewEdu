"use client"
import { useState } from "react"
import AcademicsTabs from "@/components/academics/AcademicsTabs"
import { formatUnambiguousDate } from "@/lib/formatDate"

// --- DUMMY DATA ---
type LessonStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface LessonNote {
  id: string
  teacherName: string
  subject: string
  class: string
  week: number
  topic: string
  content: string
  status: LessonStatus
  submittedAt: string
}

const mockNotes: LessonNote[] = [
  {
    id: "LN-001",
    teacherName: "Ebenezer Ali",
    subject: "Basic Science",
    class: "JSS 1 A",
    week: 3,
    topic: "The Human Skeletal System",
    content: "Objective: Students will understand the 206 bones in the human body...\n\nActivities: 1. Draw a skeleton. 2. Memorize the femur and skull...",
    status: "PENDING",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: "LN-002",
    teacherName: "Sarah Johnson",
    subject: "English Language",
    class: "Primary 4 Gold",
    week: 3,
    topic: "Introduction to Nouns",
    content: "Objective: Students will be able to identify a person, place, or thing.\n\nActivities: 1. Read 'The Big Dog'. 2. Circle all nouns in the passage.",
    status: "APPROVED",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: "LN-003",
    teacherName: "Michael Okon",
    subject: "Mathematics",
    class: "SS 2 Science",
    week: 3,
    topic: "Quadratic Equations",
    content: "Objective: Solve quadratic equations using the formula method.\n\nActivities: Work through examples on the board. Assignment: Pages 45-47.",
    status: "REJECTED",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
]

export default function LessonNotesClient() {
  const [selectedNote, setSelectedNote] = useState<LessonNote | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedNuggets, setGeneratedNuggets] = useState<string | null>(null)

  const handleGenerateNuggets = () => {
    setIsGenerating(true)
    // Simulate AI loading
    setTimeout(() => {
      setGeneratedNuggets(`✨ **Weekly Nugget: ${selectedNote?.topic}**\n\nThis week in ${selectedNote?.subject}, your child learned about ${selectedNote?.topic}. They explored the core concepts and participated in classroom activities to strengthen their understanding.\n\n**🍽️ Dinner Table Questions to Ask Your Child:**\n1. What was the most interesting thing you learned about ${selectedNote?.topic} today?\n2. Can you explain one concept from the lesson to me?\n3. How do you think this topic applies to real life?`)
      setIsGenerating(false)
    }, 2000)
  }

  const getStatusBadge = (status: LessonStatus) => {
    switch(status) {
      case 'APPROVED': return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Approved</span>
      case 'PENDING': return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Pending Review</span>
      case 'REJECTED': return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">Rejected</span>
    }
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academics Core</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage subjects, classes, lesson plans, and exams.
          </p>
        </div>
      </div>

      <AcademicsTabs />

      {/* Main Content */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Lesson Plan Approvals</h2>
          <div className="flex space-x-2">
            <select className="border-gray-300 rounded-md text-sm">
              <option>Week 3</option>
              <option>Week 2</option>
              <option>Week 1</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class / Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockNotes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{note.teacherName}</div>
                    <div className="text-xs text-gray-500">{formatUnambiguousDate(note.submittedAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-blue-600">{note.class}</div>
                    <div className="text-sm text-gray-500">{note.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">Week {note.week}: {note.topic}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(note.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => { setSelectedNote(note); setGeneratedNuggets(null) }}
                      className="text-blue-600 hover:text-blue-900 border border-blue-600 px-3 py-1 rounded"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedNote(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl leading-6 font-bold text-gray-900">
                        Lesson Plan Review
                      </h3>
                      {getStatusBadge(selectedNote.status)}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div><span className="text-gray-500">Teacher:</span> <span className="font-bold">{selectedNote.teacherName}</span></div>
                        <div><span className="text-gray-500">Subject:</span> <span className="font-bold">{selectedNote.subject}</span></div>
                        <div><span className="text-gray-500">Class:</span> <span className="font-bold">{selectedNote.class}</span></div>
                        <div><span className="text-gray-500">Topic:</span> <span className="font-bold">Week {selectedNote.week}: {selectedNote.topic}</span></div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-2">Teacher's Notes</h4>
                      <div className="bg-white border border-gray-300 p-4 rounded-md text-gray-700 whitespace-pre-wrap min-h-[150px]">
                        {selectedNote.content}
                      </div>
                    </div>

                    {/* AI ENGINE SECTION (Only visible if approved) */}
                    {selectedNote.status === 'APPROVED' && (
                      <div className="mt-6 border-t pt-6">
                        <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          AI Parent Engagement Engine
                        </h4>
                        
                        {!generatedNuggets ? (
                          <button 
                            onClick={handleGenerateNuggets}
                            disabled={isGenerating}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-md shadow-md hover:shadow-lg transition-all flex justify-center items-center"
                          >
                            {isGenerating ? 'Analyzing Lesson Plan & Drafting Nuggets...' : '✨ Generate "Weekly Parent Nuggets" from this Plan'}
                          </button>
                        ) : (
                          <div className="bg-purple-50 border border-purple-200 p-4 rounded-md relative">
                            <button className="absolute top-2 right-2 text-purple-600 hover:text-purple-800 text-sm font-bold bg-white px-2 py-1 rounded border border-purple-200 shadow-sm">
                              Push to Parent Portal
                            </button>
                            <div className="whitespace-pre-wrap text-gray-800 text-sm font-medium">
                              {generatedNuggets}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                {selectedNote.status === 'PENDING' && (
                  <>
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                      Approve Plan
                    </button>
                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-600 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                      Reject with Feedback
                    </button>
                  </>
                )}
                <button 
                  type="button" 
                  onClick={() => setSelectedNote(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
