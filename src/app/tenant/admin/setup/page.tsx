"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { setupAcademicSession, generateClassLevels, generateClassArms, generateSubjects } from "../actions"

export default function SetupWizardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function onSessionSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await setupAcademicSession(formData)
      if (result?.error) setError(result.error)
      else setStep(2)
    })
  }

  async function onLevelsSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await generateClassLevels(formData)
      if (result?.error) setError(result.error)
      else setStep(3)
    })
  }

  async function onArmsSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await generateClassArms(formData)
      if (result?.error) setError(result.error)
      else setStep(4)
    })
  }

  async function onSubjectsSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await generateSubjects(formData)
      if (result?.error) setError(result.error)
      else router.push("/tenant/dashboard")
    })
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">School Setup Wizard</h1>
        <p className="text-gray-500 mt-1">Let's generate your entire school structure.</p>
      </div>

      {/* Stepper UI */}
      <div className="flex items-center space-x-2 mb-8 text-sm">
        <div className={`flex items-center justify-center h-8 w-8 rounded-full font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
        <div className={`h-1 w-10 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        <div className={`h-1 w-10 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full font-semibold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        <div className={`h-1 w-10 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full font-semibold ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        {error && <div className="bg-red-50 p-3 text-red-600 text-sm rounded mb-4">{error}</div>}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Initial Academic Session</h2>
            <form action={onSessionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Session Name (e.g., 2026/2027)</label>
                <input type="text" name="session_name" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input type="date" name="start_date" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input type="date" name="end_date" required className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save & Continue</button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Class Levels</h2>
            <p className="text-sm text-gray-600 mb-4">Select the sections your school offers. We will automatically generate the standard classes (e.g. Primary 1-6).</p>
            <form action={onLevelsSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2"><input type="checkbox" name="sections" value="CRECHE" className="rounded" /><span className="text-gray-900">Creche</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" name="sections" value="NURSERY" className="rounded" /><span className="text-gray-900">Nursery (1 & 2)</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" name="sections" value="PRIMARY" className="rounded" /><span className="text-gray-900">Primary (1 - 6)</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" name="sections" value="JUNIOR_SECONDARY" className="rounded" /><span className="text-gray-900">Junior Secondary (JSS 1 - 3)</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" name="sections" value="SENIOR_SECONDARY" className="rounded" /><span className="text-gray-900">Senior Secondary (SS 1 - 3)</span></label>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Generate Classes</button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Class Arms</h2>
            <p className="text-sm text-gray-600 mb-4">If your classes have multiple arms (e.g. Primary 1A, Primary 1B), list the suffixes separated by commas. Leave blank if you only have one arm per class.</p>
            <form action={onArmsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Arm Suffixes (e.g., A, B, C or Gold, Silver)</label>
                <input type="text" name="suffixes" placeholder="A, B, C" className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900" />
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Generate Arms</button>
              </div>
            </form>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Step 4: Default Subjects</h2>
            <p className="text-sm text-gray-600 mb-4">Select the standard subjects taught in your school. You can always add custom ones later.</p>
            <form action={onSubjectsSubmit} className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Primary & Junior Subjects</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Mathematics", "English Language", "Basic Science", "Social Studies", "Civic Education", "Computer Studies"].map(sub => (
                    <label key={sub} className="flex items-center space-x-2"><input type="checkbox" name="primary_subjects" value={sub} className="rounded" /><span className="text-sm text-gray-700">{sub}</span></label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Senior Secondary Subjects</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Physics", "Chemistry", "Biology", "Economics", "Further Mathematics", "Literature in English", "Government", "Accounting"].map(sub => (
                    <label key={sub} className="flex items-center space-x-2"><input type="checkbox" name="secondary_subjects" value={sub} className="rounded" /><span className="text-sm text-gray-700">{sub}</span></label>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isPending} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-medium">Finish Setup</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
