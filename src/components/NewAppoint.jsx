"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Booking from "./Booking";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { showToast } from "@/lib/showToastify";

const NewAppoint = () => {
  const [docId, setDocId] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const getData = useCallback(async () => {
    if (!session?.token) return;

    try {
      setLoading(true);

      const res = await api.get("/all-doctors", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      // console.log("response", res?.data.getData[4]);
      const doctors = res?.data?.getData ?? [];
      if (!Array.isArray(doctors)) {
        throw new Error("Invalid doctor data format");
      }

      setDoctor(doctors);
    } catch (error) {
      console.error("Doctor Fetch Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch doctors",
      );

      setDoctor([]);
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status, getData]);

  const handleSubmit = async () => {
    if (!Array.isArray(doctor) || !docId) return;

    const selectedDoctor = doctor.find(
      (doc) => doc.doctor._id.toString() === docId.toString(),
    );

    if (!selectedDoctor) {
      showToast("error", "Doctor not found");
      return;
    }

 

    if (selectedDoctor?.doctor?.schedule) {
      setIsActive(true);
      return;
    }

    showToast("error", "Doctor doesn't have Schedule");
  };

  return (
    <div>
      <p className="font-semibold mt-3 sm:text-lg">
        Select a Doctor for Appointment
      </p>

      {/* Loading */}
      {loading && (
        <p className="text-center my-5 text-gray-500">Loading doctors...</p>
      )}

      {/* Doctor List */}
      <div className="space-y-4 my-5 px-5 max-h-[55vh] 2xl:max-h-[62vh] overflow-auto modern-scroll">
        {!loading && doctor.length === 0 && (
          <p className="text-center text-gray-500">No doctors available</p>
        )}

        {doctor.map((data, index) => (
          <Card
            key={data?.id || index}
            onClick={() => setDocId(data?.doctor?.id)}
            className={`
              w-full md:w-[50%] justify-center
              ${index % 2 !== 0 ? "ml-auto" : "mr-auto"}
              cursor-pointer 
              transition-all duration-200
              ${
                docId === data?.id
                  ? "bg-[#7ab3ec] border-2 border-blue-500"
                  : "hover:shadow-lg"
              }
              py-2 min-h-30
            `}
          >
            <CardContent
              className={`
                flex gap-6 items-center  h-full
                ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}
              `}
            >
              {/* Fixed Image Container */}
              <div className="w-20.5 h-20.5 relative shrink-0">
                <Image
                  src={data?.doctor?.profile || "/doc1.png"}
                  alt="Doctor"
                  fill
                  className="rounded-xl object-cover"
                  sizes="90px"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="font-semibold sm:text-xl capitalize">
                  {data?.name || "Doctor Name"}
                </h1>
                <p className="text-gray-700 capitalize">
                  {data?.doctor?.specialization || "Specialization"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      <Button
        disabled={!docId}
        onClick={handleSubmit}
        className="w-full text-white bg-[#3497F9] cursor-pointer hover:bg-[#137ee9]"
      >
        Continue
      </Button>

      {isActive && <Booking docId={docId} onClose={() => setIsActive(false)} />}
    </div>
  );
};

export default NewAppoint;
