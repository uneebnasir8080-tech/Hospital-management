import { FaSearch } from "react-icons/fa";
import React from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateAge, formatDate } from "@/lib/utils";

const AdminComplete = ({ response, loading }) => {

  // ✅ Safe fallback if response is undefined
  const safeResponse = Array.isArray(response) ? response : [];

  // ✅ Remove invalid length check
  const filtered = safeResponse;

  return (
    <div className="px-3 lg:px-5">
      {/* inputs */}
      <div className="flex gap-10 h-10 md:h-15 lg:h-22 items-center flex-wrap">
        <div className="flex items-center rounded-full shadow-sm px-4 py-1 md:py-2 text-sm lg:text-[16px] w-40 sm:w-50 md:w-55 lg:w-64">
          <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full text-gray-600 placeholder-gray-400"
          />
        </div>
        <div className="hidden lg:block">
          <DatePicker />
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-scroll modern-scroll">
        <div className="min-w-180">
          {/* heading */}
          <div className="grid grid-cols-7 justify-center border-b-2 pb-2 text-xs lg:text-[17px]">
            <p className="pl-2 font-medium flex items-center gap-1">
              Time <IoMdArrowDropdown size={20} />
            </p>
            <p className="font-medium flex items-center gap-1">
              Date <IoMdArrowDropdown size={20} />
            </p>
            <p className="font-medium flex items-center gap-1">
              Patient Name <IoMdArrowDropdown size={20} />
            </p>
            <p className="font-medium flex items-center gap-1">
              Patient Age <IoMdArrowDropdown size={20} />
            </p>
            <p className="font-medium flex items-center gap-1">
              Doctor <IoMdArrowDropdown size={20} />
            </p>
            <p className="font-medium flex items-center gap-1">
              Fee Status <IoMdArrowDropdown size={20} />
            </p>
            <p className="font-medium flex items-center gap-1">
              User Action <IoMdArrowDropdown size={20} />
            </p>
          </div>

            {/* Loading */}
        {loading && (
          <div className="p-5 text-center text-gray-500">
            Loading appointments...
          </div>
        )}
{!loading &&
        <div>
          {/* ✅ Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No completed appointments found
            </div>
          )}

          {filtered.map((items, index) => (
            <div
              key={index}
              className="grid text-gray-600 grid-cols-7 w-full border-b py-3 text-xs lg:text-[16px]"
            >
              <p className="pl-2">
                {items?.time || "-"}
              </p>

              <p>
                {items?.date ? formatDate(items.date) : "-"}
              </p>

              <p className="capitalize">
                {items?.patientId?.userId?.name || "-"}
              </p>

              <p className="pl-8">
                {items?.patientId?.age
                  ? calculateAge(items.patientId.age)
                  : "-"}
              </p>

              <p className="capitalize">
                {items?.doctorId?.userId?.name || "-"}
              </p>

              <p
                className={`${
                  items?.status === "UnPaid"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {items?.status || "-"}
              </p>

              <p
                className={`${
                  items?.status === "pending"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Request Fee
              </p>
            </div>
          ))}
          </div>}
        </div>
      </div>

      {/* pagination */}
      <div className="py-2 md:text-sm flex justify-end text-xs">
        <button className="py-1 px-2 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          Prev
        </button>
        <button className="py-1 px-2 lg:px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          1
        </button>
        <button className="py-1 px-2 lg:px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          2
        </button>
        <button className="py-1 px-2 lg:px-3 focus:bg-blue-400 text-gray-600 focus:text-white cursor-pointer rounded-sm">
          3
        </button>
        <button className="py-1 px-2 bg-blue-400 text-white cursor-pointer rounded-sm">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminComplete;
