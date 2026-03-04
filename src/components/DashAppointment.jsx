"use client"
import { MdOutlineArrowDropDown, MdPeopleAlt } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiMedicineBottleFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import  {api}  from "@/lib/apiCall";
import { useSession } from "next-auth/react";


const DashAppointment = () => {
const {data:session, status}=useSession(null)
const [appoint, setAppoint]= useState()
const [patient, setPatient]= useState()

const getData= async()=>{
  const appointment= await api.get("/doctor/count-appoint",{
    headers:{
      Authorization:`Bearer ${session?.token}`
    }
  })
  const patient= await api.get("/doctor/count-patient",{
    headers:{
      Authorization:`Bearer ${session?.token}`
    }
  })
  const appointmentCounting= appointment?.data.totalAppoint
  setAppoint(appointmentCounting)
   const patientCounting= patient?.data?.totalPatient
  setPatient(patientCounting)
}

useEffect(() => {
  if(status==="authenticated"){
    getData()
  }
}, [status])


  return (
    <div className="">
      {/* head */}
      <div className="flex justify-between px-4 text-sm h-10 items-center text-gray-700">
        <div>
          <p className="">Activity Overview</p>
        </div>
        <div className="flex gap-2 items-center">
          <p>Weekly</p>
          <MdOutlineArrowDropDown />
        </div>
      </div>
      {/* cards  */}
      <div className="grid grid-cols-2 gap-2 px-2 xl:px-3 py-1 mt-2">
        <div
          className="text-xs sm:text-sm text-gray-700 flex flex-col items-center justify-center rounded-lg bg-blue-200 h-20 md:h-24"
        >
          <p className="text-lg xl:text-2xl pb-1">
            <IoDocumentTextOutline />
          </p>
          <p className="text-[11px] xl:text-xs leading-tight">{appoint || 0}</p>
          <p className="text-[11px] xl:text-xs leading-tight">Appointments</p>
        </div>
        <div
          className="text-xs sm:text-sm text-gray-700 flex flex-col items-center justify-center rounded-lg bg-blue-200 h-20 md:h-24"
        >
          <p className="text-lg xl:text-2xl pb-1">
            <MdPeopleAlt />
          </p>
          <p className="text-[11px] xl:text-xs leading-tight">{patient || 0}</p>
          <p className="text-[11px] xl:text-xs leading-tight">New Patients</p>
        </div>
        <div
          className="text-xs sm:text-sm text-gray-700 flex flex-col items-center justify-center rounded-lg bg-red-200 h-20 md:h-24"
        >
          <p className="text-lg xl:text-2xl pb-1">
            <RiMedicineBottleFill />
          </p>
          <p className="text-[11px] xl:text-xs leading-tight">150</p>
          <p className="text-[11px] xl:text-xs leading-tight">Medeicine Sold</p>
        </div>
        <div
          className="text-xs sm:text-sm text-gray-700 flex flex-col items-center justify-center rounded-lg bg-gray-200 h-20 md:h-24"
        >
          <p className="text-lg xl:text-2xl pb-1">
            <BiSolidReport />
          </p>
          <p className="text-[11px] xl:text-xs leading-tight">49</p>
          <p className="text-[11px] xl:text-xs leading-tight">Labs Test</p>
        </div>
      </div>
    </div>
  );
};

export default DashAppointment;
