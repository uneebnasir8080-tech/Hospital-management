"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { FaHeart, FaRegArrowAltCircleLeft, FaRegHeart } from "react-icons/fa";

const SinglePage = () => {
  const [liked, setLiked] = React.useState(false);
  const id = useParams();
  return (
    <div className="p-2 sm:p-6 max-h-[75vh]">
      {/* button  */}
      <div className="flex justify-between px-6 items-center text-lg md:text-xl lg:text-2xl h-10">
        <a href="/user/medicine" className="text-gray-600 cursor-pointer">
          <FaRegArrowAltCircleLeft />
        </a>
        {!liked && (
          <a className=" cursor-pointer">
            <FaRegHeart
              onClick={() => setLiked(!liked)}
              className={`cursor-pointer text-xl transition-colors duration-200`}
            />
          </a>
        )}
        {liked && (
          <a className="text-red-700 cursor-pointer ">
            <FaHeart
              onClick={() => setLiked(!liked)}
              className={`cursor-pointer text-xl transition-colors duration-200`}
            />
          </a>
        )}
      </div>
      {/* main  */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-1 items-center py-5">
        <div className="flex-1 flex flex-col border rounded-md mr-3 sm:mr-10 ml-2 py-2">
          <div className="relative w-60 sm:w-80 h-60 sm:h-70 mx-auto">
            <Image
              src="/medi3.png"
              fill
              alt="pic"
              className=" object-contain"
            />
          </div>
          <div className="flex justify-center h-20">
            <div className="relative w-20 sm:w-25 h-19 sm:h-20 hover:bg-gray-100 cursor-pointer">
              <Image
                src="/medi1.png"
                fill
                alt="pic"
                className="border border-gray-300 object-contain"
              />
            </div>
            <div className="relative w-20 sm:w-25 h-19 sm:h-20 hover:bg-gray-100 cursor-pointer">
              <Image
                src="/medi2.png"
                fill
                alt="pic"
                className="border border-gray-300 object-contain"
              />
            </div>
            <div className="relative w-20 sm:w-25 h-19 sm:h-20 hover:bg-gray-100 cursor-pointer">
              <Image
                src="/medi4.png"
                fill
                alt="pic"
                className="border border-gray-300 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <div className="space-y-2">
            <p className="font-medium text-lg lg:text-2xl text-gray-800">
              Ceramovfix 200 mg Strip Of 10 Tablets
            </p>
            <p className="text-gray-400 text-xs md:text-sm">
              By John’s Health Care
            </p>
          </div>
          <div className="flex justify-between pr-10">
            <p className="font-medium text-[16px] md:text-lg">$ 100</p>
            <button className="cursor-pointer bg-blue-500 text-white px-2 md:px-4 py-1 rounded-lg text-xs md:text-[16px]">
              + Add
            </button>
          </div>
        </div>
      </div>
      {/* description  */}
      <div className="flex flex-2 flex-col lg:flex-row ">
        <div className="space-y-2 flex-1 px-4 text-center md:text-left pt-5 md:pt-0">
          <p className="font-medium text-gray-600 text-lg">How to use</p>
          <p className="text-gray-500">
            This tablet works by interfering with the production of a chemical
            called prostaglandins, which is responsible for the fever, swelling
            and sensation of pain. It also acts on the area of the brain,
            responsible for controlling body temperature
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 text-center py-4 md:py-1">
          <div>
            <p className="text-gray-500">Contains</p>
            <p className="text-gray-900 font-medium text-lg">
              Acetaminophen (200 Mg)
            </p>
          </div>
          <div>
            <p className="text-gray-500">Uses</p>
            <p className="text-gray-900 font-medium text-lg">
              General Body Pain
            </p>
          </div>
          <div>
            <p className="text-gray-500">Side effects</p>
            <p className="text-gray-900 font-medium text-lg">
              Skin rash, itching
            </p>
          </div>
          <div>
            <p className="text-gray-500">Therapy</p>
            <p className="text-gray-900 font-medium text-lg">ANTIPYRETIC</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
