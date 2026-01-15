import { FaSearch } from "react-icons/fa";
import React from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { BiSolidMessageRounded } from "react-icons/bi";

import { X } from "lucide-react";

const data = [
  {
    id: 1,
    name: "Elizabeth polson",
    age: 32,
    gender: "Male",
    blood: "A+ve",
    number: "03334499208",
    email: "example@gmail.com",
  },
  {
    id: 2,
    name: "Elizabeth polson",
    age: 32,
    gender: "Male",
    blood: "A+ve",
    number: "03334499208",
    email: "example@gmail.com",
  },
  {
    id: 3,
    name: "Elizabeth polson",
    age: 32,
    gender: "Male",
    blood: "A+ve",
    number: "03334499208",
    email: "example@gmail.com",
  },
  {
    id: 4,
    name: "Elizabeth polson",
    age: 32,
    gender: "Male",
    blood: "A+ve",
    number: "03334499208",
    email: "example@gmail.com",
  },
  {
    id: 5,
    name: "Elizabeth polson",
    age: 32,
    gender: "Male",
    blood: "A+ve",
    number: "03334499208",
    email: "example@gmail.com",
  },
];

const AdminPatient = () => {
  return (
    <div className=" px-3 xl:px-5 ">
      {/* inputs  */}
      <div className="flex gap-10  h-10 lg:h-15 xl:h-22 items-center flex-wrap">
        <div className="flex items-center rounded-full shadow-sm px-4 py-1 md:py-2 text-sm xl:text-[16px]  w-40 sm:w-50 md:w-55 xl:w-64">
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
      <div>
        {" "}
        <div className="overflow-x-scroll modern-scroll">
          <div className=" min-w-[130vh]   ">
            {/* heading  */}
            <div className="grid grid-cols-7 border-b-2 pb-2 text-[12px] lg:text-[16px] font-medium">
              {[
                "Patient Name",
                "Age",
                "Gender",
                "Blood Group",
                "Phone",
                "Email",
                "User Action",
              ].map((title, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-1 px-2"
                >
                  {title}
                  <IoMdArrowDropdown
                    className="cursor-pointer transition-transform"
                    size={18}
                  />
                </div>
              ))}
            </div>
            {data.map((items, index) => (
              <div
                key={index}
                className="grid text-gray-600 grid-cols-7 w-full border-b py-2 lg:py-3 text-xs xl:text-[16px]"
              >
                <p className="pl-2">{items.name}</p>
                <p className="pr-2 flex justify-center">{items.age}</p>
                <p>{items.gender}</p>
                <p>{items.blood}</p>
                <p>{items.number}</p>
                <p>{items.email}</p>
                <div className="flex items-center gap-2 justify-center pl-4">
                  <p className="bg-blue-500 cursor-pointer px-1 py-1 text-white rounded-sm">
                    <BiSolidMessageRounded size={15} />
                  </p>
                  <p className="border border-red-500 text-red-500 cursor-pointer px-1 py-1 rounded-sm">
                    <X size={15} />
                  </p>
                  <p className="border border-blue-500 cursor-pointer px-1 py-1 rounded-sm">
                    <TiInfoLarge size={15} />
                  </p>
                </div>
              </div>
            ))}
          </div>
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

export default AdminPatient;
