"use client"
import { useState, useTransition } from "react"
import { createSubject, updateSubject, deleteSubject } from "./actions"

export default function SubjectsClient({ subjects }: { subjects: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<any | null>(null)

  function openNewModal() {
    setEditingSubject(null)
    setIsModalOpen(true)
    setError(null)
  }

  function openEditModal(subject: any) {
    setEditingSubject(subject)
    setIsModalOpen(true)
    setError(null)
  }

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      let result
      if (editingSubject) {
        formData.append("id", editingSubject.id)
        result = await updateSubject(formData)
      } else {
        result = await createSubject(formData)
      }
      
      if (result?.error) setError(result.error)
      else setIsModalOpen(false)
    })
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this subject?")) return
    setError(null)
    startTransition(async () => {
      const formData = new FormData()
      formData.append("id", id)
      const result = await deleteSubject(formData)
      if (result?.error) {
        alert(result.error) // use native alert for delete errors so they are prominent
      }
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Subjects</h2>
          <p className="text-sm text-gray-500">Manage the curriculum offered at your school.</p>
        </div>
        <button 
          onClick={openNewModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-sm"
        >
          + Add Subject
        </button>
      </div>

      {/* Subjects Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No subjects found.</td>
              </tr>
            ) : subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.section.replace('_', ' ')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(sub)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(sub.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">{editingSubject ? "Edit Subject" : "Add New Subject"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form action={handleSubmit} className="p-6">
              {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    defaultValue={editingSubject?.name || ""}
                    required 
                    disabled={isPending}
                    className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">School Section</label>
                  <select 
                    name="section" 
                    defaultValue={editingSubject?.section || "PRIMARY"}
                    disabled={isPending}
                    className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50"
                  >
                    <option value="CRECHE">Creche</option>
                    <option value="NURSERY">Nursery</option>
                    <option value="PRIMARY">Primary</option>
                    <option value="JUNIOR_SECONDARY">Junior Secondary</option>
                    <option value="SENIOR_SECONDARY">Senior Secondary</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                  {isPending ? "Saving..." : "Save Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
