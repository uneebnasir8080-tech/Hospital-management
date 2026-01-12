"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import ProfileModal from '@/components/ProfileModal';

const ProfilePage = () => {
  const [isOpen, setIsOpen]= useState(false)
  return (
    <div>
      <div>
        {/* header  */}
        <div className='text-2xl font-semibold flex items-center justify-between p-3'>
          <h1>My Profile</h1>
          <FaBars className='cursor-pointer' onClick={()=>setIsOpen(true)}/>
        </div>
        {/* profile box */}
        <div className='bg-blue-300 rounded-2xl w-[60%] mx-auto my-15 relative'>
          <div>
          <Image src="/doc1.png" width={110} height={50} alt='pic'  className="absolute left-1/2 -top-12 -translate-x-1/2 rounded-full" />
          </div>
          <div className='w-full p-2'>
          <MdEdit className='cursor-pointer text-3xl ml-auto'/>
          </div>
          <div className='text-center py-4 space-y-1'>
            <p className='text-2xl'>A.Keshav Kirupa</p>
            <p className='flex justify-center items-center text-gray-700'><FaPhoneVolume />+92333 7192432</p>

          </div>
        </div>
        {/* personal data  */}
        <div className='text-xl text-gray-600 space-y-5'>
          <h1 className='font-semibold'>Personal Info</h1>
          <hr  className='my-2'/> 
          <p className='flex gap-3'>Email ID: <span className='text-black '>Keshavkirupa@gmail.com</span></p>
          <p className='flex gap-3'>Age: <span className='text-black '>26 years</span></p>
          <p className='flex gap-3'>Gender: <span className='text-black '> Male</span></p>
          <p className='flex gap-3'>Blood Group: <span className='text-black '>A+</span></p>
        </div>
        <hr className='my-2'/>
        {/* wallet  */}
        <div className='text-xl'>
          <h1 className='font-semibold my-6'>Wallet</h1>
          <div className='flex justify-between '>
            <p className='flex items-center gap-2'><GiWallet /> <span>$500</span></p>
            <p className='text-blue-500 cursor-pointer'>Recharge</p>
          </div>
        </div>
      </div>
      {isOpen && <ProfileModal onClose={()=>setIsOpen(false)}/>}
    </div>
  )
}

export default ProfilePage