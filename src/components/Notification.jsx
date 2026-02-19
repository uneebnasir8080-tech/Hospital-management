"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { timeAgo } from "@/lib/utils";
import { showToast } from "@/lib/showToastify";

const Notification = ({ onClose }) => {
  const { data: session, status } = useSession(null);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      setLoading(true);

      if (!session?.token) return;

      const res = await api.get("/patient/appointment", {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      const response = res?.data?.getData?.appointment || [];

      // ✅ Filter pending
      const filtered = response.filter(
        (appoint) => appoint.status === "pending"
      );

      // ✅ Sort newest first
      const sorted = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setResData(sorted);
    } catch (err) {
      console.error("Notification Fetch Error:", err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to load notifications"
      );
      setResData([]);
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    getData();
  }, [status, getData]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-150 flex items-center"
    >
      <Card
        className="flex sm:mx-auto w-130 mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* Heading */}
          <div className="flex gap-2 pb-2 items-center">
            <button className="cursor-pointer" onClick={onClose}>
              <X size={25} />
            </button>
            <p className="font-medium text-lg">Notification</p>
          </div>

          <hr />

          {/* Content */}
          <div className="max-h-50 sm:max-h-80 overflow-auto modern-scroll">
            
            {/* Loading */}
            {loading && (
              <div className="text-center py-6 text-gray-500">
                Loading notifications...
              </div>
            )}

            {/* Empty State */}
            {!loading && resData.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">
                No pending notifications.
              </div>
            )}

            {/* Notifications */}
            {!loading &&
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
