import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden"> {/* lock full viewport */}
      
      <div className="flex h-full"> {/* full height flex row */}
        
        {/* Sidebar */}
        <div className="md:w-45 lg:w-60  shrink-0">
          <Sidebar />
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 h-full min-w-0">
          
          {/* Navbar (fixed height) */}
          <div className="shrink-0">
            <Navbar />
          </div>

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto bg-slate-50">
            {children}
          </main>

        </div>
      </div>

    </div>
  )
}

export default layout