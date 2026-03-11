"use client";

import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import ProfileUpdate from "@/components/ProfileUpdate";

const EditProfileButton = ({ resData }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsActive(true)}
        className="absolute top-6 right-6 p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white transition-all border border-white/20 shadow-lg group"
        title="Edit Profile"
      >
        <Edit3 size={20} className="group-hover:scale-110 transition-transform" />
      </button>

      {isActive && (
        <ProfileUpdate
          response={resData}
          onClose={() => setIsActive(false)}
        />
      )}
    </>
  );
};

export default EditProfileButton;
