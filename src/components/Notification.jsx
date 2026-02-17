"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";



const Notification = ({onClose}) => {
const {data:session, status}= useSession(null)
const [resData, setResData]=useState([])
const getData = async()=>{
  const res= await api.get("/patient/appointment",{
    headers:{
      Authorization:`Bearer ${session?.token}`
    }
  })
  const response= res?.data?.getData?.appointment
  const filtered= response.filter((appoint)=>appoint.status==="pending")
  setResData(filtered)
}
useEffect(() => {
 if(status !== "authenticated") return
 getData()
}, [status, getData])

function timeAgo(dateString) {
  const past = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}


  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/90  z-150 flex items-center"
    >
      <Card
        className="flex sm:mx-auto w-130 mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* heading  */}
          <div className="flex gap-2 pb-2">
            <button className="cursor-pointer" onClick={onClose}>
              <X size={25} />
            </button>
            <p className="font-medium text-lg">Notification</p>
          </div>
          <hr />
          {/* input  */}{" "}
          <div className={`max-h-50 sm:max-h-80 overflow-auto modern-scroll `}>
            {resData?.map((data, index) => (
                <div key={index } className={`flex flex-3 border-b border-dashed border-gray-500 py-2 `}>
                  {/* img  */}
                  <div className=" flex-1 flex justify-center ">
                    <Image src={data?.doctorId?.profile || "doc1.png"} width={70} height={20} alt="Doc" className=" rounded-full"/>
                  </div>
                  {/* data  */}
                  <div className="flex-1 space-y-1 my-auto">
                    <p className="font-semibold text-lg capitalize">Dr {data?.doctorId?.userId?.name}</p>
                    <p className="capitalize">Fee: <span className="text-red-400"> {data?.status}</span></p>
                  </div>
                  {/* time  */}
                  <div className="flex-1 text-gray-600 mt-5">
                    {timeAgo(data?.createdAt)}
                  </div>
                </div>
                ))}
              </div>
          
          {/* btns */}
          <hr />
        </CardContent>
      </Card>
    </div>
  );
};

export default Notification;
