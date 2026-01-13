"use client"
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { RiTimer2Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import PaymentHistory from "./PaymentHistory";

const ProfileModal = ({ onClose }) => {
    const [isOpen, setIsOpen]= useState("modal")
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/20 z-150 flex items-center"
    >
     {isOpen==="modal" && <Card
        className="flex mx-5 sm:mx-auto w-130 "
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* heading  */}
          <hr />
          {/* input  */}{" "}
          <div className="my-5 space-y-5">
            <button className="flex items-center text-md md:text-xl gap-3 text-gray-700 cursor-pointer">
              <RiTimer2Line />
              My activity
            </button>
            <button className="flex items-center text-md md:text-xl gap-3 text-gray-700 cursor-pointer">
              <IoMdSettings />
              Settings
            </button>
            <button className="flex items-center text-md md:text-xl gap-3 text-gray-700 cursor-pointer" onClick={()=>setIsOpen("history")}> 
              <MdPayments />
              Payment History
            </button>
          </div>
          {/* btns */}
          <hr />
        </CardContent>
      </Card>}
      {isOpen==="history" && <PaymentHistory onOpen={()=>setIsOpen("modal")}/>}
    </div>
  );
};

export default ProfileModal;
