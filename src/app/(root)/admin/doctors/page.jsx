
"use client"
import React, { useState } from "react";
import AdminDoctor from "@/components/AdminDoctor";

const DoctorPage = () => {
  return (
    <div className="bg-white  rounded-lg ">
      <div className="">
        {/* header  */}
        <div className="flex  justify-between px-10 h-17 border-b   items-center overflow-hidden ">
          <div className=" flex gap-5 font-medium  text-black/60 justify-end">
            <button
              className={`text-xs sm:text-sm lg:text-[16px] border-b-4 border-[#3497F9] text-black/80 tracking-wider py-2 pt-8`}
            >
              Doctors
            </button>
          </div>
         
        </div>
        {/* pages  */}
        <AdminDoctor/>
      </div>
    </div>
  );
};

export default DoctorPage;

