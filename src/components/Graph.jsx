import React from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";
import PieChartInGrid from "./ui/PieGraph";

const Graph = () => {
  return (
    <div>
      {/* head  */}
      <div className="flex justify-between h-10 items-center text-sm px-2 text-gray-600">
        <p>Top Medicines Sold</p>
        <p className="flex items-center gap-1">
          Weekly <MdOutlineArrowDropDown />
        </p>
        <p>
          {" "}
          <TbArrowsDiagonalMinimize />
        </p>
      </div>
      {/* graph  */}
      <div className="flex flex-1 items-center lg:mt-10">
        <div className="flex flex-col gap-2 px-3" >
          {" "}
          <div className="text-[11px] xl:text-sm flex items-center gap-1">
            <div className="bg-blue-500 p-1 rounded-full"></div>
            <p> paracetamol </p>
          </div>
          <div className="text-[11px] xl:text-sm flex items-center gap-1">
            <div className="bg-yellow-500 p-1 rounded-full"></div>
            <p> Vitamin Tablets </p>
          </div>
          <div className="text-[11px] xl:text-sm flex items-center gap-1">
            <div className="bg-green-500 p-1 rounded-full"></div>
            <p> Antacid Tablets</p>
          </div>
          <div className="text-[11px] xl:text-sm flex items-center gap-1">
            <div className="bg-purple-500 p-1 rounded-full"></div>
            <p> Other </p>
          </div>
        </div>
        <div className="flex flex-1">
        <PieChartInGrid />
        </div>
      </div>
    </div>
  );
};

export default Graph;
