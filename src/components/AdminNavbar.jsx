"use client";
import { FaBell } from "react-icons/fa";
import React from "react";
import { FaBars } from "react-icons/fa";
import { useStore } from "@/store/store";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const open = useStore((state) => state.openSideBar);
  const pathname= usePathname()
  
  const pageName = pathname.split("/").filter(Boolean).pop();
  console.log("navbar",pageName)
  return (
    <div className="flex justify-between px-4 items-center  h-20">
      <div className="flex gap-4">
        <button className="md:hidden cursor-pointer" onClick={open}>
          <FaBars />
        </button>
        <p className=" font-semibold text-[#374858] text-md sm:text-lg lg:text-2xl capitalize">
          {pageName}
        </p>
      </div>
      <div className="flex gap-3 items-center">
        <div className=" rounded-full p-1 relative cursor-pointer hidden sm:block">
          <FaBell className="text-lg md:text-xl lg:text-2xl text-[#9094AF]" />
          <div className="bg-red-500 absolute p-0.5 rounded-full top-1/6 right-1/4 "></div>
        </div>
        <div className="flex items-center gap-2">
          {/* img  */}
          <div className="h-5 w-10 sm:w-12 flex items-center">
            <img src="/Group.png" alt="pic" />
          </div>
          <div className="hidden md:block">
            <p className="font-medium text-md lg:text-lg">Jonitha Cathrine</p>
            <p className="text-xs lg:text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
