"use client";
import Image from "next/image";
import React from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const cards = [
  {
    id: 1,
    img: "/medi1.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
  {
    id: 2,
    img: "/medi2.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
  {
    id: 3,
    img: "/medi3.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
  {
    id: 4,
    img: "/medi4.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "20",
  },
  {
    id: 5,
    img: "/medi5.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "155",
  },
  {
    id: 6,
    img: "/medi6.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
  {
    id: 3,
    img: "/medi3.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
  {
    id: 4,
    img: "/medi4.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "20",
  },
  {
    id: 5,
    img: "/medi5.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "155",
  },
  {
    id: 6,
    img: "/medi6.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
  {
    id: 3,
    img: "/medi3.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
  {
    id: 4,
    img: "/medi4.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "20",
  },
  {
    id: 5,
    img: "/medi5.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "155",
  },
  {
    id: 6,
    img: "/medi6.png",
    title: "Ceramovfix 200 mg",
    desc: "10 Capsules",
    price: "55",
  },
];

const MedicineStore = () => {
  return (
    <div className="flex flex-col">
      {/* button  */}
      <div className="flex gap-3 items-center text-lg md:text-xl lg:text-2xl h-10">
        <a href="/user/home" className="text-gray-600 cursor-pointer">
          <FaRegArrowAltCircleLeft />
        </a>
        <p className="font-medium">Medicines</p>
      </div>

      {/* search bar  */}
      <div className="relative mx-auto h-10">
        <IoSearch className="text-gray-500 absolute top-2 left-2   " />
        <input
          type="text"
          className="border-2 w-[40vh] md:w-[60vh] lg:w-[90vh] border-gray-400 rounded-2xl py-1 px-7 text-sm text-gray-700"
          placeholder="Search for Medicines"
        />
      </div>

      {/* cards  */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4 max-h-103 overflow-y-scroll modern-scroll px-2">
          {cards.map((data, index) => (
            <a
              href={"/user/medicine/" + data.id}
              key={index}
              className="relative border-2 rounded-2xl p-4 text-center hover:bg-gray-100 cursor-pointer hover:shadow-lg "
            >
              {/* Image */}
              <div className="flex justify-center h-38">
                <Image src={data.img} height={100} width={200} alt="medicine" />
              </div>

              {/* Content */}
              <p className="font-medium text-lg mt-2">{data.title}</p>
              <p className="text-gray-600 text-sm">{data.desc}</p>
              <p className="text-sm font-medium">${data.price}</p>

              {/* Plus Button */}
              <button className="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 w-8 lg:w-10 h-8 lg:h-10 rounded-full text-white lg:text-xl font-bold flex items-center justify-center  transition cursor-pointer">
                +
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineStore;
