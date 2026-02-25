"use client"
import { MdOutlineArrowDropDown, MdPeopleAlt } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiMedicineBottleFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";


const DashAppointment = () => {
const {data:session, status}=useSession(null)
const [appoint, setAppoint]= useState()
const [patient, setPatient]= useState()

const getData= async()=>{
  const appointment= await api.get("/doctor/count-appoint", {
    headers:{
      Authorization:`Bearer ${session?.token}`
    }
  })
  const patient= await api.get("/doctor/count-patient", {
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
      <div className="grid grid-cols-2 gap-3 px-2 xl:px-4 py-2 mt-3 xl:mt-5">
        <div
          className={`text-sm text-gray-700 flex flex-col py-1 xl:py-2 items-center rounded-lg bg-blue-200`}
        >
          <p className="text-xl xl:text-2xl py-1">
            <IoDocumentTextOutline />
          </p>
          <p className="text-[11px] xl:text-xs">{appoint || 0}</p>
          <p className="text-[11px] xl:text-xs">Appointments</p>
        </div>
        <div
          className={`text-sm text-gray-700 flex flex-col py-1 xl:py-2 items-center rounded-lg bg-blue-200`}
        >
          <p className="text-xl xl:text-2xl py-1">
            <MdPeopleAlt />
          </p>
          <p className="text-[11px] xl:text-xs">{patient || 0}</p>
          <p className="text-[11px] xl:text-xs">New Patients</p>
        </div>
        <div
          className={`text-sm text-gray-700 flex flex-col py-1 xl:py-2 items-center rounded-lg bg-red-200`}
        >
          <p className="text-xl xl:text-2xl py-1">
            <RiMedicineBottleFill />
          </p>
          <p className="text-[11px] xl:text-xs">150</p>
          <p className="text-[11px] xl:text-xs">Medeicine Sold</p>
        </div>
        <div
          className={`text-sm text-gray-700 flex flex-col py-1 xl:py-2 items-center rounded-lg bg-gray-200`}
        >
          <p className="text-xl xl:text-2xl py-1">
            <BiSolidReport />
          </p>
          <p className="text-[11px] xl:text-xs">49</p>
          <p className="text-[11px] xl:text-xs">Labs Test</p>
        </div>
      </div>
    </div>
  );
};

export default DashAppointment;
