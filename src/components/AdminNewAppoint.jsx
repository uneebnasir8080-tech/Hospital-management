"use client";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { api } from "@/lib/apiCall";
const data = [
  {
    id: 1,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Reschedule",
  },
  {
    id: 2,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Reschedule",
  },
  {
    id: 3,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Reschedule",
  },
  {
    id: 4,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Reschedule",
  },
  {
    id: 5,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Reschedule",
  },
];

const AdminNewAppoint = ({response}) => {
  const [open, setOpen] = useState(false);
  const filtered= response.filter((prev)=>prev.appointment.length !== 0)
  // const [resData, setResData]=useState(filtered)
  return (
    <div className=" px-3 lg:px-5  ">
      {/* inputs  */}
      <div className="flex gap-10  h-10 md:h-15 lg:h-22 items-center flex-wrap">
        <div className="flex items-center rounded-full shadow-sm px-4 py-1 md:py-2 text-sm lg:text-[16px]   w-40 sm:w-50 md:w-55 lg:w-64">
          <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full text-gray-600 placeholder-gray-400"
          />
        </div>
        <div className="hidden lg:block">
          <DatePicker />
        </div>
      </div>
      {/* table  */}
      <div className="overflow-x-scroll  modern-scroll">
        <div className="min-w-180">
          {/* heading  */}
          <div className="grid grid-cols-6 justify-center border-b-2 pb-2 text-xs lg:text-[17px]  ">
            <p className=" pl-2 font-medium flex items-center gap-1">
              Time{" "}
              <span
                onClick={() => setOpen(!open)}
                className={`cursor-pointer inline-block transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoMdArrowDropdown size={20} />
              </span>
            </p>
            <p className="font-medium flex items-center gap-1">
              Date{" "}
              <span
                onClick={() => setOpen(!open)}
                className={`cursor-pointer inline-block transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoMdArrowDropdown size={20} />
              </span>
            </p>
            <p className="  font-medium flex items-center gap-1">
              Patient Name{" "}
              <span
                onClick={() => setOpen(!open)}
                className={`cursor-pointer inline-block transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoMdArrowDropdown size={20} />
              </span>
            </p>
            <p className="  font-medium flex items-center gap-1">
              Patient Age{" "}
              <span
                onClick={() => setOpen(!open)}
                className={`cursor-pointer inline-block transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoMdArrowDropdown size={20} />
              </span>
            </p>
            <p className=" font-medium flex items-center gap-1">
              Doctor
              <span
                onClick={() => setOpen(!open)}
                className={`cursor-pointer inline-block transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoMdArrowDropdown size={20} />
              </span>
            </p>
            <p className="  font-medium flex items-center gap-1">
              User Action{" "}
              <span
                onClick={() => setOpen(!open)}
                className={`cursor-pointer inline-block transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoMdArrowDropdown size={20} />
              </span>
            </p>
          </div>
          {data.map((items, index) => (
            <div
              key={index}
              className="grid text-gray-600 grid-cols-6 w-full border-b py-3 text-xs lg:text-[16px]"
            >
              {/* data  */}
              <p className="grird  pl-2 ">{items.time}</p>
              <p className="grird ">{items.date}</p>
              <p className="grird ">{items.name}</p>
              <p className=" pl-8 grird ">{items.age}</p>
              <p className="grird ">{items.doctor}</p>
              <div className="flex gap-4 lg:justify-between grird ">
                <button className="text-blue-600 pl-2 cursor-pointer">
                  {items.link}
                </button>
                <button className="hidden lg:block mr-2 px-4 py-1 rounded-md text-white bg-red-400 cursor-pointer hover:bg-red-500">
                  X
                </button>
                <button className="block lg:hidden">x</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-2 md:text-sm flex justify-end text-xs">
        <button className="py-1 px-2 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          Prev
        </button>
        <button className="py-1 px-2 lg:px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          1
        </button>
        <button className="py-1 px-2 lg:px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          2
        </button>
        <button className="py-1 px-2 lg:px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          3
        </button>
        <button className="py-1 px-2 bg-blue-400  text-white cursor-pointer rounded-sm">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminNewAppoint;
