"use client";
import {
  MdOutlineArrowCircleRight,
  MdOutlineArrowCircleUp,
} from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import Image from "next/image";
import React from "react";
import { useStore } from "@/store/store";

const text = [
  {
    id: 1,
    msg: "hello",
    time: "11:20pm",
  },
  {
    id: 2,
    msg: "hey",
    time: "11:23pm",
  },
  {
    id: 3,
    msg: "jje",
    time: "11:24pm",
  },
  {
    id: 4,
    msg: "agya",
    time: "11:10pm",
  },
  {
    id: 5,
    msg: "ee",
    time: "11:20pm",
  },
  {
    id: 1,
    msg: "hello",
    time: "11:20pm",
  },
  {
    id: 2,
    msg: "hey",
    time: "11:23pm",
  },
  {
    id: 3,
    msg: "jje",
    time: "11:24pm",
  },
  {
    id: 4,
    msg: "agya",
    time: "11:10pm",
  },
  {
    id: 5,
    msg: "ejjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    time: "11:20pm",
  },
  {
    id: 1,
    msg: "hello",
    time: "11:20pm",
  },
  {
    id: 2,
    msg: "hey",
    time: "11:23pm",
  },
  {
    id: 3,
    msg: "jje",
    time: "11:24pm",
  },
  {
    id: 4,
    msg: "agya",
    time: "11:10pm",
  },
  {
    id: 5,
    msg: "ee",
    time: "11:20pm",
  },
];

const ChatScreen = () => {
  const open = useStore((state) => state.openScreen);
  return (
    <div className="h-full flex flex-col justify-between">
      {/* head  */}
      <div className="flex justify-between px-4 lg:px-7 bg-[#3497F9] items-center h-[10%] rounded-t-xl">
        <div className="flex gap-2 sm:gap-5">
          <MdOutlineArrowCircleUp
            size={25}
            className="h-full pt-1 block lg:hidden text-white cursor-pointer"
            onClick={open}
          />
          <div className="h-5">
            <Image src="/plus.png" width={35} height={20} alt="pic" />
          </div>
          <div className="">
            <p className="text-xs sm:text-sm font-medium text-white">
              Elizabeth Polson
            </p>
            <p className="text-[8px] sm:text-[10px] text-white">Online</p>
          </div>
        </div>
        <div>
          <HiDotsVertical className="text-white cursor-pointer" size={20} />
        </div>
      </div>
      {/* chat section  */}
      <div
        className="flex-1 bg-center  bg-cover bg-no-repeat flex flex-col-reverse px-2 py-1 overflow-y-scroll modern-scroll"
        style={{ backgroundImage: "url('/Chat.png')" }}
      >
        {text.map((data, index) => (
          <div
            key={index}
            className={`flex pb-1 ${
              data.id % 2 === 0 ? "flex-row-reverse" : ""
            } `}
          >
            <div>
              <p
                className={` px-3 sm:px-5 py-1 sm:py-2 rounded-md text-sm text-gray-800 ${
                  data.id % 2 === 0 ? "bg-blue-300" : "bg-gray-200"
                }`}
              >
                {data.msg}
              </p>
              <p
                className={`text-[8px] sm:text-[9px] text-gray-500 ${
                  data.id % 2 === 0 ? "text-end" : ""
                }`}
              >
                {data.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* input  */}
      <div className=" border-t border-gray-300 px-2 py-1">
        <div className="flex items-center gap-1 ">
          <BsEmojiSmile size={18} className="text-gray-500" />
          <input
            type="text"
            className="w-full outline-none  py-1 px-2 text-gray-600"
            placeholder="Type a message"
          />
          <div className="flex gap-2">
            <GoPaperclip size={20} className="text-gray-600" />
            <IoMdSend size={20} className="text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
