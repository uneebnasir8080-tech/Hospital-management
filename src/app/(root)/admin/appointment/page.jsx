"use client";
import { BsArrowsAngleContract } from "react-icons/bs";
import React, { useEffect, useState, useCallback } from "react";
import { useStore } from "@/store/store";
import AdminNewAppoint from "@/components/AdminNewAppoint";
import AdminComplete from "@/components/AdminComplete";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import PatientModal from "@/components/PatientModal";

const AppointmentPage = () => {
  const { data: session } = useSession();
  const [isClose, setIsClose] = useState(false);

  const appointment = useStore((state) => state.appointment);
  const newAppoint = useStore((state) => state.new);
  const complete = useStore((state) => state.complete);

  return (
    <div className="bg-white rounded-lg">
      <div>
        {/* header */}
        <div className="flex justify-between px-3 md:px-6 lg:px-10 h-17 border-b items-center overflow-hidden">
          <div className="flex gap-3 lg:gap-5 font-medium text-black/60">
            <button
              onClick={newAppoint}
              className={`text-[9px] sm:text-[11px] w-full ${
                appointment === "new"
                  ? "border-b-4 border-[#3497F9] text-black/80"
                  : ""
              } py-1 pt-8`}
            >
              NEW APPOINTMENTS
            </button>

            <button
              onClick={complete}
              className={`text-[9px] whitespace-nowrap sm:text-[11px] w-full ${
                appointment === "complete"
                  ? "border-b-4 border-[#3497F9] text-black/80"
                  : ""
              } py-1 pt-8`}
            >
              COMPLETED APPOINTMENTS
            </button>
          </div>

          <div className="flex items-center gap-10">
            <button
              onClick={() => setIsClose(!isClose)}
              className="bg-[#3497F9] hover:bg-[#3497F9] cursor-pointer text-xs px-2 rounded-sm text-white gap-1 flex items-center"
            >
              <span className="text-[16px] lg:text-xl pb-1">+</span>
              <span className="hidden md:block">New Appointment</span>
            </button>

            <button className="text-[#3497F9] text-lg hidden lg:block">
              <BsArrowsAngleContract />
            </button>
          </div>
        </div>

        {/* pages */}
        {appointment === "new" && <AdminNewAppoint />}

        {appointment === "complete" && <AdminComplete />}
      </div>
      {isClose && (
        <PatientModal
          onClose={() => {
            setIsClose(!isClose);
            // We might need a way to refresh child components,
            // but for now, the user can switch tabs or wait for poll
          }}
        />
      )}
    </div>
  );
};

export default AppointmentPage;
