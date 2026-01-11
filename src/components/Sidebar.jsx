import React from "react";
import { TbHomeFilled } from "react-icons/tb";
import { LuStethoscope } from "react-icons/lu";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="bg-gray-50 w-15 md:w-45 lg:w-50 xl:w-60 min-h-screen mt-20 fixed">
      <div className="place-self-center space-y-8 pt-9">
        <a
          href="/user/home"
          className="flex items-center gap-1 text-2xl text-black/50 focus:text-[#3497F9]"
        >
          <TbHomeFilled />
          <p className="hidden md:flex">Home</p>
        </a>
        <a
          href="/user/doctor"
          className="flex items-center gap-1 text-2xl text-black/50 focus:text-[#3497F9]"
        >
          <LuStethoscope />
          <p className="hidden md:flex">Doctors</p>
        </a>
        <a
          href="#"
          className="flex items-center gap-1 text-2xl text-black/50 focus:text-[#3497F9]"
        >
          <IoChatbubbleOutline />
          <p className="hidden md:flex">Chat</p>
        </a>
        <a
          href="#"
          className="flex items-center gap-1 text-2xl text-black/50 focus:text-[#3497F9]"
        >
          <LuGraduationCap />
          <p className="hidden md:flex">Profile</p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
