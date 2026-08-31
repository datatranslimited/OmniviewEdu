import InventoryClient from "@/app/tenant/admin/inventory/InventoryClient"

export default function InventoryPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">Inventory & Assets</h1>
          <p className="text-[#788B81] mt-1 font-medium">Manage school assets, monitor stock levels, and allocate items.</p>
        </div>
      </div>

      <InventoryClient />
    </div>
  )
}
