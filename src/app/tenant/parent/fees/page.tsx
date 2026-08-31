// Force TS Index Update
import FeesClient from "@/app/tenant/parent/fees/FeesClient"

export default async function FeesPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <FeesClient />
    </div>
  )
}
