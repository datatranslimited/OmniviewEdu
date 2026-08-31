"use client"
import { useState, useTransition } from "react"
import { createClassLevel, updateClassLevel, deleteClassLevel, createClassArm, deleteClassArm } from "./actions"

export default function ClassesClient({ classLevels }: { classLevels: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // Modals State
  const [classModalOpen, setClassModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<any | null>(null)
  
  const [armsModalOpen, setArmsModalOpen] = useState(false)
  const [selectedClassForArms, setSelectedClassForArms] = useState<any | null>(null)

  function openNewClassModal() {
    setEditingClass(null)
    setClassModalOpen(true)
    setError(null)
  }

  function openEditClassModal(cls: any) {
    setEditingClass(cls)
    setClassModalOpen(true)
    setError(null)
  }

  function openArmsModal(cls: any) {
    setSelectedClassForArms(cls)
    setArmsModalOpen(true)
    setError(null)
  }

  async function handleClassSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      let result
      if (editingClass) {
        formData.append("id", editingClass.id)
        result = await updateClassLevel(formData)
      } else {
        result = await createClassLevel(formData)
      }
      
      if (result?.error) setError(result.error)
      else setClassModalOpen(false)
    })
  }

  async function handleDeleteClass(id: string) {
    if (!confirm("Are you sure you want to delete this class entirely?")) return
    startTransition(async () => {
      const formData = new FormData()
      formData.append("id", id)
      const result = await deleteClassLevel(formData)
      if (result?.error) alert(result.error)
    })
  }

  async function handleAddArm(formData: FormData) {
    setError(null)
    startTransition(async () => {
      formData.append("class_level_id", selectedClassForArms.id)
      const result = await createClassArm(formData)
      if (result?.error) setError(result.error)
      else {
        // Just clear the input, don't close modal so they can add more
        const input = document.getElementById("arm_name_input") as HTMLInputElement
        if (input) input.value = ""
      }
    })
  }

  async function handleDeleteArm(id: string) {
    if (!confirm("Delete this arm?")) return
    startTransition(async () => {
      const formData = new FormData()
      formData.append("id", id)
      const result = await deleteClassArm(formData)
      if (result?.error) alert(result.error)
    })
  }

  // Refresh selected class in arms modal when data changes
  const currentArmsClass = classLevels.find(c => c.id === selectedClassForArms?.id)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Class Levels & Arms</h2>
          <p className="text-sm text-gray-500">Manage standard classes and their sub-arms (A, B, C).</p>
        </div>
        <button 
          onClick={openNewClassModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-sm"
        >
          + Add Class Level
        </button>
      </div>

      {/* Classes Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arms</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classLevels.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No classes found.</td>
              </tr>
            ) : classLevels.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cls.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.section.replace('_', ' ')}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {cls.class_arms.map((arm: any) => (
                      <span key={arm.id} className="bg-gray-100 border border-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                        {arm.name.replace(cls.name, '').trim() || 'General'}
                      </span>
                    ))}
                    {cls.class_arms.length === 0 && <span className="text-gray-400 italic">No arms</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openArmsModal(cls)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold">Manage Arms</button>
                  <button onClick={() => openEditClassModal(cls)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => handleDeleteClass(cls.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Class Level Add/Edit Modal */}
      {classModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">{editingClass ? "Edit Class Level" : "Add Class Level"}</h3>
              <button onClick={() => setClassModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form action={handleClassSubmit} className="p-6">
              {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Class Name (e.g. Primary 1)</label>
                  <input 
                    type="text" 
                    name="name" 
                    defaultValue={editingClass?.name || ""}
                    required 
                    disabled={isPending}
                    className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">School Section</label>
                  <select 
                    name="section" 
                    defaultValue={editingClass?.section || "PRIMARY"}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Order Index (used for sorting)</label>
                  <input 
                    type="number" 
                    name="order_index" 
                    defaultValue={editingClass?.order_index || 10}
                    required 
                    disabled={isPending}
                    className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setClassModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                  {isPending ? "Saving..." : "Save Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Arms Management Modal */}
      {armsModalOpen && currentArmsClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Manage Arms</h3>
                <p className="text-xs text-gray-500">{currentArmsClass.name}</p>
              </div>
              <button onClick={() => setArmsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Arms</h4>
                {currentArmsClass.class_arms.length === 0 ? (
                  <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded border border-gray-100">No arms configured yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {currentArmsClass.class_arms.map((arm: any) => (
                      <li key={arm.id} className="flex justify-between items-center p-2 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded group">
                        <span className="text-sm font-medium text-gray-900">{arm.name}</span>
                        <button 
                          onClick={() => handleDeleteArm(arm.id)} 
                          disabled={isPending}
                          className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700 text-xs font-medium px-2 py-1 bg-red-50 rounded"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Add New Arm</h4>
                <form action={handleAddArm} className="flex gap-2">
                  <input 
                    id="arm_name_input"
                    type="text" 
                    name="name" 
                    placeholder={`e.g. ${currentArmsClass.name} A`}
                    required 
                    disabled={isPending}
                    className="flex-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50"
                  />
                  <button type="submit" disabled={isPending} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium disabled:opacity-50 whitespace-nowrap">
                    Add Arm
                  </button>
                </form>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-right">
               <button onClick={() => setArmsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
