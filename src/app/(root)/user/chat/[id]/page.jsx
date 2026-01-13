import Image from "next/image";
import { IoSend } from "react-icons/io5";
import React from "react";
import { IoVideocam } from "react-icons/io5";

const chat = [
  {
    id: 1,
    msg: "Hello",
    time: "11:12",
  },
  {
    id: 2,
    msg: "hey",
    time: "11:13",
  },
  {
    id: 3,
    msg: "how are you",
    time: "11:14",
  },
  {
    id: 4,
    msg: "Hello",
    time: "11:15",
  },
  {
    id: 5,
    msg: "dsdf",
    time: "11:16",
  },
  {
    id: 6,
    msg: "Hello",
    time: "11:17",
  },
  {
    id: 3,
    msg: "how are you",
    time: "11:14",
  },
  {
    id: 4,
    msg: "Hello",
    time: "11:15",
  },
  {
    id: 5,
    msg: "dsdf",
    time: "11:16",
  },
  {
    id: 6,
    msg: "Hello",
    time: "11:17",
  },
];

const ChatId = async ({ params }) => {
  const param = await params;
  return (
    <div className="flex flex-col  h-[calc(97vh-64px)]">
      {/* navbar */}
      <div className="flex items-center justify-between px-6 bg-blue-300 shrink-0">
        <div className="flex gap-4 items-center">
          <div className="h-16">
            <Image
              src="/doc1.png"
              height={20}
              width={60}
              alt="doctor"
              className="rounded-full"
            />
          </div>

          <div>
            <p className="font-medium">Dr Joel Paulliston</p>
            <p className="text-xs">Online</p>
          </div>
        </div>
        <div>
          <IoVideocam size={30} className="cursor-pointer" />
        </div>
      </div>
      {/* main  */}
      <div className="flex-1 overflow-y-scroll px-4 py-2 flex flex-col-reverse gap-3">
        {chat.map((data, index) => (
          <div
            className={`flex ${data.id % 2 === 0 ? "flex-row-reverse" : ""}`}
            key={index}
          >
            <div className=" flex flex-col ">
              <p
                className={`${
                  data.id % 2 === 0 ? "bg-gray-200" : "bg-blue-200"
                } py-3 px-7 font-medium rounded-xl`}
              >
                {data.msg}
              </p>
              <p className="text-xs ml-auto">{data.time} pm</p>
            </div>
          </div>
        ))}

        {/* <div className=" flex ">
          <div className="flex flex-col">
            <p className=" py-3 px-7 font-medium rounded-xl">Hey</p>
            <p className="text-xs ml-auto">11:10 pm</p>
          </div>
        </div> */}
      </div>
      {/* text area  */}
      <div className="flex w-full items-center gap-2 px-2">
        <input
          type="text"
          className=" grow py-2 rounded-2xl px-2 text-black/80 bg-gray-300"
          placeholder="Type a meesage"
        />
        <div className="bg-blue-400 px-2 py-2  rounded-full cursor-pointer ">
          <IoSend size={25} className="  text-white" />
        </div>
      </div>
    </div>
  );
};

export default ChatId;
