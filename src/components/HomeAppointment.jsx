"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { SlCalender } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";

const HomeAppointment = () => {
  const { data: session, status } = useSession();
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const getData = async () => {
      try {
        if (session?.role !== "patient") return;

        const res = await api.get("/patient/appointment", {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

        setResData(res?.data?.getData?.appointment || []);
      } catch (error) {
        console.error("Appointment Fetch Error:", error);
        showToast(
          "error",
          error?.response?.data?.message || "Failed to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [status, session?.token, session?.role]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* 🔹 Skeleton Loader */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse bg-blue-100">
              <CardContent className="flex items-center gap-6 p-4">
                <div className="w-16 h-16 bg-gray-300 rounded-md" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                  <div className="h-4 bg-gray-300 rounded w-1/3" />
                  <div className="h-4 bg-gray-300 rounded w-1/4" />
                </div>
                <div className="h-6 w-16 bg-gray-300 rounded-md" />
              </CardContent>
            </Card>
          ))}

        {/* 🔹 Real Data */}
        {!loading &&
          resData?.map((data) => (
            <Card key={data?._id} className="bg-blue-200 py-3 px-2">
              <CardContent className="flex items-center justify-between gap-6 p-4">

                {/* Doctor Image */}
                <div className="relative w-25 h-20 hidden sm:block">
                  <Image
                    src={data?.doctorId?.profile || "/doc1.png"}
                    alt="doctor"
                    fill
                    sizes="80px"
                    className="rounded-sm object-cover"
                  />
                </div>

                {/* Info */}
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

                {/* Time Badge */}
                <div>
                  <p className="bg-blue-400 px-3 py-1 rounded-xl text-[13px]">
                    {data?.time}
                  </p>
                </div>

              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default HomeAppointment;
