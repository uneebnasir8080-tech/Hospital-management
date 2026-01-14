"use client";
import { BsArrowsAngleContract } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import React from "react";
import { useStore } from "@/store/store";
import AdminNewAppoint from "@/components/AdminNewAppoint";
import AdminComplete from "@/components/AdminComplete";

const AppointmentPage = () => {
  const appointment = useStore((state) => state.appointment);
  const newAppoint = useStore((state) => state.new);
  const complete = useStore((state) => state.complete);
  return (
    <div className="bg-white h-full rounded-lg ">
      {/* header  */}
      <div className="flex  justify-between px-10 h-15 border-b  items-center ">
        <div className="flex gap-5 font-medium  text-black/60 justify-end">
          <button
            onClick={newAppoint}
            className={`${
              appointment === "new" ? "border-b-4 border-[#3497F9] text-black/80" : ""
            }  py-1 pt-8`}
          >
            NEW APPOINTMENTS
          </button>
          <button
            onClick={complete}
            className={`${
              appointment === "complete" ? "border-b-4 border-[#3497F9] text-black/80" : ""
            }  py-1 pt-8`}
          >
            COMPLETED APPOINTMENTS
          </button>
        </div>
        <div className="flex items-center gap-10 ">
          <Button className="bg-[#3497F9] hover:bg-[#3497F9] cursor-pointer">
            <span className="text-xl">+</span> New Appointment
          </Button>
          <button className="text-[#3497F9] text-lg ">
            <BsArrowsAngleContract />
          </button>
        </div>
      </div>
      {/* pages  */}
      {appointment === "new" && <AdminNewAppoint />}
      {appointment === "complete" && <AdminComplete />}
    </div>
  );
};

export default AppointmentPage;
