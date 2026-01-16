import React from "react";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";

const heading = [
  {
    id: 1,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 2,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 3,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 4,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 5,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 3,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 4,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 5,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 3,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 4,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
  {
    id: 5,
    time: "9:30pm",
    date: "05/12/2023",
    Patient: "Elizabeth Pollson",
    dr: "Dr John",
  },
];
const AdminTable = () => {
  return (
    <div className="overflow-x-scroll">
    <div className="px-2 pt-1 min-w-100">
      {/* head  */}
      <div className="flex justify-between px-3 pt-2 text-[10px] lg:text-xs font-medium tracking-wide border-b ">
        <div className="flex gap-2 ">
          <button className="cursor-pointer border-b-2 border-blue-500 pb-1">
            New Appointments
          </button>
          <button className="cursor-pointer focus:border-b-2 border-blue-500 pb-1">
            Completed Appointments
          </button>
        </div>
        <TbArrowsDiagonalMinimize className="cursor-pointer"/>
      </div>
      {/* table  */}
      <div className="max-h-47 xl:max-h-55 xl:min-h-55 overflow-y-scroll modern-scroll mt-2">
        {/* heading  */}
        <div className="flex flex-4">
          {["Time", "Date", "Patient Name", "Doctor"].map((data, index) => (
            <div
              key={index}
              className=" flex flex-1 justify-center text-xs lg:text-sm py-1 border-b"
            >
              <p>{data}</p>
            </div>
          ))}
        </div>
        {/* table data  */}
        <div className="flex flex-col flex-6 justify-center">
          {heading.map((items, index) => (
            <div
              key={index}
              className="flex flex-6 space-y-2 border-b text-gray-500 mt-2 text-[10px] lg:text-xs"
            >
              <p className="flex-1 text-center ">{items.time}</p>
              <p className="flex-1 text-center">{items.date}</p>
              <p className="flex-1 text-center">{items.Patient}</p>
              <p className="flex-1 text-center">{items.dr}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminTable;
