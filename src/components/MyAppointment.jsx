"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Calendar, Clock, Trash2, ExternalLink, Activity, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getPatientAppointments } from "@/services/patient/partientApi";

const MyAppointment = () => {
  const { data: session, status } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["patientAppointments", session?.id],
    queryFn: () => getPatientAppointments(session?.id),
    enabled: status === "authenticated" && session?.role === "patient",
  });

  const resData = data?.getData?.appointment || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">My Consultations</h2>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Tracking {resData.length} scheduled visits
          </p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
          <Calendar size={20} />
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto modern-scroll pr-4">
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={`loading-${index}`} className="border-none bg-slate-50 animate-pulse rounded-[2rem] h-40" />
              ))
            ) : resData.length === 0 ? (
              <div className="py-20 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-4">
                  <Activity size={32} />
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">No Scheduled Appointments Found</p>
              </div>
            ) : (
              resData.map((data, index) => (
                <motion.div
                  key={data?._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group border-none bg-white hover:bg-slate-50 transition-all duration-300 p-0 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 ring-1 ring-slate-100 overflow-hidden">
                    <CardContent className="flex flex-col sm:flex-row items-center gap-6 py-3 px-4">
                      {/* Doctor Avatar Section */}
                      <div className="relative w-20 h-20 shrink-0">
                        <div className="absolute inset-0 bg-blue-600/10 rounded-[2rem] group-hover:scale-95 transition-transform" />
                        <Image
                          src={data?.doctorId?.profile || "/doc1.png"}
                          alt="doctor"
                          fill
                          sizes="px"
                          className="rounded-[2rem] object-cover p-1.5 transition-transform group-hover:scale-110"
                        />
                        <div className="absolute -bottom-1  -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-lg" />
                      </div>

                      {/* Professional Details */}
                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                          <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest px-2  bg-blue-50 rounded-full border border-blue-100">Confirmed Visit</span>
                          <span className="flex items-center gap-1 text-[8px] font-black text-amber-600 uppercase tracking-widest px-2 bg-amber-50 rounded-full border border-amber-100">
                            <Sparkles size={10} /> In-Hospital
                          </span>
                        </div>
                        
                        <h3 className="font-black text-slate-800 text-xl md:text-xl tracking-tighter uppercase mb-1 truncate">
                          Dr. {data?.doctorId?.userId?.name || "Specialist"}
                        </h3>
                        <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                          {data?.doctorId?.specialization || "Lead Physician"}
                        </p>

                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                          <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                            <div className="p-1.5 bg-slate-100 rounded-lg"><Calendar size={12} className="text-blue-500" /></div>
                            {formatDate(data?.date)}
                          </div>
                          <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                            <div className="p-1.5 bg-slate-100 rounded-lg"><Clock size={12} className="text-blue-500" /></div>
                            {data?.time}
                          </div>
                        </div>
                      </div>

                      {/* Contextual Actions */}
                      <div className="flex sm:flex-col items-center gap-3 pt-4 sm:pt-0 sm:pl-6 sm:border-l border-slate-100">
                        <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all active:scale-95 group/btn">
                          <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button className="p-3 bg-red-50 border border-red-100 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white shadow-sm transition-all active:scale-95 group/btn">
                          <Trash2 size={18} className="group-hover/btn:rotate-12 transition-transform" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
