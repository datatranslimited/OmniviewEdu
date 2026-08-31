"use client"
import { useState, useTransition } from "react"
import { onboardStaff } from "./actions"
import { Camera } from "lucide-react"

export default function StaffClient({ staffMembers }: { staffMembers: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // Modals State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewingProfile, setViewingProfile] = useState<any | null>(null)

  function openOnboardModal() {
    setIsModalOpen(true)
    setError(null)
  }

  function viewStaffDetails(staff: any) {
    setViewingProfile(staff)
  }

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await onboardStaff(formData)
      if (result?.error) setError(result.error)
      else setIsModalOpen(false)
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Staff & Roles</h2>
          <p className="text-sm text-gray-500">Manage teachers, bursars, and principals.</p>
        </div>
        <button 
          onClick={openOnboardModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-sm shadow-sm"
        >
          + Onboard Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffMembers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No staff members onboarded yet.</td>
              </tr>
            ) : staffMembers.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                      {staff.first_name[0]}{staff.last_name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{staff.first_name} {staff.last_name}</div>
                      <div className="text-xs text-gray-500">{staff.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${staff.role === 'TEACHER' ? 'bg-green-100 text-green-800' : 
                      staff.role === 'BURSAR' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {staff.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {staff.phone_number || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => viewStaffDetails(staff)} className="text-indigo-600 hover:text-indigo-900 font-medium">View Full Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Onboarding Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Onboard New Staff Member</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form action={handleSubmit} className="overflow-y-auto p-6">
              {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">{error}</div>}
              
              <div className="space-y-8">
                {/* 1. Core Details */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 pb-2 border-b">1. Personal & Role Details</h4>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-4">
                    {/* Passport Photo Upload */}
                    <div className="relative group w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 shrink-0 cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all overflow-hidden">
                      <Camera className="w-6 h-6 mb-1 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      <span className="text-[9px] uppercase font-bold tracking-widest text-center px-1 group-hover:text-gray-600 transition-colors">Passport</span>
                      <input type="file" name="passport_photo" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="first_name" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="last_name" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" name="phone_number" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Assign Role <span className="text-red-500">*</span></label>
                        <select name="role" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50">
                          <option value="TEACHER">Teacher</option>
                          <option value="BURSAR">Bursar</option>
                          <option value="PRINCIPAL">Principal</option>
                          <option value="SCHOOL_ADMIN">School Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. HR Details */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 pb-2 border-b">2. Educational Background</h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Highest Education Level</label>
                      <input type="text" name="education_level" placeholder="e.g. B.Sc Mathematics, NCE" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                  </div>
                </div>

                {/* 3. Guarantor */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 pb-2 border-b">3. Guarantor Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Guarantor Full Name</label>
                      <input type="text" name="guarantor_name" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guarantor Phone</label>
                      <input type="text" name="guarantor_phone" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guarantor Address</label>
                      <input type="text" name="guarantor_address" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                  </div>
                </div>

                {/* 4. Bank */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 pb-2 border-b">4. Bank & Payroll Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                      <input type="text" name="bank_name" placeholder="e.g. Zenith Bank, GTBank" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Name</label>
                      <input type="text" name="account_name" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Number</label>
                      <input type="text" name="account_number" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                  {isPending ? "Creating Account..." : "Onboard Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Staff Profile</h3>
              <button onClick={() => setViewingProfile(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                  {viewingProfile.first_name[0]}{viewingProfile.last_name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{viewingProfile.first_name} {viewingProfile.last_name}</h2>
                  <p className="text-gray-500">{viewingProfile.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="mt-1 text-sm text-gray-900">{viewingProfile.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="mt-1 text-sm text-gray-900">{viewingProfile.phone_number || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Education Level</p>
                  <p className="mt-1 text-sm text-gray-900">{viewingProfile.staff_profile?.education_level || "Not provided"}</p>
                </div>
              </div>

              <hr className="my-6 border-gray-200" />

              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Guarantor Details</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
                <div>
                  <p className="text-xs font-medium text-gray-500">Name</p>
                  <p className="text-sm text-gray-900">{viewingProfile.staff_profile?.guarantor_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{viewingProfile.staff_profile?.guarantor_phone || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium text-gray-500">Address</p>
                  <p className="text-sm text-gray-900">{viewingProfile.staff_profile?.guarantor_address || "N/A"}</p>
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Bank Details</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                <div>
                  <p className="text-xs font-medium text-gray-500">Bank Name</p>
                  <p className="text-sm text-gray-900">{viewingProfile.staff_profile?.bank_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Account Number</p>
                  <p className="text-sm text-gray-900 font-mono">{viewingProfile.staff_profile?.account_number || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium text-gray-500">Account Name</p>
                  <p className="text-sm text-gray-900">{viewingProfile.staff_profile?.account_name || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-right">
               <button onClick={() => setViewingProfile(null)} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium shadow-sm">Close Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
