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
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const AppointmentModal = ({ onClose, patientId }) => {
  const [docId, setDocId] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

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
      (doc) => doc.doctor?._id?.toString() === docId.toString() || doc.doctor?.id?.toString() === docId.toString(),
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
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b bg-gray-50/50 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Assign Doctor</h2>
              <p className="text-gray-500 text-sm">Select the available specialist for this appointment</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={24} />
            </button>
          </div>

          {/* Doctor List */}
          <div className="flex-1 overflow-y-auto p-8 modern-scroll">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="h-32 bg-gray-50 animate-pulse rounded-xl border border-gray-100" />
                ))}
              </div>
            ) : doctor.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No doctors available at this time</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctor.map((data, index) => (
                  <motion.div
                    key={data?.doctor?._id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setDocId(data?.doctor?.id)}
                    className={`
                      relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
                      ${docId === data?.doctor?.id
                        ? "border-blue-500 bg-blue-50/50 shadow-md ring-4 ring-blue-50"
                        : "border-gray-100 hover:border-blue-200 hover:shadow-lg hover:bg-gray-50/50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 relative rounded-xl overflow-hidden shadow-inner bg-gray-100 border border-gray-100">
                        <Image
                          src={data?.doctor?.profile || "/doc1.png"}
                          alt="Doctor"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 capitalize leading-tight">
                          {data?.name || "Doctor Name"}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm mt-1">
                          {data?.doctor?.specialization || "Specialist"}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-medium">
                            {data?.doctor?.experience || '5+'} Years Exp.
                          </span>
                        </div>
                      </div>
                      {docId === data?.doctor?.id && (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                          <Check className="text-white" size={18} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div className="px-8 py-6 border-t bg-gray-50/50 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-white transition shadow-sm"
            >
              Back
            </button>
            <button
              disabled={!docId}
              onClick={handleSubmit}
              className="group relative px-10 py-3 rounded-xl bg-blue-500 text-white font-bold transition-all hover:bg-blue-600 disabled:opacity-50 disabled:grayscale shadow-xl shadow-blue-100 hover:shadow-blue-200 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Select Schedule</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </motion.div>

        {isActive && (
          <Booking
            docId={docId}
            Loading={loading}
            onClose={() => {
              onClose && onClose();
              setIsActive(false);
            }}
            patientId={patientId}
          />
        )}
      </div>
    </AnimatePresence>
  );
};

export default AppointmentModal;
