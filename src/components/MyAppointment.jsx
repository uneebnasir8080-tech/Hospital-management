"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { SlCalender } from "react-icons/sl";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";

const MyAppointment = () => {
  const { data: session, status } = useSession();
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      if (!session?.role) return;

      if (session.role !== "patient") {
        showToast("error", `${session.role} has no appointment`);
        return;
      }

      setLoading(true);

      const res = await api.get("/patient/appointment", {
        params: {
          userId: session?.id,
        },
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      const appointments = res?.data?.getData?.appointment || [];
      setResData(appointments);
    } catch (error) {
      console.error("Appointment Fetch Error:", error);
      showToast(
        "error",
        error?.response?.data?.message || "Failed to fetch appointments",
      );
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status, getData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <h1 className="mt-5 font-semibold text-[18px]">
        {`There are ${resData.length} appointments of yours`}
      </h1>

      <div className="max-h-[66vh] overflow-auto mt-10 modern-scroll px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 🔹 Skeleton Section */}
          {loading &&
            Array.from({ length: 4 }).map((_, index) => {
              const row = Math.floor(index / 2);
              const col = index % 2;
              const isCross = (row + col) % 2 === 0;

              return (
                <Card
                  key={index}
                  className={`${isCross ? "lg:bg-blue-300" : ""} p-4 animate-pulse`}
                >
                  <CardContent className="flex items-center justify-between gap-5 p-0">
                    <div className="w-30 h-20 bg-gray-300 rounded-sm hidden sm:block" />

                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                      <div className="h-4 bg-gray-300 rounded w-1/3" />
                      <div className="h-4 bg-gray-300 rounded w-1/4" />
                    </div>

                    <div className="h-6 w-16 bg-gray-300 rounded-md" />
                  </CardContent>
                </Card>
              );
            })}

          {/* 🔹 Real Data */}
          {!loading &&
            resData.map((data, index) => {
              const row = Math.floor(index / 2);
              const col = index % 2;
              const isCross = (row + col) % 2 === 0;

              return (
                <Card
                  key={data?._id || index}
                  className={`${isCross ? "lg:bg-blue-300" : ""} p-6`}
                >
                  <CardContent className="flex items-center justify-between gap-5 p-0">
                    <div className="relative w-30 h-20 hidden sm:block">
                      <Image
                        src={data?.doctorId?.profile || "/doc1.png"}
                        alt="doctor"
                        fill
                        sizes="80px"
                        className="rounded-sm object-cover"
                        priority={false}
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h1 className="font-semibold text-lg capitalize">
                        Dr {data?.doctorId?.userId?.name || "Unknown Doctor"}
                      </h1>

                      <p className="text-base">
                        {data?.doctorId?.specialization || "N/A"}
                      </p>

                      <p className="flex gap-2 items-center text-sm">
                        <SlCalender />
                        {formatDate(data?.date)}
                      </p>
                    </div>

                    <div>
                      <p className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                        {data?.time}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MyAppointment;
