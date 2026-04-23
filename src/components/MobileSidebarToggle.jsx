"use client";
import React from "react";
import { Menu } from "lucide-react";
import { useStore } from "@/store/store";

const MobileSidebarToggle = () => {
  const open = useStore((state) => state.openSideBar);

  return (
    <button 
      onClick={open}
      className="md:hidden p-2.5 hover:bg-gray-100 text-gray-500 rounded-2xl transition-all active:scale-95 cursor-pointer"
      aria-label="Toggle Sidebar"
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileSidebarToggle;
