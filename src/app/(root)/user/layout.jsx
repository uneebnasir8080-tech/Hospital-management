import Navbar from '@/components/Navbar'  
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      <div className='flex'>
      <Sidebar/>
      <div className='flex flex-col w-full'>
      <Navbar/>
       <div className='flex-1  overflow-auto'>
        {children}
        </div>
        </div>
      </div>
      <div className='flex'>
     
        </div>
    </div>
  )
}

export default layout