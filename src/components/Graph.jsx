import React from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";
import PieChartInGrid from "./ui/PieGraph";

const Graph = () => {
  return (
    <div className="flex flex-col">
      {/* head  */}
      <div className="flex justify-between h-10 items-center text-xs sm:text-sm px-2 text-gray-600">
        <p className="truncate">Top Medicines Sold</p>
        <p className="flex items-center gap-1">
          <span className="hidden sm:inline">Weekly</span>
          <MdOutlineArrowDropDown />
        </p>
        <p className="flex items-center">
          <TbArrowsDiagonalMinimize />
        </p>
      </div>
      {/* graph  */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 px-2 pb-3 flex-1 min-w-0">
        {/* Chart */}
        <div className="w-full max-w-[180px] aspect-square">
          <PieChartInGrid />
        </div>
        {/* Legend */}
        <div className="flex flex-row flex-wrap lg:flex-col gap-x-3 gap-y-1 justify-center">
          <div className="text-[10px] sm:text-xs flex items-center gap-1.5">
            <div className="bg-blue-500 w-2.5 h-2.5 rounded-full flex-shrink-0"></div>
            <p>Paracetamol</p>
          </div>
          <div className="text-[10px] sm:text-xs flex items-center gap-1.5">
            <div className="bg-yellow-500 w-2.5 h-2.5 rounded-full flex-shrink-0"></div>
            <p>Vitamin Tablets</p>
          </div>
          <div className="text-[10px] sm:text-xs flex items-center gap-1.5">
            <div className="bg-green-500 w-2.5 h-2.5 rounded-full flex-shrink-0"></div>
            <p>Antacid Tablets</p>
          </div>
          <div className="text-[10px] sm:text-xs flex items-center gap-1.5">
            <div className="bg-purple-500 w-2.5 h-2.5 rounded-full flex-shrink-0"></div>
            <p>Other</p>
          </div>
        </div>

      </div>
      <div className="text-sm text-center text-black/60 hidden lg:block">
        <p>Total Medicines Sold: 100</p>
      </div>
    </div>
  );
};

export default Graph;
