"use client";
import React from "react";
import { TbHomeFilled } from "react-icons/tb";
import { LuStethoscope } from "react-icons/lu";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  // const isActive = (path) => pathName.startsWith(path);
  return (
    <div className="bg-gray-50 w-15 md:w-45 lg:w-50 xl:w-60 shrink-0 min-h-screen ">
      <div className="flex flex-col sticky top-6">
        {/* logo */}
        <div className=" hidden md:block pl-1">
          <img src="/logo.png" alt="logo" className="h-10 md:h-12" />
        </div>
        <div className="block md:hidden pl-1">
          <img src="/loho1.avif" alt="logo" className="h-10 md:h-12" />
        </div>
        <div className=" space-y-8 pt-9 ">
          <div className="">
          <a
            href="/user/home"
            className={`flex items-center gap-3 text-2xl hover:bg-gray-300 px-4 py-1 rounded-xl  ${
              pathName.startsWith("/user/home")  ? "text-[#187add]" : "text-black/50"
            } `}
          >
            
            <TbHomeFilled />
            <p className="hidden md:block">Home</p>
           
          </a>
          </div> 
          <a
            href="/user/doctor"
            className={`flex items-center gap-3 text-2xl hover:bg-gray-300 px-4 py-1 rounded-xl ${
              pathName.startsWith("/user/doctor")  ? "text-[#187add]" : "text-black/50"
            }`}
          >
            <LuStethoscope />
            <p className="hidden md:flex">Doctors</p>
          </a>
          <a
            href="/user/chat"
            className={`flex items-center gap-3 text-2xl hover:bg-gray-300 px-4 py-1 rounded-xl ${
              pathName.startsWith("/user/chat" ) ? "text-[#187add]" : "text-black/50"
            }`}
          >
            <IoChatbubbleOutline />
            <p className="hidden md:flex">Chat</p>
          </a>
          <a
            href="/user/profile"
            className={`flex items-center gap-3 text-2xl hover:bg-gray-300 px-4 py-1 rounded-xl  ${
              pathName.startsWith("/user/profile") ? "text-[#187add]" : "text-black/50"
            }`}
          >
            <LuGraduationCap />
            <p className="hidden md:flex">Profile</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
