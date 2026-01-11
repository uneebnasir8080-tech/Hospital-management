import HomeAppointment from '@/components/HomeAppointment'
import HomeMedicine from '@/components/HomeMedicine'
import HomeTips from '@/components/HomeTips'
import React from 'react'

const HomePage = () => {
  return (
    <div className=' '>
        <h1 className='text-center my-5 text-2xl text-black/70 font-semibold'>My Appointments</h1>
        <HomeAppointment/>
        {/* medicine  */}
        <HomeMedicine/>
        <h1 className='text-center text-black/70 my-10 text-2xl font-semibold'>Healthy Tips</h1>
        <HomeTips/>
    </div>
  )
}

export default HomePage