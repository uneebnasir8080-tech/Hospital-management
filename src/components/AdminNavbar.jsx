import { FaBell } from "react-icons/fa";
import React from "react";
import Image from "next/image";

const AdminNavbar = () => {
  return (
    <div className="flex justify-between px-4 items-center  h-20">
      <div>
        <p className="font-semibold text-[#374858] text-2xl">Dashboard</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className=" rounded-full p-1 relative cursor-pointer">
          <FaBell className="text-2xl text-[#9094AF]" />
          <div className="bg-red-500 absolute p-1 rounded-full top-1/6 right-1/4 "></div>
        </div>
        <div className="flex items-center gap-2">
          {/* img  */}
          <div className="h-5 flex items-center">
            <Image src="/Group.png" height={20} width={50} alt="pic" />
          </div>
          <div className="">
            <p className="font-medium text-lg">Jonitha Cathrine</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
