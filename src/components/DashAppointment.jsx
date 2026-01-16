import { MdOutlineArrowDropDown, MdPeopleAlt } from "react-icons/md";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiMedicineBottleFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";

const cards = [
  {
    id: 1,
    icon: <IoDocumentTextOutline />,
    total: "100",
    desc: "Appointments",
    bg: "bg-blue-200",
  },
  {
    id: 2,
    icon: <MdPeopleAlt />,
    total: "50",
    desc: "New Patients",
    bg: "bg-blue-200",
  },
  {
    id: 3,
    icon: <RiMedicineBottleFill />,
    total: "500",
    desc: "Medeicine Sold",
    bg: "bg-red-200",
  },
  {
    id: 4,
    icon: <BiSolidReport />,
    total: "100",
    desc: "Labs Test",
    bg: "bg-gray-200",
  },
];

const DashAppointment = () => {
  return (
    <div className="">
      {/* head */}
      <div className="flex justify-between px-4 text-sm h-10 items-center text-gray-700">
        <div>
          <p className="">Activity Overview</p>
        </div>
        <div className="flex gap-2 items-center">
          <p>Weekly</p>
          <MdOutlineArrowDropDown />
        </div>
      </div>
      {/* cards  */}
      <div className="grid grid-cols-2 gap-3 px-2 xl:px-4 py-2 mt-3 xl:mt-5">
        {cards.map((data, index) => (
          <div
            key={index}
            className={`text-sm text-gray-700 flex flex-col py-1 xl:py-2 items-center rounded-lg ${data.bg}`}
          >
            <p className="text-xl xl:text-2xl py-1">{data.icon}</p>
            <p className="text-[11px] xl:text-xs">{data.total}</p>
            <p className="text-[11px] xl:text-xs">{data.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashAppointment;
