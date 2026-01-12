"use client";
import MyAppointment from "@/components/MyAppointment";
import NewAppoint from "@/components/NewAppoint";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const DoctorPage = () => {
  const [isActive, setIsActive] = useState("old");

  return (
    <div>
      <div>
        {/* heading button  */}
        <div className="flex justify-between">
          <Button
            onClick={() => setIsActive("old")}
            className={` cursor-pointer hover:scale-105 px-15 py-3 text-lg  border-2 rounded-none   border-[#3497F9] hover:bg-transparent ${
              isActive === "old"
                ? "bg-[#3497F9] text-white hover:bg-[#3497F9]"
                : "text-[#3497F9] bg-transparent"
            }`}
          >
            My Appointents
          </Button>
          <Button
            onClick={() => setIsActive("new")}
            className={` cursor-pointer hover:scale-105 px-15 py-3 text-lg  border-2 rounded-none hover:bg-transparent border-[#3497F9] ${
              isActive === "new"
                ? "bg-[#3497F9] text-white hover:bg-[#3497F9]"
                : "text-[#3497F9] bg-transparent"
            } `}
          >
            New Appointent
          </Button>
        </div>
        {/* list  */}
        <div>{isActive === "new" ? <NewAppoint /> : <MyAppointment />}</div>
      </div>
    </div>
  );
};

export default DoctorPage;
