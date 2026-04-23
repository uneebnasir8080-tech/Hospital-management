import ChatBar from '@/components/ChatBar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex flex-4 w-full'>

        <div className='flex-1 w-full'>
          <ChatBar/>
        </div>
        <div className='flex-3 content- '>
        {children}
        </div>
    </div>
  )
}

export default layout