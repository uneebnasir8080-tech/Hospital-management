"use client";

import React from "react";
import {
  Home,
  Stethoscope,
  MessageCircle,
  UserCircle,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useStore } from "@/store/store";
import Image from "next/image";

const SidebarContent = ({ openSideBar, pathName, menuItems, handleLogout }) => (
  <div className="bg-slate-50 h-screen border-r border-slate-200/60 flex flex-col relative z-50">
    {/* Mobile Close Button */}
    <button
      onClick={openSideBar}
      className="md:hidden absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 transition-colors"
    >
      <X size={20} />
    </button>

    {/* Logo Section */}
    <div className="mb-10 px-2 pt-2">
      <a href="/user/home" className="flex items-center gap-3">
        <div className="h-20 flex items-center py-1 px-1">
          <Image
            src="/jhc.svg"
            height={100}
            width={250}
            alt="logo"
            className="object-cover"
          />
        </div>
      </a>
    </div>

    {/* Navigation Section */}
    <nav className="flex-1 space-y-8 px-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathName.startsWith(item.path);

        return (
          <a
            key={item.path}
            href={item.path}
            className={`
              relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25"
                  : "text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-md"
              }
            `}
          >
            <Icon
              size={22}
              className={`${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`}
            />
            <span className="font-bold tracking-wide">{item.title}</span>

            {isActive && (
              <div className="absolute right-2">
                <ChevronRight size={16} className="text-white/70" />
              </div>
            )}
          </a>
        );
      })}
    </nav>

    {/* Footer Section */}
    <div className="pt-6 border-t border-slate-200/60">
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
      >
        <LogOut
          size={22}
          className="group-hover:translate-x-1 transition-transform"
        />
        <span className="font-bold tracking-wide">Logout</span>
      </button>
    </div>
  </div>
);

// desktop

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const sideBar = useStore((state) => state.sideBar);
  const openSideBar = useStore((state) => state.openSideBar);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace("/auth/login");
  };

  const menuItems = [
    { title: "Home", icon: Home, path: "/user/home" },
    { title: "Doctors", icon: Stethoscope, path: "/user/doctor" },
    { title: "Chat", icon: MessageCircle, path: "/user/chat" },
    { title: "Profile", icon: UserCircle, path: "/user/profile" },
  ];

  return (
    <div className="">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <SidebarContent
          openSideBar={openSideBar}
          pathName={pathName}
          menuItems={menuItems}
          handleLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar */}
      {sideBar && (
        <div className="fixed inset-0 z-100 md:hidden">
          <SidebarContent
            openSideBar={openSideBar}
            pathName={pathName}
            menuItems={menuItems}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
