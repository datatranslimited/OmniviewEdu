"use client"
import { useState, useTransition } from "react"
import { createClassLevel, updateClassLevel, deleteClassLevel, createClassArm, deleteClassArm, assignClassStaff, removeClassStaff } from "./actions"
import { PlusCircle, Search, MoreVertical, Users, Edit2, Trash2, Shield, X, UserPlus, BookOpen } from "lucide-react"

export default function ClassesClient({ classLevels, staffList = [] }: { classLevels: any[], staffList?: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  // Modals State
  const [classModalOpen, setClassModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<any | null>(null)
  
  const [armsModalOpen, setArmsModalOpen] = useState(false)
  const [selectedClassForArms, setSelectedClassForArms] = useState<any | null>(null)

  const [staffModalOpen, setStaffModalOpen] = useState(false)
  const [selectedArmForStaff, setSelectedArmForStaff] = useState<any | null>(null)

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

  function openStaffModal(arm: any) {
    setSelectedArmForStaff(arm)
    setStaffModalOpen(true)
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

  async function handleAssignStaff(formData: FormData) {
    setError(null)
    startTransition(async () => {
      formData.append("class_arm_id", selectedArmForStaff.id)
      
      // In a real app, you would pass the current active session_id here. 
      // For now, we will pass a placeholder to avoid breaking if session doesn't exist.
      formData.append("session_id", "00000000-0000-0000-0000-000000000000") // Will fix in session phase
      
      const result = await assignClassStaff(formData)
      if (result?.error) setError(result.error)
    })
  }

  async function handleRemoveStaff(assignmentId: string) {
    if (!confirm("Remove this staff member?")) return
    startTransition(async () => {
      const formData = new FormData()
      formData.append("id", assignmentId)
      const result = await removeClassStaff(formData)
      if (result?.error) alert(result.error)
    })
  }

  // Filter classes
  const filteredClasses = classLevels.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const currentArmsClass = classLevels.find(c => c.id === selectedClassForArms?.id)
  
  // Refresh selected arm in staff modal
  let currentStaffArm = null
  if (selectedArmForStaff) {
    for (const cl of classLevels) {
      const found = cl.class_arms?.find((a: any) => a.id === selectedArmForStaff.id)
      if (found) currentStaffArm = found
    }
  }

  return (
    <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
      <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col h-full">
        
        <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
            <input 
              type="text" 
              placeholder="Search classes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm"
            />
          </div>
          <button 
            onClick={openNewClassModal}
            className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add Class Level
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-[#788B81]/10">
            <thead className="bg-[#F4F1EC]/10">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Class Level</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Section</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Arms & Staff</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#788B81]/10">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-sm font-medium text-[#788B81]">No classes found.</td>
                </tr>
              ) : filteredClasses.map((cls) => (
                <tr key={cls.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-[#F4F1EC] rounded-full border border-[#788B81]/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-[#2C3531]" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-[#2C3531]">{cls.name}</div>
                        <div className="text-xs font-medium text-[#788B81]">{cls.class_arms?.length || 0} Sub-Arms</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-bold text-[#2C3531] bg-[#F4F1EC] px-3 py-1 rounded-lg border border-[#788B81]/10">
                      {cls.section.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-5 min-w-[300px]">
                    <div className="flex flex-wrap gap-2">
                      {cls.class_arms?.map((arm: any) => (
                        <div key={arm.id} className="bg-white border border-[#788B81]/20 rounded-lg p-2 shadow-sm flex flex-col gap-2 w-48">
                          <div className="flex justify-between items-center border-b border-[#788B81]/10 pb-2">
                            <span className="text-sm font-bold text-[#2C3531]">{arm.name}</span>
                            <button 
                              onClick={() => openStaffModal(arm)}
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold bg-indigo-50 px-2 py-1 rounded flex items-center"
                            >
                              <UserPlus className="w-3 h-3 mr-1" /> Staff
                            </button>
                          </div>
                          <div className="flex flex-col gap-1">
                            {arm.staff_assignments?.length > 0 ? (
                              arm.staff_assignments.map((assignment: any) => (
                                <div key={assignment.id} className="text-[10px] font-medium flex justify-between items-center bg-[#F4F1EC]/50 p-1 rounded">
                                  <span className="text-[#788B81] truncate">{assignment.staff.first_name} {assignment.staff.last_name}</span>
                                  <span className="bg-[#2C3531] text-white px-1.5 py-0.5 rounded text-[8px]">{assignment.role === 'CLASS_TEACHER' ? 'Teacher' : 'Manager'}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-[10px] text-gray-400 italic">No staff assigned</span>
                            )}
                          </div>
                        </div>
                      ))}
                      {(!cls.class_arms || cls.class_arms.length === 0) && (
                        <span className="text-xs text-[#788B81] italic flex items-center h-full">No arms configured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openArmsModal(cls)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg">Manage Arms</button>
                    <button onClick={() => openEditClassModal(cls)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button onClick={() => handleDeleteClass(cls.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Level Add/Edit Modal */}
      {classModalOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
            <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-[#F4F1EC]/30">
              <h3 className="text-xl font-bold text-[#2C3531]">{editingClass ? "Edit Class Level" : "New Class Level"}</h3>
              <button onClick={() => setClassModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531] transition-colors p-2 hover:bg-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form action={handleClassSubmit} className="p-8">
              {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#2C3531] mb-2">Class Name (e.g. Primary 1)</label>
                  <input 
                    type="text" 
                    name="name" 
                    defaultValue={editingClass?.name || ""}
                    required 
                    disabled={isPending}
                    className="block w-full rounded-xl border border-[#788B81]/20 px-4 py-3 text-[#2C3531] font-medium focus:ring-2 focus:ring-[#788B81]/30 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2C3531] mb-2">School Section</label>
                  <select 
                    name="section" 
                    defaultValue={editingClass?.section || "PRIMARY"}
                    disabled={isPending}
                    className="block w-full rounded-xl border border-[#788B81]/20 px-4 py-3 text-[#2C3531] font-medium focus:ring-2 focus:ring-[#788B81]/30 focus:border-transparent transition-all outline-none"
                  >
                    <option value="CRECHE">Creche</option>
                    <option value="NURSERY">Nursery</option>
                    <option value="PRIMARY">Primary</option>
                    <option value="JUNIOR_SECONDARY">Junior Secondary</option>
                    <option value="SENIOR_SECONDARY">Senior Secondary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2C3531] mb-2">Order Index (Sort Priority)</label>
                  <input 
                    type="number" 
                    name="order_index" 
                    defaultValue={editingClass?.order_index || 10}
                    required 
                    disabled={isPending}
                    className="block w-full rounded-xl border border-[#788B81]/20 px-4 py-3 text-[#2C3531] font-medium focus:ring-2 focus:ring-[#788B81]/30 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setClassModalOpen(false)} className="px-6 py-3 rounded-xl text-[#788B81] hover:bg-[#F4F1EC] text-sm font-bold transition-colors">Cancel</button>
                <button type="submit" disabled={isPending} className="px-6 py-3 bg-[#2C3531] text-white rounded-xl hover:bg-black text-sm font-bold transition-transform active:scale-95 disabled:opacity-50 flex items-center">
                  {isPending ? "Saving..." : "Save Class Level"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Arms Management Modal */}
      {armsModalOpen && currentArmsClass && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] border border-white/20">
            <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-[#F4F1EC]/30">
              <div>
                <h3 className="text-xl font-bold text-[#2C3531]">Manage Arms</h3>
                <p className="text-sm text-[#788B81] font-medium mt-1">{currentArmsClass.name}</p>
              </div>
              <button onClick={() => setArmsModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531] transition-colors p-2 hover:bg-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1">
              {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
              
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#2C3531] mb-3">Current Arms</h4>
                {currentArmsClass.class_arms?.length === 0 ? (
                  <p className="text-sm text-[#788B81] italic bg-[#F4F1EC]/50 p-4 rounded-xl border border-[#788B81]/10 text-center">No arms configured yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {currentArmsClass.class_arms?.map((arm: any) => (
                      <li key={arm.id} className="flex justify-between items-center p-3 hover:bg-[#F4F1EC]/50 border border-transparent hover:border-[#788B81]/20 rounded-xl group transition-all">
                        <span className="text-sm font-bold text-[#2C3531]">{arm.name}</span>
                        <button 
                          onClick={() => handleDeleteArm(arm.id)} 
                          disabled={isPending}
                          className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700 text-xs font-bold px-3 py-1.5 bg-red-50 rounded-lg transition-all"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-6 border-t border-[#788B81]/10">
                <h4 className="text-sm font-bold text-[#2C3531] mb-3">Add New Arm</h4>
                <form action={handleAddArm} className="flex gap-2">
                  <input 
                    id="arm_name_input"
                    type="text" 
                    name="name" 
                    placeholder={`e.g. ${currentArmsClass.name} A`}
                    required 
                    disabled={isPending}
                    className="flex-1 block w-full rounded-xl border border-[#788B81]/20 px-4 py-2.5 text-[#2C3531] font-medium focus:ring-2 focus:ring-[#788B81]/30 outline-none"
                  />
                  <button type="submit" disabled={isPending} className="bg-[#2C3531] text-white px-5 py-2.5 rounded-xl hover:bg-black text-sm font-bold transition-transform active:scale-95 disabled:opacity-50 whitespace-nowrap">
                    Add Arm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Assignment Modal */}
      {staffModalOpen && currentStaffArm && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] border border-white/20">
            <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-[#F4F1EC]/30">
              <div>
                <h3 className="text-xl font-bold text-[#2C3531]">Assign Team</h3>
                <p className="text-sm text-[#788B81] font-medium mt-1">{currentStaffArm.name}</p>
              </div>
              <button onClick={() => setStaffModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531] transition-colors p-2 hover:bg-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1">
              {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
              
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#2C3531] mb-3">Current Team</h4>
                {currentStaffArm.staff_assignments?.length === 0 ? (
                  <p className="text-sm text-[#788B81] italic bg-[#F4F1EC]/50 p-4 rounded-xl border border-[#788B81]/10 text-center">No staff assigned yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {currentStaffArm.staff_assignments?.map((assignment: any) => (
                      <li key={assignment.id} className="flex justify-between items-center p-3 bg-white border border-[#788B81]/20 rounded-xl shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#2C3531]">{assignment.staff.first_name} {assignment.staff.last_name}</span>
                          <span className="text-xs text-[#788B81] font-medium mt-0.5">{assignment.role.replace('_', ' ')}</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveStaff(assignment.id)} 
                          disabled={isPending}
                          className="text-red-500 hover:text-red-700 text-xs font-bold px-3 py-1.5 bg-red-50 rounded-lg transition-all"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-6 border-t border-[#788B81]/10">
                <h4 className="text-sm font-bold text-[#2C3531] mb-3">Assign New Member</h4>
                <form action={handleAssignStaff} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#788B81] mb-1">Staff Member</label>
                      <select 
                        name="staff_id" 
                        required 
                        disabled={isPending}
                        className="w-full rounded-xl border border-[#788B81]/20 px-3 py-2 text-[#2C3531] text-sm font-medium focus:ring-2 focus:ring-[#788B81]/30 outline-none"
                      >
                        <option value="">Select Staff...</option>
                        {staffList.map((s: any) => (
                          <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.role})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#788B81] mb-1">Role</label>
                      <select 
                        name="role" 
                        required 
                        disabled={isPending}
                        className="w-full rounded-xl border border-[#788B81]/20 px-3 py-2 text-[#2C3531] text-sm font-medium focus:ring-2 focus:ring-[#788B81]/30 outline-none"
                      >
                        <option value="CLASS_TEACHER">Form Teacher</option>
                        <option value="CLASS_MANAGER">Class Manager</option>
                        <option value="LEVEL_COORDINATOR">Level Coordinator</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={isPending} className="w-full bg-[#2C3531] text-white px-5 py-3 rounded-xl hover:bg-black text-sm font-bold transition-transform active:scale-95 disabled:opacity-50 flex justify-center items-center">
                    <Shield className="w-4 h-4 mr-2" /> Assign to Team
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
