import Image from "next/image";
import React from "react";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";
import { Button } from "./ui/button";

const list = [
  {
    id: 1,
    img: "/content.png",
    title: "Elizabeth Pollson",
    desc: "Dr fee pending",
  },
  {
    id: 1,
    img: "/content.png",
    title: "Elizabeth Pollson",
    desc: "Dr fee pending",
  },
  {
    id: 1,
    img: "/content.png",
    title: "Elizabeth Pollson",
    desc: "Dr fee pending",
  },
  {
    id: 1,
    img: "/content.png",
    title: "Elizabeth Pollson",
    desc: "Dr fee pending",
  },
  {
    id: 1,
    img: "/content.png",
    title: "Elizabeth Pollson",
    desc: "Dr fee pending",
  },
];

const PaymentFee = () => {
  return (
    <div>
      {/* head  */}
      <div className="flex justify-between h-10 items-center px-2 text-sm text-gray-700">
        <p>Patient Fee</p>
        <p>
          <TbArrowsDiagonalMinimize />
        </p>
      </div>
      {/* list  */}
      <div>
        {list.map((data, index) => (
          <div
            key={index}
            className="text-sm flex justify-between px-2 items-center border-b py-2"
          >
            <div className="flex h-10 gap-2">
              <Image src={data.img} height={10} width={40} alt="pic" />
              <div className="text-[11px] xl:text-xs">
                <p className="font-medium tracking-tight">{data.title}</p>
                <p className="text-red-400"> {data.desc}</p>
              </div>
            </div>
            <button className="bg-blue-400 px-2 py-1 text-xs xl:text-sm text-white rounded-md">
              Request Fee
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentFee;
