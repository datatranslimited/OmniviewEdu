"use client"
import { useState, useTransition } from "react"
import { enrollStudent } from "./actions"
import { Camera } from "lucide-react"

export default function StudentsClient({ students, classArms }: { students: any[], classArms: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
    setError(null)
  }

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await enrollStudent(formData)
      if (result?.error) setError(result.error)
      else setIsModalOpen(false)
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Student Directory</h2>
          <p className="text-sm text-gray-500">Manage enrolled students and assign them to classes.</p>
        </div>
        <button 
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-sm shadow-sm"
        >
          + Enroll Student
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">No students enrolled yet.</td>
              </tr>
            ) : students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.admission_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {student.last_name}, {student.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gender || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.current_class_arm ? student.current_class_arm.name : <span className="text-red-400 italic">Unassigned</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enrollment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Enroll New Student</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form action={handleSubmit} className="overflow-y-auto p-6">
              {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">{error}</div>}
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 pb-2 border-b">1. Identity & Records</h4>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-4">
                    {/* Passport Photo Upload */}
                    <div className="relative group w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 shrink-0 cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all overflow-hidden">
                      <Camera className="w-6 h-6 mb-1 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      <span className="text-[9px] uppercase font-bold tracking-widest text-center px-1 group-hover:text-gray-600 transition-colors">Passport</span>
                      <input type="file" name="passport_photo" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Admission Number <span className="text-red-500">*</span></label>
                        <input type="text" name="admission_number" placeholder="e.g. OMV/2024/001" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="first_name" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="last_name" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 pb-2 border-b">2. Demographics & Class</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input type="date" name="date_of_birth" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <select name="gender" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50">
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Assign to Class</label>
                      <select name="current_class_arm_id" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50">
                        <option value="">-- Do not assign yet --</option>
                        {classArms.map(arm => (
                          <option key={arm.id} value={arm.id}>{arm.name}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">You can assign the student to a specific class arm later if left blank.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                  {isPending ? "Enrolling..." : "Enroll Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
