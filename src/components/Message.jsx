"use client";
import { useStore } from "@/store/store";
import Image from "next/image";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineArrowCircleDown } from "react-icons/md";

const data = [
  {
    id: 1,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 2,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 3,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 4,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 5,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 6,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 2,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 3,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 4,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 5,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
  {
    id: 6,
    img: "/plus.png",
    title: "Dr John Paulliston",
    desc: "Sent attachment",
    time: "9:00am",
  },
];

const Message = () => {
  const [click, setClick] = useState();
  const open= useStore((state)=>state.msgScreen)
  const close = useStore((state)=>state.openScreen)
  return (
    <>
      {/* screen  */}
      <div className=" h-full bg-white rounded-t-xl  hidden lg:block">
        {/* search bar  */}
        <div className="h-[13%] flex items-center border-b-2 pt-2">
          <div className="relative mx-auto ">
            <IoSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className=" w-50 lg:w-full text-sm lg:text-[16px] bg-gray-200 rounded-2xl pl-10 pr-4 py-1 text-gray-600 outline-none transition-colors duration-200"
            />
          </div>
        </div>
        {/* list  */}
        <div className="overflow-y-scroll modern-scroll ">
          <div className="mt-4 max-h-[70vh]">
            {data.map((items, index) => (
              <div
                onClick={() => setClick(items.id)}
                key={index}
                className={`flex justify-between rounded-md px-2 py-2 border-b cursor-pointer ${
                  click === items.id ? "bg-blue-200" : ""
                }`}
              >
                <div className="flex gap-2 ">
                  <Image src={items.img} height={5} width={35} alt="pic" />
                  <div className="space-y-1">
                    <p className="font-medium text-xs lg:text-sm">
                      {items.title}
                    </p>
                    <p className="text-[9px] tracking-wide lg:text-xs text-gray-600">
                      {items.desc}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] lg:text-xs text-gray-600 pt-2">
                    {items.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* mobile  */}
     {open && <div className={`
    bg-white rounded-t-xl lg:hidden absolute
    min-w-55 sm:min-w-65 md:min-w-70
    ${open ? "animate-slideUp" : "animate-slideDown"}
  `}>
        {/* search bar  */}
        <div className="h-13 flex items-center border-b-2 pt-2 px-2">
          
          <div className="relative mx-auto group">
            {/* Search Icon */}
            <IoSearch
              className="
        absolute left-3 top-1/2 -translate-y-1/2
        text-gray-500 cursor-pointer z-10
      "
              size={18}
            />

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              className="w-9 group-hover:w-40 lg:group-hover:w-64 text-sm lg:text-[16px]  bg-gray-200 rounded-2xl pl-10 pr-1 py-1  text-gray-600 outline-none  transition-all duration-300 ease-in-out cursor-pointer"/>
          </div>
          <MdOutlineArrowCircleDown  size={25} className="cursor-pointer" onClick={close}/>
        </div>
        {/* list  */}
        <div className="overflow-y-scroll modern-scroll ">
          <div className="mt-5 max-h-[70vh]">
            {data.map((items, index) => (
              <div
                onClick={() => setClick(items.id)}
                key={index}
                className={`flex justify-between rounded-md px-2 py-3 border-b cursor-pointer ${
                  click === items.id ? "bg-blue-200" : ""
                }`}
              >
                <div className="flex gap-2 ">
                  <Image src={items.img} height={5} width={35} alt="pic" />
                  <div className="space-y-1">
                    <p className="font-medium text-xs lg:text-sm">
                      {items.title}
                    </p>
                    <p className="text-[9px] tracking-wide lg:text-xs text-gray-600">
                      {items.desc}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] lg:text-xs text-gray-600 pt-2 ">
                    {items.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}
    </>
  );
};

export default Message;
