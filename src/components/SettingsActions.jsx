"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import ProfileModal from "./ProfileModal";
import { AnimatePresence } from "framer-motion";

const SettingsActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-3 hover:bg-slate-50 rounded-2xl transition-all active:scale-95"
      >
        <Menu size={24} className="text-slate-600" />
      </button>

      <AnimatePresence>
        {isOpen && <ProfileModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default SettingsActions;
