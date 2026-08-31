"use client"
import { useState } from "react"
import AcademicsTabs from "@/components/academics/AcademicsTabs"
import { formatUnambiguousDate } from "@/lib/formatDate"

export default function ExamsClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          <h2 className="text-lg font-bold text-gray-900">Termly Examination Schedule</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + Schedule Exam
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject / Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invigilator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-gray-900">Mathematics</div>
                  <div className="text-sm text-blue-600">SS 2 (All Arms)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatUnambiguousDate("2024-12-10T00:00:00.000Z")}</div>
                  <div className="text-xs text-gray-500">09:00 AM - 11:30 AM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mr. Ebenezer Ali</div>
                  <div className="text-xs text-gray-500">Hall B</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Upcoming</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-gray-900">English Language</div>
                  <div className="text-sm text-blue-600">JSS 1 (All Arms)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatUnambiguousDate("2024-12-11T00:00:00.000Z")}</div>
                  <div className="text-xs text-gray-500">09:00 AM - 11:00 AM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mrs. Sarah Johnson</div>
                  <div className="text-xs text-gray-500">Main Hall</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Upcoming</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Schedule Termly Exam</h3>
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Class Level</label>
                      <select className="w-full border-gray-300 rounded-md shadow-sm">
                        <option>JSS 1</option>
                        <option>SS 2</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Subject</label>
                      <select className="w-full border-gray-300 rounded-md shadow-sm">
                        <option>Mathematics</option>
                        <option>English Language</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Exam Date</label>
                      <input type="date" className="w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Duration (Mins)</label>
                      <input type="number" defaultValue="120" className="w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Invigilator</label>
                      <select className="w-full border-gray-300 rounded-md shadow-sm">
                        <option>Mr. Ebenezer Ali</option>
                        <option>Mrs. Sarah Johnson</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Venue / Hall</label>
                      <input type="text" placeholder="e.g. Main Hall" className="w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">
                  Schedule Exam
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
