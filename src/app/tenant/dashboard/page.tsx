import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to your Dashboard!</h1>
      <p className="text-gray-600 mb-6">
        This is the main hub for your school. 
      </p>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md">
        <h2 className="font-semibold mb-2">Next Step: Setup Your School</h2>
        <p className="text-sm mb-4">Before you can add students or teachers, you need to configure your first Academic Session.</p>
        <Link href="/tenant/admin/setup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-sm">
          Go to Setup Wizard
        </Link>
      </div>
    </div>
  )
}
