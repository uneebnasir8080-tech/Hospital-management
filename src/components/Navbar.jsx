"use client";

import { useStore } from "@/store/store";
import React from "react";
import { Bell, User, Search, Menu, X } from "lucide-react";
import Notification from "./Notification";
import { motion } from "framer-motion";

const Navbar = () => {
  const isOpen = useStore((state) => state.isOpen);
  const open = useStore((state) => state.open);
  const close = useStore((state) => state.close);
  const sideBar = useStore((state) => state.sideBar);
  const openSideBar = useStore((state) => state.openSideBar);

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 w-full bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/60 h-20 px-6 md:px-10"
    >
      <div className="flex justify-between items-center h-full max-w-[1600px] mx-auto">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={openSideBar}
          className="md:hidden p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-500 hover:text-blue-600 transition-all active:scale-95"
        >
          {sideBar ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Welcome Text / Search Bar */}
        <div className="hidden md:flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search appointments, health tips..." 
              className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-600 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Notifications */}
          <button
            onClick={open}
            className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-500 hover:text-blue-600 hover:shadow-md transition-all active:scale-95 relative group"
          >
            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          {/* Profile Quick Link */}
          <a
            href="/user/profile"
            className="flex items-center gap-3 p-1.5 pr-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <User size={20} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Patient</p>
              <p className="text-sm font-bold text-slate-700 leading-none">View Profile</p>
            </div>
          </a>
        </div>
      </div>

      {isOpen && <Notification onClose={close} />}
    </motion.div>
  );
};

export default Navbar;

