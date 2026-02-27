"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import ProfileUpdate from "@/components/ProfileUpdate";

const SettingsClient = ({ resData }) => {
  const [isActive, setIsActive] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const profileImage =
    resData?.doctor?.profile?.trim() || "/doc1.png";

  return (
    <div className="px-6 py-2">

      <div className="relative bg-blue-300 rounded-2xl w-[90%] md:w-[55%] mx-auto my-20 pt-16 pb-6 px-4 shadow-md">

        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28">
          <Image
            src={profileImage}
            alt="Profile"
            fill
            sizes="112px"
            className="rounded-md object-cover shadow-lg"
          />
        </div>

        <MdEdit
          onClick={() => setIsActive(true)}
          className="absolute top-4 right-4 cursor-pointer text-xl md:text-2xl"
        />

        <div className="text-center mt-6 space-y-1">
          <p className="text-lg md:text-2xl font-semibold capitalize">
            {resData?.name}
          </p>

          <p className="flex justify-center items-center gap-2 text-xs md:text-lg text-gray-700">
            <FaPhoneVolume />
            {resData?.phone || "0333-98201222"}
          </p>
        </div>
      </div>

      <div className="text-md md:text-xl text-gray-600 space-y-4">
        <h1 className="font-semibold">Personal Info</h1>
        <hr className="my-2" />

        <p>Email ID: {resData?.email}</p>
        <p>Age: {calculateAge(resData?.doctor?.age)} years</p>
        <p>Gender: {resData?.doctor?.gender}</p>
        <p>Specialization: {resData?.doctor?.specialization}</p>
        <p>Experience: {resData?.doctor?.experience}</p>
      </div>

      {isActive && (
        <ProfileUpdate
          response={resData}
          onClose={() => setIsActive(false)}
        />
      )}
    </div>
  );
};

export default SettingsClient;