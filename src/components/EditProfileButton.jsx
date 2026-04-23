"use client";

import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import PatientProfile from "./PatientProfile";
import { AnimatePresence } from "framer-motion";

const EditProfileButton = ({ resData }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsActive(true)}
        className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all active:scale-95 z-10"
      >
        <Edit3 size={24} />
      </button>

      <AnimatePresence>
        {isActive && (
          <PatientProfile
            onClose={() => setIsActive(false)}
            response={resData}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default EditProfileButton;
