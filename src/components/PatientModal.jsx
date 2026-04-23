"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { X, Check, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { showToast } from "@/lib/showToastify";
import AppointmentModal from "./AppointmentModal";
import { motion, AnimatePresence } from "framer-motion";

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
      (doc) => doc.patient?.id.toString() === patientId.toString(),
    );
    if (!selectedPatient) {
      showToast("error", "Pateint not found");
      return;
    }

    setIsActive(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
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
              <h2 className="text-2xl font-bold text-gray-800">Select Patient</h2>
              <p className="text-gray-500 text-sm">Choose a patient to schedule an appointment</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={24} />
            </button>
          </div>

          {/* Patient List */}
          <div className="flex-1 overflow-y-auto p-8 modern-scroll">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="h-28 bg-gray-50 animate-pulse rounded-xl border border-gray-100" />
                ))}
              </div>
            ) : patient.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No patients found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.map((data, index) => (
                  <motion.div
                    key={data?.patient?.id || index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setPatientId(data?.patient?.id)}
                    className={`
                      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                      ${patientId === data?.patient?.id
                        ? "border-blue-500 bg-blue-50/50 shadow-md ring-4 ring-blue-50"
                        : "border-gray-100 hover:border-blue-200 hover:shadow-lg hover:bg-gray-50/50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative rounded-xl overflow-hidden shadow-inner bg-gray-100 border border-gray-100">
                        <Image
                          src={data?.patient?.profile || "/doc1.png"}
                          alt="Patient"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 capitalize leading-tight">
                          {data?.name || "Patient Name"}
                        </h3>
                        <p className="text-blue-600 text-xs font-semibold mt-1 flex items-center gap-1 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                          {data?.patient?.history || "Routine Checkup"}
                        </p>
                      </div>
                      {patientId === data?.patient?.id && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                          <Check className="text-white" size={14} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="px-8 py-6 border-t bg-gray-50/50 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-white transition shadow-sm"
            >
              Cancel
            </button>
            <button
              disabled={!patientId}
              onClick={handleSubmit}
              className="group relative px-10 py-3 rounded-xl bg-blue-500 text-white font-bold transition-all hover:bg-blue-600 disabled:opacity-50 disabled:grayscale shadow-xl shadow-blue-100 hover:shadow-blue-200 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Continue to Schedule</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </motion.div>

        {isActive && (
          <AppointmentModal
            patientId={patientId}
            onClose={onClose}
          />
        )}
      </div>
    </AnimatePresence>
  );
};

export default PatientModal;
