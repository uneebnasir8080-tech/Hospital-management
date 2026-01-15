import { FaSearch } from "react-icons/fa";
import React from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";

const data = [
  {
    id: 1,
    name: "Albuterol (salbutamol)",
    desc: "ALXSDHCCO",
    type: "inhaler",
    price: 28.55,
    stock: 100,
    expiry: "01 jun 2024",
    manu: "John's Health Care",
  },
  {
    id: 2,
    name: "Albuterol (salbutamol)",
    desc: "ALXSDHCCO",
    type: "inhaler",
    price: 28.55,
    stock: 100,
    expiry: "01 jun 2024",
    manu: "John's Health Care",
  },
  {
    id: 3,
    name: "Albuterol (salbutamol)",
    desc: "ALXSDHCCO",
    type: "inhaler",
    price: 28.55,
    stock: 100,
    expiry: "01 jun 2024",
    manu: "John's Health Care",
  },
  {
    id: 4,
    name: "Albuterol (salbutamol)",
    desc: "ALXSDHCCO",
    type: "inhaler",
    price: 28.55,
    stock: 100,
    expiry: "01 jun 2024",
    manu: "John's Health Care",
  },
  {
    id: 5,
    name: "Albuterol (salbutamol)",
    desc: "ALXSDHCCO",
    type: "inhaler",
    price: 28.55,
    stock: 100,
    expiry: "01 jun 2024",
    manu: "John's Health Care",
  },
];

const MedicineInventory = () => {
  return (
    <div className=" px-3 xl:px-5 overflow-x-scroll modern-scroll">
      <div className="min-w-[160vh]">
        {/* inputs  */}
        <div className="overflow-x-scroll modern-scroll  h-12 lg:h-15 xl:h-18 flex items-center">
          <div className=" min-w-200 flex gap-7">
            <div className="flex items-center rounded-full shadow-sm px-4  md:py-2   w-50 ">
              <FaSearch className="w-3 h-3 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none w-full text-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="">
              <DatePicker />
            </div>
            <div className="">
              <DatePicker />
            </div>
            <div className="">
              <DatePicker />
            </div>
          </div>
        </div>
        {/* table  */}
        <div>
          {" "}
          <div className="">
            <div className="    ">
              {/* heading  */}
              <div className="grid grid-cols-7 border-b-2 pb-2 text-[12px] lg:text-[16px] font-medium">
                {[
                  "Product Name",
                  "Type",
                  "Price",
                  "In Stock",
                  "Expiry Date",
                  "Manufacturer",
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
                  <div>
                    <p className="pl-2 whitespace-nowrap text-[12px] lg:text-[15px]">
                      {items.name}
                    </p>
                    <p className="text-[11px] lg:text-xs  text-center">
                      {items.desc}
                    </p>
                  </div>
                  <p className="pr-2 flex justify-center">{items.type}</p>
                  <p className="mx-auto">$ {items.price}</p>
                  <p className="mx-auto">
                    {items.stock} <span className="text-gray-400">pcs</span>{" "}
                  </p>
                  <p className="mx-auto">{items.expiry}</p>
                  <p className="mx-auto">{items.manu}</p>
                  <div className="flex items-center gap-2 justify-center">
                    <p className="border border-gray-600 cursor-pointer px-1 py-1 text-gray-600 rounded-sm">
                      <CgFileDocument />
                    </p>
                    <p className="border border-blue-600 text-blue-600 cursor-pointer px-1 font-bold rounded-sm">
                      +
                    </p>
                    <p className="border border-red-500 text-red-500 cursor-pointer px-1 py-1 font-bold rounded-sm">
                      <RiDeleteBin5Line />
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
    </div>
  );
};

export default MedicineInventory;
