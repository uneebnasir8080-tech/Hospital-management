import { FaSearch } from "react-icons/fa";
import React from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateAge, formatDate } from "@/lib/utils";
import { deleteAppointment } from "@/app/actions/deleteAppointment";

const AdminNewAppoint = ({ response, loading, token }) => {
  // ✅ Safe fallback
  const safeResponse = Array.isArray(response) ? response : [];

  const filtered = safeResponse.filter(
  (appoint) => appoint?.status === "pending"
);


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
          <div className="grid grid-cols-6 justify-center border-b-2 pb-2 text-xs lg:text-[17px]">
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
              User Action <IoMdArrowDropdown size={20} />
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="p-5 text-center text-gray-500">
              Loading appointments...
            </div>
          )}
          {!loading && (
            <div>
              {/* ✅ Empty State */}
              {filtered.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No new appointments found
                </div>
              )}

              {filtered.map((items, index) => (
                <div
                  key={index}
                  className="grid text-gray-600 grid-cols-6 w-full border-b py-3 text-xs lg:text-[16px]"
                >
                  <p className="pl-2">{items?.time || "-"}</p>

                  <p>{items?.date ? formatDate(items.date) : "-"}</p>

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

                  <div className="flex gap-4 lg:justify-between">
                    <button className="text-blue-600 pl-2 cursor-pointer">
                      Reschedule
                    </button>

                    <form action={deleteAppointment}>
                      <input type="hidden" name="id" value={items?._id} />
                      <input type="hidden" name="token" value={token} />

                      <button
                        type="submit"
                        className="hidden lg:block mr-2 px-4 py-1 rounded-md text-white bg-red-400 cursor-pointer hover:bg-red-500"
                      >
                        X
                      </button>
                    </form>

                    <button className="block lg:hidden">x</button>
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default AdminNewAppoint;
