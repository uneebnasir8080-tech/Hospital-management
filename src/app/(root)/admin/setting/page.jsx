"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";

const SettingPage = () => {
  const [resData, setResData] = useState(null);

  const { data: session, status } = useSession();

  // ---------------- FETCH USER ----------------
  const getData = useCallback(async () => {
    if (!session?.token || !session?.id) return;

    try {
      const res = await api.get("/user", {
        params: {
          userId: session?.id,
        },
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setResData(res?.data?.data || null);
    } catch (error) {
      console.error("Profile Fetch Error:", error);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status, getData]);

  // ---------------- AGE FUNCTION ----------------
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
    <div className="px-6 py-2" >
      

      {/* ---------------- PROFILE BOX ---------------- */}
      <div className="relative bg-blue-300 rounded-2xl w-[90%] md:w-[55%] mx-auto my-20 pt-16 pb-6 px-4 shadow-md">

        {/* Profile Image */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28">
          <Image
            src={profileImage  || "doc1.png"}
            alt="Profile"
            fill
            sizes="112px"
            className="rounded-md object-cover  shadow-lg"
          />
        </div>

        {/* Edit Icon */}
        <MdEdit className="absolute top-4 right-4 cursor-pointer text-xl md:text-2xl text-gray-700 hover:text-black transition" />

        {/* Name & Phone */}
        <div className="text-center mt-6 space-y-1">
          <p className="text-lg md:text-2xl font-semibold capitalize">
            {resData?.name || "John Paulliston"}
          </p>

          <p className="flex justify-center items-center gap-2 text-xs md:text-lg text-gray-700">
            <FaPhoneVolume />
            {resData?.phone || "+92 333 7192432"}
          </p>
        </div>
      </div>

      {/* ---------------- PERSONAL INFO ---------------- */}
      <div className="text-md md:text-xl text-gray-600 space-y-5">
        <h1 className="font-semibold">Personal Info</h1>
        <hr className="my-2" />

        <p className="flex gap-3 text-sm md:text-xl">
          Email ID:
          <span className="text-black ">
            {resData?.email || "example@gmail.com"}
          </span>
        </p>

        <p className="flex gap-3 text-sm md:text-xl">
          Age:
          <span className="text-black">
            {calculateAge(resData?.doctor?.age) ?? "N/A"} years
          </span>
        </p>

        <p className="flex gap-3 text-sm md:text-xl">
          Gender:
          <span className="text-black capitalize">
            {resData?.patient?.gender || "Male"}
          </span>
        </p>

        <p className="flex gap-3 text-sm md:text-xl">
          Blood Group:
          <span className="text-black">
            {resData?.patient?.blood || "A+"}
          </span>
        </p>
      </div>

      <hr className="my-2" />

 
      
    </div>
  );
};

export default SettingPage;
