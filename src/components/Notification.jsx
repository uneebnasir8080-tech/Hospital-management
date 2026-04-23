"use client";
import React, { useMemo } from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { timeAgo } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getPatientAppointments } from "@/services/patient/partientApi";

const Notification = ({ onClose }) => {
  const { data: session, status } = useSession(null);

  const { data, isLoading } = useQuery({
    queryKey: ["patientAppointments", session?.id],
    queryFn: () => getPatientAppointments(session?.id),
    enabled: status === "authenticated" && !!session?.token,
  });

  const resData = useMemo(() => {
    const appointments = data?.getData?.appointment || [];
    // Filter pending
    const filtered = appointments.filter(
      (appoint) => appoint.status === "pending"
    );
    // Sort newest first
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [data]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-150 h-screen flex items-center"
    >
      <Card
        className="flex h-120 bg-white sm:mx-auto w-130 mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* Heading */}
          <div className="flex gap-3 pb-2 items-center ">
            <button className="cursor-pointer" onClick={onClose}>
              <X size={25} />
            </button>
            <p className="font-medium text-lg">Notification</p>
          </div>

          <hr />

          {/* Content */}
          <div className="h-100  overflow-auto modern-scroll">
            
            {/* Loading */}
            {isLoading && (
              <div className="text-center py-6 text-gray-500">
                Loading notifications...
              </div>
            )}

            {/* Empty State */}
            {!isLoading && resData.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">
                No pending notifications.
              </div>
            )}

            {/* Notifications */}
            {!isLoading &&
              resData.length > 0 &&
              resData.map((data, index) => (
                <div
                  key={index}
                  className="flex border-b border-dashed border-gray-500 py-2"
                >
                  {/* Image */}
                  <div className="flex-1 flex justify-center">
                    <Image
                      src={data?.doctorId?.profile || "/doc1.png"}
                      width={70}
                      height={70}
                      alt="Doc"
                      className="rounded-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-1 my-auto">
                    <p className="font-semibold text-lg capitalize">
                      Dr {data?.doctorId?.userId?.name || "Unknown"}
                    </p>
                    <p className="capitalize">
                      Status:{" "}
                      <span className="text-red-400">
                        {data?.status}
                      </span>
                    </p>
                  </div>

                  {/* Time */}
                  <div className="flex-1 text-gray-600 mt-5 text-sm">
                    {data?.createdAt
                      ? timeAgo(data?.createdAt)
                      : "N/A"}
                  </div>
                </div>
              ))}
          </div>

          <hr />
        </CardContent>
      </Card>
    </div>
  );
};

export default Notification;
