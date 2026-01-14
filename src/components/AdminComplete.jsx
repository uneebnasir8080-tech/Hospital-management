"use client";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "./ui/button";

const data = [
  {
    id: 1,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Request fee",
    pay: "UnPaid",
  },
  {
    id: 2,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Request fee",
    pay: "Paid",
  },
  {
    id: 3,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Request fee",
    pay: "UnPaid",
  },
  {
    id: 4,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Request fee",
    pay: "Paid",
  },
  {
    id: 5,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Request fee",
    pay: "Paid",
  },
  {
    id: 6,
    time: "11:30 Am",
    date: "05/12/2023",
    name: "Elizabeth polson",
    age: 32,
    doctor: "Dr John",
    link: "Request fee",
    pay: "Paid",
  },
];

const AdminComplete = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-10">
      {/* inputs  */}
      <div className="flex gap-10 h-22 items-center">
        <div className="flex items-center bg-b16e-100 rounded-full shadow-sm px-4 py-2 w-64">
          <FaSearch className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full text-gray-600 placeholder-gray-400"
          />
        </div>
        <div className="">
          <DatePicker />
        </div>
      </div>
      {/* table  */}
      <div className="">
        {/* heading  */}
        <div className="grid grid-cols-7 justify-center border-b-2 pb-2">
          <p className="flex-1 pl-2 font-medium flex items-center gap-1">
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
            Fee Status{" "}
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
            className="grid grid-cols-7 text-gray-600 w-full border-b py-3 "
          >
            {/* data  */}
            <p className="  pl-2 ">{items.time}</p>
            <p className=" ">{items.date}</p>
            <p className=" ">{items.name}</p>
            <p className=" pl-8  ">{items.age}</p>
            <p className=" ">{items.doctor}</p>
            <p
              className={`${
                items.pay === "UnPaid" ? "text-red-500" : "text-green-500"
              }`}
            >
              {items.pay}
            </p>
            <p
              className={`${
                items.id % 2 === 0 ? "text-[#1776d4]" : "text-gray-400"
              }`}
            >
              {items.link}
            </p>
          </div>
        ))}
      </div>
      <div className="py-3 text-sm flex justify-end">
        <button className="py-1 px-2 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          Prev
        </button>
        <button className="py-1 px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          1
        </button>
        <button className="py-1 px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          2
        </button>
        <button className="py-1 px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          3
        </button>
        <button className="py-1 px-2 bg-blue-400  text-white cursor-pointer rounded-sm">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminComplete;
