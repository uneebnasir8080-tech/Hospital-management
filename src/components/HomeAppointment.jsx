"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Calendar, User, Clock, ArrowRight, Activity } from "lucide-react";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";
import { motion, AnimatePresence } from "framer-motion";

const HomeAppointment = () => {
  const { data: session, status } = useSession();
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const getData = async () => {
      try {
        if (session?.role !== "patient") {
          setLoading(false);
          return;
        }

        const res = await api.get("/patient/appointment", {
          params:{
            userId:session?.id
          },
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
  }, [status, session?.token, session?.id, session?.role]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🔹 Skeleton Loader */}
        <AnimatePresence>
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-sm bg-slate-50 ring-1 ring-slate-100 overflow-hidden">
                  <CardContent className="flex items-center gap-6 p-5">
                    <div className="w-16 h-16 bg-slate-200 animate-pulse rounded-2xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-slate-200 animate-pulse rounded-full w-2/3" />
                      <div className="h-3 bg-slate-100 animate-pulse rounded-full w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* 🔹 No Appointment Box */}
        {!loading && resData.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-12 px-6 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 text-center"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <Calendar size={32} />
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Appointments</h2>
            <p className="text-slate-500 font-bold text-sm mt-2 max-w-xs">
              Your health journey starts here. Once you book, we'll keep you notified.
            </p>
            <a href="/user/doctor" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">
              Book Now <ArrowRight size={14} />
            </a>
          </motion.div>
        )}

        {/* 🔹 Real Data */}
        {!loading &&
          resData.length > 0 &&
          resData.map((data, index) => (
            <motion.div
              key={data?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative border-none bg-white hover:bg-slate-50 transition-all duration-300 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 ring-1 ring-slate-100 overflow-hidden">
                <CardContent className="flex items-center gap-6 p-5">
                  {/* Doctor Image */}
                  <div className="relative w-20 h-20 shrink-0">
                    <div className="absolute inset-0 bg-blue-600/10 rounded-2xl group-hover:scale-95 transition-transform" />
                    <Image
                      src={data?.doctorId?.profile || "/doc1.png"}
                      alt="doctor"
                      fill
                      sizes="80px"
                      className="rounded-2xl object-cover p-1 transition-transform group-hover:scale-110"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-4 border-white shadow-sm" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] px-2 py-0.5 bg-blue-50 rounded-full">Confirmed</span>
                    </div>
                    <h3 className="font-black text-slate-800 text-lg sm:text-xl truncate leading-tight">
                      Dr. {data?.doctorId?.userId?.name || "Specialist"}
                    </h3>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-3">
                      {data?.doctorId?.specialization || "General Medicine"}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                        <Calendar size={14} className="text-blue-500" />
                        {formatDate(data?.date)}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                        <Clock size={14} className="text-blue-500" />
                        {data?.time}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end gap-2">
                    <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all active:scale-90">
                      <Activity size={18} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default HomeAppointment;
