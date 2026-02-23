"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { showToast } from "@/lib/showToastify";
import AppointmentModal from "./AppointmentModal";

const PatientModal = ({ onClose }) => {
  const [patientId, setPatientId] = useState(null);
  const [patient, setPatient] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  const getData = useCallback(async () => {
    if (!session?.token) return;

    try {
      setLoading(true);

      const res = await api.get("/all-patient", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      const patient = res?.data?.getData ?? [];
      if (!Array.isArray(patient)) {
        throw new Error("Invalid patient data format");
      }

      setPatient(patient);
    } catch (error) {
      console.error("Patient Fetch Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch Patient",
      );

      setPatient([]);
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
    if (!Array.isArray(patient) || !patientId) return;

    const selectedPatient = patient.find(
      (doc) => doc.patient._id.toString() === patientId.toString(),
    );
    console.log("oatkenfk", patientId)
    if (!selectedPatient) {
      showToast("error", "Pateint not found");
      return;
    }

    setIsActive(true);
    return;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-150 items-center flex ">
      <div className="w-200 mx-auto bg-white rounded-md">
        <p className="font-semibold mt-3 sm:text-lg text-center">
          Select a Patient for Appointment
        </p>

        {/* Doctor List */}
        <div className="space-y-4 my-5 px-5 max-h-[55vh] 2xl:max-h-[62vh] overflow-auto modern-scroll">
          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-4 my-5 px-5">
              {[1, 2, 3, 4].map((item, index) => (
                <Card
                  key={item}
                  className={` min-h-30 animate-pulse  ${index % 2 !== 0 ? "ml-auto" : "mr-auto"}`}
                >
                  <CardContent
                    className={`flex gap-6 items-center h-full  ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Image Skeleton */}
                    <div className="w-20.5 h-20.5 bg-gray-300 rounded-xl shrink-0"></div>

                    {/* Text Skeleton */}
                    <div className="flex flex-col gap-3 w-full">
                      <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!loading && patient.length === 0 && (
            <p className="text-center text-gray-500">No Patient available</p>
          )}

          {!loading &&
            patient.map((data, index) => (
              <Card
                key={data?.id || index}
                onClick={() => setPatientId(data?.patient?.id)}
                className={`
                w-full md:w-[50%] justify-center 
                ${index % 2 !== 0 ? "ml-auto" : "mr-auto"}
                cursor-pointer 
                transition-all duration-200
                ${
                  patientId === data?.patient?.id
                    ? "bg-[#7ab3ec] border-2 border-blue-500"
                    : "hover:shadow-lg"
                }
                py-2 min-h-30
              `}
              >
                <CardContent
                  className={`
                  flex gap-6 items-center h-full 
                  ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}
                `}
                >
                  {/* Image */}
                  <div className="w-17 h-17 relative shrink-0">
                    <Image
                      src={data?.patient?.profile || "/doc1.png"}
                      alt="Patient"
                      fill
                      className="rounded-xl object-cover"
                      sizes="50px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center">
                    <h1 className="font-semibold  capitalize">
                      {data?.name || "Patient Name"}
                    </h1>
                    <p className="text-gray-700 capitalize text-sm">
                      {data?.patient?.history || "Fever"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Continue Button */}
        <div className="flex gap-3 px-3 mb-2">
          <Button onClick={onClose} className=" grow cursor-pointer">
            Close
          </Button>
          <Button
            disabled={!patientId}
            onClick={handleSubmit}
            className=" text-white bg-[#3497F9] cursor-pointer hover:bg-[#137ee9] grow"
          >
            Continue
          </Button>
        </div>
      </div>
      {isActive && <AppointmentModal patientId={patientId} onClose={onClose}/>}
    </div>
  );
};

export default PatientModal;
