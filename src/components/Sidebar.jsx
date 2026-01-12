"use client";
import React from "react";
import { TbHomeFilled } from "react-icons/tb";
import { LuStethoscope } from "react-icons/lu";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  const isActive = "";
  return (
    <div className="bg-gray-50 w-15 md:w-45 lg:w-50 xl:w-60 min-h-screen mt-20 fixed">
      <div className="place-self-center space-y-8 pt-9 ">
        <a
          href="/user/home"
          className={`flex items-center gap-1 text-2xl focus:text-[#187add] ${
            pathName === "/user/home" ? "text-[#187add]" : "text-black/50"
          } `}
        >
          <TbHomeFilled />
          <p className="hidden md:block">Home</p>
        </a>
        <a
          href="/user/doctor"
          className={`flex items-center gap-1 text-2xl  focus:text-[#187add] ${
            pathName === "/user/doctor" ? "text-[#187add]" : "text-black/50"
          }`}
        >
          <LuStethoscope />
          <p className="hidden md:flex">Doctors</p>
        </a>
        <a
          href="/user/chat"
          className={`flex items-center gap-1 text-2xl focus:text-[#187add] ${
            pathName === "/user/chat" ? "text-[#187add]" : "text-black/50"
          }`}
        >
          <IoChatbubbleOutline />
          <p className="hidden md:flex">Chat</p>
        </a>
        <a
          href="/user/profile"
          className={`flex items-center gap-1 text-2xl focus:text-[#187add]  ${
            pathName === "/user/profile" ? "text-[#187add]" : "text-black/50"
          }`}
        >
          <LuGraduationCap />
          <p className="hidden md:flex">Profile</p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
