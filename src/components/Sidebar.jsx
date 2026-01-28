"use client";
import React from "react";
import { TbHomeFilled } from "react-icons/tb";
import { LuStethoscope } from "react-icons/lu";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathName = usePathname(); 
   const router = useRouter();


const handleLogout = async () => {
await signOut({ redirect: false });
router.replace("/auth/login"); // ✅ correct
};

return (
    <div className="bg-blue-100 w-15 md:w-45 lg:w-50 xl:w-60 shrink-0 min-h-screen ">
      <div className="flex flex-col sticky top-6">
        {/* logo */}
        <a href="/user/home" className=" hidden md:block pl-1">
          <img src="/logo.png" alt="logo" className="h-10 md:h-12" />
        </a>
        <div className="block md:hidden pl-1">
          <img src="/loho1.avif" alt="logo" className="h-10 md:h-12" />
        </div>
        <div className=" space-y-6 pt-9 ">
          <div className="">
            <a
              href="/user/home"
              className={`flex items-center gap-3 text-2xl  px-4 py-3 rounded-l-4xl  ${
                pathName.startsWith("/user/home")
                  ? "bg-white text-blue-400"
                  : "text-black/50 hover:bg-gray-200"
              } `}
            >
              <TbHomeFilled />
              <p className="hidden md:block">Home</p>
            </a>
          </div>
          <a
            href="/user/doctor"
            className={`flex items-center gap-3 text-2xl  px-4 py-3 rounded-l-4xl ${
              pathName.startsWith("/user/doctor")
                ? "bg-white text-blue-400"
                : "text-black/50 hover:bg-gray-200"
            }`}
          >
            <LuStethoscope />
            <p className="hidden md:flex">Doctors</p>
          </a>
          <a
            href="/user/chat"
            className={`flex items-center gap-3 text-2xl px-4 py-3 rounded-l-4xl ${
              pathName.startsWith("/user/chat")
                ? "bg-white text-blue-400"
                : "text-black/50 hover:bg-gray-200"
            }`}
          >
            <IoChatbubbleOutline />
            <p className="hidden md:flex">Chat</p>
          </a>
          <a
            href="/user/profile"
            className={`flex items-center gap-3 text-2xl px-4 py-3 rounded-l-4xl  ${
              pathName.startsWith("/user/profile")
                ? "bg-white text-blue-400"
                : "text-black/50 hover:bg-gray-200"
            }`}
          >
            <LuGraduationCap />
            <p className="hidden md:flex">Profile</p>
          </a>
        <div className="flex justify-center text-xl font-medium ">
          <button onClick={handleLogout}>Logout</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
