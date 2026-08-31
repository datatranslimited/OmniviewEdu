"use client"
import { useState } from "react"
import { Package, PlusCircle, AlertTriangle, Monitor, PenTool, Armchair, Send } from "lucide-react"

export default function InventoryClient() {
  const [activeTab, setActiveTab] = useState<'directory' | 'allocations'>('directory')

  const [items, setItems] = useState([
    { id: "INV-001", name: "Dell Latitude Laptops", category: "Electronics", quantity: 45, status: "Good", icon: Monitor },
    { id: "INV-002", name: "Student Desks", category: "Furniture", quantity: 300, status: "Good", icon: Armchair },
    { id: "INV-003", name: "Whiteboard Markers (Pack)", category: "Stationary", quantity: 5, status: "Low Stock", icon: PenTool },
  ])

  const [allocations] = useState([
    { id: "ALC-101", item: "Dell Latitude Laptops", assignee: "Mr. Ebenezer (Teacher)", date: "Aug 15, 2026", quantity: 1 },
    { id: "ALC-102", item: "Student Desks", assignee: "JSS 1 A (Classroom)", date: "Aug 20, 2026", quantity: 30 },
  ])

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false)
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      
      {/* Tabs */}
      <div className="flex space-x-2 bg-[#F4F1EC] p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('directory')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'directory' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Asset Directory
        </button>
        <button 
          onClick={() => setActiveTab('allocations')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'allocations' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Allocations
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden h-full flex flex-col">
          
          {/* ASSET DIRECTORY TAB */}
          {activeTab === 'directory' && (
            <>
              <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#2C3531]">Current Inventory</h3>
                <button 
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center"
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Item
                </button>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {items.map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.id} className={`p-6 rounded-3xl border transition-colors flex flex-col ${item.status === 'Low Stock' ? 'border-amber-200 bg-amber-50/50' : 'border-[#788B81]/20 bg-[#F4F1EC]/20'}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-full bg-white border border-[#788B81]/10 flex items-center justify-center shadow-sm">
                            <Icon className="w-5 h-5 text-[#2C3531]" />
                          </div>
                          {item.status === 'Low Stock' ? (
                            <span className="flex items-center text-[10px] font-bold text-amber-600 bg-white px-2.5 py-1 rounded-full border border-amber-200 shadow-sm uppercase tracking-widest">
                              <AlertTriangle className="w-3 h-3 mr-1" /> Low Stock
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-[#788B81] bg-white px-2.5 py-1 rounded-full border border-[#788B81]/20 shadow-sm uppercase tracking-widest">
                              {item.category}
                            </span>
                          )}
                        </div>
                        
                        <h4 className="font-bold text-[#2C3531] text-lg mb-1">{item.name}</h4>
                        <p className="text-sm font-medium text-[#788B81] mb-6">ID: {item.id}</p>

                        <div className="mt-auto flex justify-between items-end">
                          <div>
                            <p className="text-[10px] font-bold text-[#788B81] uppercase tracking-widest">Quantity</p>
                            <p className="text-3xl font-black text-[#2C3531]">{item.quantity}</p>
                          </div>
                          <button className="text-sm font-bold text-[#788B81] hover:text-[#2C3531] transition-colors underline decoration-[#788B81]/30 underline-offset-4">
                            Update
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {/* ALLOCATIONS TAB */}
          {activeTab === 'allocations' && (
            <>
              <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#2C3531]">Assigned Assets</h3>
                <button 
                  onClick={() => setIsAllocateModalOpen(true)}
                  className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Allocate Item
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#788B81]/10">
                  <thead className="bg-[#F4F1EC]/10">
                    <tr>
                      <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Item / Asset</th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Assigned To</th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Date Allocated</th>
                      <th className="px-8 py-5 text-center text-xs font-bold text-[#788B81] uppercase tracking-widest">Qty</th>
                      <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#788B81]/10">
                    {allocations.map((alc) => (
                      <tr key={alc.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#2C3531]">{alc.item}</div>
                          <div className="text-xs text-[#788B81]">{alc.id}</div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#2C3531]">{alc.assignee}</div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-[#788B81]">
                          {alc.date}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-center text-sm font-black text-[#2C3531]">
                          {alc.quantity}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-right">
                          <button className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 transition-colors">
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-md shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-[#F4F1EC]/50">
                <h3 className="text-xl font-bold text-[#2C3531]">Add New Item</h3>
                <button onClick={() => setIsAddItemModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Item Name</label>
                  <input type="text" placeholder="e.g. Printer Paper" className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Category</label>
                    <select className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                      <option>Electronics</option>
                      <option>Furniture</option>
                      <option>Stationary</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Initial Qty</label>
                    <input type="number" defaultValue={1} className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="mt-4 w-full py-3.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allocate Item Modal */}
      {isAllocateModalOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-md shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-[#F4F1EC]/50">
                <h3 className="text-xl font-bold text-[#2C3531]">Allocate Item</h3>
                <button onClick={() => setIsAllocateModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Select Item</label>
                  <select className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                    <option>Dell Latitude Laptops (45 available)</option>
                    <option>Student Desks (300 available)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Assign To (Staff or Class)</label>
                  <input type="text" placeholder="e.g. Mr. Ebenezer or JSS 1 A" className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Quantity to Allocate</label>
                  <input type="number" defaultValue={1} className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                </div>
                
                <button 
                  onClick={() => setIsAllocateModalOpen(false)}
                  className="mt-4 w-full py-3.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Allocate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
