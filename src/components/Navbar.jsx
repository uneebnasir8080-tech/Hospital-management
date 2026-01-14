"use client";
import { useStore } from "@/store/store";
import React from "react";
import { HiBell } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";
import Notification from "./Notification";

const Navbar = () => {
  const isOpen = useStore((state) => state.isOpen);
  const open = useStore((state) => state.open);
  const close = useStore((state) => state.close);
  return (
    <div className="sticky top-0 place-items-end z-10 bg-gray-50 px-5 md:px-10 h-20">
      <div className="flex justify-between items-center min-h-full">
        {/* icons  */}
        <div className="flex gap-4 ">
          <div
            className="bg-gray-200 rounded-full p-1 relative cursor-pointer"
            onClick={open}
          >
            <HiBell className="text-3xl text-black/50" />
            <div className="bg-red-500 absolute p-1 rounded-full top-1/6 right-1/4"></div>
          </div>
          <a
            href="/user/profile"
            className="bg-gray-200 rounded-full p-1 hidden sm:flex"
          >
            <IoMdPerson className="text-3xl text-black/50" />
          </a>
        </div>
      </div>
      {isOpen && <Notification onClose={close} />}
    </div>
  );
};

export default Navbar;
