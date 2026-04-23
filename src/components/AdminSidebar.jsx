"use client";
import React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  UserRound,
  MessageSquare,
  Package,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/store";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const logo = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    link: "/admin/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: <Users size={20} />,
    link: "/admin/patient",
    title: "Patients",
  },
  {
    id: 3,
    icon: <CalendarCheck size={20} />,
    link: "/admin/appointment",
    title: "Appointments",
  },
  {
    id: 4,
    icon: <UserRound size={20} />,
    link: "/admin/doctors",
    title: "Doctors ",
  },
  {
    id: 5,
    icon: <MessageSquare size={20} />,
    link: "/admin/message",
    title: "Communication",
  },
  {
    id: 6,
    icon: <Package size={20} />,
    link: "/admin/inventory",
    title: "Pharmacy",
  },
  {
    id: 7,
    icon: <Settings size={20} />,
    link: "/admin/setting",
    title: "Settings",
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const sideBar = useStore((state) => state.sideBar);
  const open = useStore((state) => state.openSideBar);

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/auth/login",
    });
  };

  return (
    <>
      <AnimatePresence>
        {sideBar && (
          <div className="fixed inset-0 z-60 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={open}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-70 bg-white shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <Image
                  src="/jhc.svg"
                  height={32}
                  width={120}
                  alt="logo"
                  className="object-contain"
                />
                <button
                  onClick={open}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2 py-6">
                {logo.map((data) => {
                  const isActive = pathname.startsWith(data.link);
                  return (
<<<<<<< HEAD
                    <Link
                      key={data.id}
                      href={data.link}
                      onClick={open}
=======
                    <a
                      key={data.id}
                      href={data.link}
>>>>>>> ce95edb81eabee8d726dafaf06f7fc22d11154f6
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {data.icon}
                      <span className="text-sm tracking-tight">
                        {data.title}
                      </span>
<<<<<<< HEAD
                    </Link>
=======
                    </a>
>>>>>>> ce95edb81eabee8d726dafaf06f7fc22d11154f6
                  );
                })}
              </div>

              <div className="p-6 border-t border-gray-50">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} />
                  <span className="text-sm tracking-tight">
                    System Sign Out
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex flex-col w-65 lg:w-75 h-screen bg-white border-r border-gray-100/80 sticky top-0 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.02)]">
        {/* Header */}
        <Link href='/admin/dashboard'>
        <div className="h-27 flex items-center py-3 px-1">
          <Image
            src="/jhc.svg"
            height={100}
            width={250}
            alt="logo"
            className="object-cover"
          />
        </div>
        </Link>
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-6 space-y-2 py-4 modern-scroll">
          <p className="px-4 text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Main Management
          </p>
          {logo.map((data) => {
            const isActive = pathname.startsWith(data.link);
            return (
<<<<<<< HEAD
              <Link
=======
              <a
>>>>>>> ce95edb81eabee8d726dafaf06f7fc22d11154f6
                key={data.id}
                href={data.link}
                className={`relative flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25"
                    : "text-gray-500 hover:bg-blue-50/50 hover:text-blue-600"
                }`}
              >
                {/* Active Glow */}
                {isActive && (
                  <div className="absolute -left-6 w-1 rounded-r-full h-8 bg-blue-600" />
                )}
                <div
                  className={`transition-transform group-hover:scale-110 duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`}
                >
                  {data.icon}
                </div>
                <span className="text-[15px] tracking-tight">{data.title}</span>
<<<<<<< HEAD
              </Link>
=======
              </a>
>>>>>>> ce95edb81eabee8d726dafaf06f7fc22d11154f6
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50/80">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 font-bold hover:text-red-500 hover:bg-red-50/50 transition-all group"
          >
            <div className="transition-transform group-hover:-translate-x-1 duration-300">
              <LogOut size={22} />
            </div>
            <span className="text-[15px] tracking-tight">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
