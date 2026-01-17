"use client";
import Image from "next/image";
import React from "react";
import { IoSpeedometer } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";
import { BiSolidSchool } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/store";

const logo = [
  {
    id: 1,
    icon: <IoSpeedometer />,
    link: "/admin/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: <BsFillPeopleFill />,
    link: "/admin/patient",
    title: "Patients",
  },
  {
    id: 3,
    icon: <IoDocumentTextOutline />,
    link: "/admin/appointment",
    title: "Appointments",
  },
  {
    id: 4,
    icon: <IoPersonSharp />,
    link: "/admin/doctors",
    title: "Doctors",
  },
  {
    id: 5,
    icon: <LuMessageSquareMore />,
    link: "/admin/message",
    title: "Messages",
  },
  {
    id: 6,
    icon: <BiSolidSchool />,
    link: "/admin/education",
    title: "Education Content",
  },
  {
    id: 7,
    icon: <MdOutlineInventory2 />,
    link: "/admin/inventory",
    title: "Medicine Inventory",
  },
  {
    id: 8,
    icon: <IoMdSettings />,
    link: "/admin/setting",
    title: "Settings",
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const sideBar = useStore((state) => state.sideBar);
  const open = useStore((state) => state.openSideBar);
  return (
    <>
      {sideBar && (
        <div
          className={`min-h-screen  min-w-45 fixed bg-white  transform transition-transform duration-300 ease-in-out
          ${sideBar ? "translate-x-0" : "-translate-x-full"}`}
        >
          <p
            className="text-end px-4 py-1 font-bold cursor-pointer"
            onClick={open}
          >
            X
          </p>
          {/* img  */}
          <div className="h-10 flex items-center pl-1">
            <div className="h-10">
              <Image src="/logo.png" height={20} width={150} alt="logo" />
            </div>
          </div>
          {/* icons  */}
          <div className="space-y-4 lg:space-y-3 mt-5">
            {logo.map((data, index) => {
              const isActive = pathname.startsWith(data.link);
              return (
                <div key={index}>
                  <a
                    href={data.link}
                    className={`text-sm lg:text-[16px] py-2 px-3 ${
                      isActive
                        ? "text-[#3497F9] bg-blue-100 border-l-4 border-blue-500"
                        : "text-gray-500 hover:bg-gray-300"
                    }  flex items-center gap-3 font-medium cursor-pointer`}
                  >
                    <p className="text-lg">{data.icon}</p>
                    <p>{data.title}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* screen  */}

      <div className="min-h-screen hidden md:min-w-45 lg:min-w-50 xl:min-w-66 md:flex justify-between flex-col">
        {/* img  */}
        <div className="h-20 flex items-center pl-2">
          <div className="h-10">
            <Image src="/logo.png" height={20} width={150} alt="logo" />
          </div>
        </div>
        {/* icons  */}
        <div className="space-y-4 lg:space-y-3 mt-5 flex-1">
          {logo.map((data, index) => {
            const isActive = pathname.startsWith(data.link);
            return (
              <div key={index}>
                <a
                  href={data.link}
                  className={`text-sm lg:text-[16px] py-2 px-3 ${
                    isActive
                      ? "text-[#3497F9] bg-blue-100 border-l-6 rounded-l-xl border-blue-600"
                      : "text-gray-500 hover:bg-gray-300"
                  }  flex items-center gap-3 font-medium cursor-pointer`}
                >
                  <p className="text-lg">{data.icon}</p>
                  <p>{data.title}</p>
                </a>
              </div>
            );
          })}
        </div>
        <div className="h-20 pl-3">
          <button className="flex gap-2 items-center text-xl text-gray-600 cursor-pointer"><IoIosLogOut /> Logout</button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
