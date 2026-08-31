import HrTabs from "@/components/hr/HrTabs"
import PayrollClient from "./PayrollClient"

export default function PayrollPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2C3531]">HR & Staff Management</h1>
        <p className="text-[#788B81] mt-1 font-medium">Manage your workforce, leave requests, queries, and payroll.</p>
      </div>

      <HrTabs />

      <PayrollClient />
    </div>
  )
}
