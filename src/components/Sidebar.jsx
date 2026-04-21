"use client";

import React from "react";
import { 
  Home, 
  Stethoscope, 
  MessageCircle, 
  UserCircle, 
  LogOut,
  ChevronRight,
  X
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/store";
import Image from "next/image";

const SidebarContent = ({ openSideBar, pathName, menuItems, handleLogout }) => (
  <div className="bg-slate-50 h-screen border-r border-slate-200/60  flex flex-col relative z-50">
    {/* Mobile Close Button */}
    <button 
      onClick={openSideBar}
      className="md:hidden absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 transition-colors"
    >
      <X size={20} />
    </button>

    {/* Logo Section */}
    <div className="mb-10 px-2 pt-2">
      <motion.a 
        href="/user/home"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
       <div className="h-20 flex items-center py-1 px-1">
                 <Image
                   src="/jhc.svg"
                   height={100}
                   width={250}
                   alt="logo"
                   className="object-cover"
                 />
               </div>
       
      </motion.a>
    </div>

    {/* Navigation Section */}
    <nav className="flex-1 space-y-8 px-2 ">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathName.startsWith(item.path);
        
        return (
          <motion.a
            key={item.path}
            href={item.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group
              ${isActive 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25" 
                : "text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-md"}
            `}
          >
            <Icon size={22} className={`${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`} />
            <span className="font-bold tracking-wide">{item.title}</span>
            
            {isActive && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute right-2"
              >
                <ChevronRight size={16} className="text-white/70" />
              </motion.div>
            )}
          </motion.a>
        );
      })}
    </nav>

    {/* Footer Section */}
    <div className="pt-6 border-t border-slate-200/60">
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
      >
        <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
        <span className="font-bold tracking-wide">Logout</span>
      </motion.button>
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

      {/* Mobile Sidebar with AnimatePresence */}
      <AnimatePresence>
        {sideBar && (
          <div className="fixed inset-0 z-100 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={openSideBar}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative"
            >
              <SidebarContent 
                openSideBar={openSideBar} 
                pathName={pathName} 
                menuItems={menuItems} 
                handleLogout={handleLogout} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;

