"use client";
import { BsArrowsAngleContract } from "react-icons/bs";
import React, { useEffect, useState, useCallback } from "react";
import { useStore } from "@/store/store";
import AdminNewAppoint from "@/components/AdminNewAppoint";
import AdminComplete from "@/components/AdminComplete";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";

const AppointmentPage = () => {
  const { data: session, status } = useSession();
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  const appointment = useStore((state) => state.appointment);
  const newAppoint = useStore((state) => state.new);
  const complete = useStore((state) => state.complete);

  const getData = useCallback(async () => {
    try {
      if (!session?.token) return;

      setLoading(true);

      const res = await api.get("/patient/all-appointment", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      const response = res?.data?.getData || [];
      setResData(response);
    } catch (err) {
      console.error("API Error:", err);
      showToast("Failed to fetch appointments", "error"); 
      setResData([]);
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status, getData]);

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
            <button className="bg-[#3497F9] hover:bg-[#3497F9] cursor-pointer text-xs px-2 rounded-sm text-white gap-1 flex items-center">
              <span className="text-[16px] lg:text-xl pb-1">+</span>
              <span className="hidden md:block">New Appointment</span>
            </button>

            <button className="text-[#3497F9] text-lg hidden lg:block">
              <BsArrowsAngleContract />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-5 text-center text-gray-500">
            Loading appointments...
          </div>
        )}

        {/* pages */}
        {!loading && appointment === "new" && (
          <AdminNewAppoint response={resData} />
        )}

        {!loading && appointment === "complete" && (
          <AdminComplete response={resData} />
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
