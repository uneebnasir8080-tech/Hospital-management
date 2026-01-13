// "use client";
import Image from "next/image";
import React from "react";

const user = [
  {
    id: 1,
    img: "/doc2.png",
    title: "Dr john Paulliston",
    payment: "sent attachment",
    time: "18 mins ago",
  },
  {
    id: 2,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 3,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 4,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 5,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 6,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 7,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "sent attachment",
    time: "18 mins ago",
  },
  {
    id: 8,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 9,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 10,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "sent attachment",
    time: "18 mins ago",
  },
  {
    id: 11,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 12,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 13,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 14,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "sent attachment",
    time: "18 mins ago",
  },
  {
    id: 15,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 16,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
  {
    id: 17,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "sent attachment",
    time: "18 mins ago",
  },
  {
    id: 18,
    img: "/doc1.png",
    title: "Medicine Fee",
    payment: "500",
    time: "18 mins ago",
  },
];

const ChatBar = () => {
  //   const pathName = usePathname();
  return (
    <div className="bg-gray-100 w-40 md:w-60 lg:w-80 xl:w-90 h-[calc(97vh-64px)] overflow-hidden flex flex-col items-center">
      {/* logo */}
      <div className="mt-5">
        <p className="font-semibold text-2xl">Chat</p>
      </div>
      <div className="place-self-center pt-6 w-full max-h-screen overflow-auto modern-scroll">
        {user.map((data, index) => (
          <a 
          href={"/user/chat/"+data.id}
            key={index}
            className=" flex flex-4 mb-2 border-b border-dashed border-gray-500 hover:bg-blue-200 hover:rou cursor-pointer" 
          >
            {/* img  */}
            <div className=" w-20 h-16 flex-1  justify-center hidden md:flex">
              <Image
                src={data.img}
                width={60}
                height={20}
                alt="Doc"
                className=" rounded-full"
              />
            </div>
            {/* data  */}
            <div className="flex-2 space-y-1 my-auto flex flex-col items-center md:items-start">
              <p className="font-semibold text-sm md:text-md">{data.title}</p>
              <p className="text-xs md:text-sm ">{data.payment}</p>
            </div>
            {/* time  */}
            <div className="flex-1 hidden lg:block text-gray-600 text-xs mt-3  ">
              {data.time}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ChatBar;
