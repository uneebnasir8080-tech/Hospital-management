import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <Sidebar/>
      <div className='flex-1 ml-15 md:ml-45 lg:ml-50 xl:ml-60 p-6 overflow-auto mt-20'>
        {children}
        </div>
        </div>
    </div>
  )
}

export default layout