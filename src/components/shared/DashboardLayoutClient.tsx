"use client"
import { useState } from 'react'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'

export default function DashboardLayoutClient({ 
  userRole, 
  schoolName, 
  children 
}: { 
  userRole: string
  schoolName?: string
  children: React.ReactNode 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      {/* 
        We pass the state to Sidebar so it can render the mobile drawer, 
        and to TopHeader so it can render the Hamburger open button.
      */}
      <Sidebar 
        userRole={userRole} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <TopHeader 
          schoolName={schoolName} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <div className="w-full text-center py-6 mt-auto">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400/60">
              Engineered by Data Trans Limited
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
