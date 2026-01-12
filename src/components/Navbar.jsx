import Image from "next/image";
import React from "react";
import { HiBell } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="h-20 w-full fixed px-5 md:px-10 bg-gray-50">
      <div className="flex justify-between items-center min-h-full">
        {/* logo */}
        <div  className="flex ">
         <img src="/logo.png" alt="logo" className="h-10 md:h-12"/>
        </div>
        {/* icons  */}
        <div className="flex gap-4 ">
          <div className="bg-gray-200 rounded-full p-1 relative">
            <HiBell className="text-3xl text-black/50" />
            <div className="bg-red-500 absolute p-1 rounded-full top-1/6 right-1/4"></div>
          </div>
          <div className="bg-gray-200 rounded-full p-1 hidden sm:flex">
            <IoMdPerson className="text-3xl text-black/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
