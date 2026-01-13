"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import ProfileModal from "@/components/ProfileModal";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-6">
      <div>
        {/* header  */}
        <div className="text-lg md:text-2xl font-semibold flex items-center justify-between p-3">
          <h1>My Profile</h1>
          <FaBars
            className="cursor-pointer"
            onClick={() => setIsOpen("modal")}
          />
        </div>
        {/* profile box */}
        <div className="bg-blue-300 rounded-2xl w-[90%] md:w-[55%] mx-auto my-15 p-2">
          <div className="h-15 flex justify-self-center ">
            <Image
              src="/doc1.png"
              width={110}
              height={50}
              alt="pic"
              className="-mt-15"
            />
          </div>
          <MdEdit className="flex ml-auto -mt-12  cursor-pointer text-xl md:text-3xl" />
          <div className="text-center py-7 space-y-1 ">
            <p className="text-lg md:text-2xl">A.Keshav Kirupa</p>
            <p className="flex justify-center items-center text-xs md:text-lg text-gray-700">
              <FaPhoneVolume />
              +92333 7192432
            </p>
          </div>
        </div>
        {/* personal data  */}
        <div className="text-md  md:text-xl text-gray-600 space-y-5">
          <h1 className="font-semibold">Personal Info</h1>
          <hr className="my-2" />
          <p className="flex gap-3 text-sm md:text-xl">
            Email ID:{" "}
            <span className="text-black text-sm md:text-xl">
              Keshavkirupa@gmail.com
            </span>
          </p>
          <p className="flex gap-3 text-sm md:text-xl">
            Age:{" "}
            <span className="text-black text-sm md:text-xl ">26 years</span>
          </p>
          <p className="flex gap-3 text-sm md:text-xl">
            Gender: <span className="text-black text-sm md:text-xl"> Male</span>
          </p>
          <p className="flex gap-3 text-sm md:text-xl">
            Blood Group:{" "}
            <span className="text-black text-sm md:text-xl">A+</span>
          </p>
        </div>
        <hr className="my-2" />
        {/* wallet  */}
        <div className="text-md md:text-xl">
          <h1 className="font-semibold my-6">Wallet</h1>
          <div className="flex justify-between ">
            <p className="flex items-center gap-2 text-md md:text-xl">
              <GiWallet /> <span>$500</span>
            </p>
            <p className="text-blue-500 cursor-pointer">Recharge</p>
          </div>
        </div>
      </div>
      {isOpen && <ProfileModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ProfilePage;
