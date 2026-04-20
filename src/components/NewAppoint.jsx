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
import { UserCheck, Star, Clock, ChevronRight, Loader2, Search } from "lucide-react";

const NewAppoint = () => {
  const [docId, setDocId] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
      setDoctor(Array.isArray(doctors) ? doctors : []);
    } catch (error) {
      console.error("Doctor Fetch Error:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch doctors");
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
      (doc) => doc.doctor.id.toString() === docId.toString(),
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

  const filteredDoctors = doctor.filter(d => 
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.doctor?.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <p className="font-black text-slate-800 text-lg uppercase tracking-tight">
          Select Your Specialist
        </p>
        <div className="relative w-full sm:w-64 group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
        </div>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto modern-scroll pr-2">
        <AnimatePresence>
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`loading-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="border-none bg-slate-50 animate-pulse rounded-3xl h-32" />
              </motion.div>
            ))
          ) : filteredDoctors.length === 0 ? (
            <div className="col-span-full py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs italic">
              No matching specialists found
            </div>
          ) : (
            filteredDoctors.map((data, index) => {
              const isSelected = docId === data?.doctor?.id;
              return (
                <motion.div
                  key={data?.doctor?.id || index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    onClick={() => setDocId(data?.doctor?.id)}
                    className={`
                      relative cursor-pointer transition-all duration-300 rounded-[2rem] border-2 group
                      ${isSelected 
                        ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-500/20" 
                        : "bg-white border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/50"}
                    `}
                  >
                    <CardContent className="flex gap-5 items-center p-5">
                      {/* Image Container */}
                      <div className="relative w-24 h-24 shrink-0">
                        <div className={`absolute inset-0 rounded-2xl ${isSelected ? "bg-white/10" : "bg-slate-100"}`} />
                        <Image
                          src={data?.doctor?.profile || "/doc1.png"}
                          alt="Doctor"
                          fill
                          className={`rounded-2xl object-cover p-1 transition-transform group-hover:scale-110 ${isSelected ? "brightness-110" : ""}`}
                          sizes="96px"
                        />
                        <div className="absolute -top-1 -right-1 bg-amber-400 text-[8px] font-black text-white px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                          <Star size={8} fill="white" /> 4.9
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h1 className={`font-black text-lg capitalize truncate ${isSelected ? "text-white" : "text-slate-800"}`}>
                          Dr. {data?.name || "Specialist"}
                        </h1>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isSelected ? "text-blue-100" : "text-blue-600"}`}>
                          {data?.doctor?.specialization || "General Medicine"}
                        </p>
                        
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-wider ${isSelected ? "text-white/70" : "text-slate-400"}`}>
                            <Clock size={10} /> 10am - 4pm
                          </div>
                          {!isSelected && (
                            <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                          )}
                        </div>
                      </div>

                      {/* Selection Glow */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-[2rem] ring-4 ring-blue-500/20 animate-pulse pointer-events-none" />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Continue Action */}
      <div className="pt-4 border-t border-slate-100">
        <button
          disabled={!docId || loading}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-3 py-5 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Confirm & Continue <UserCheck size={18} className="group-hover:scale-125 transition-transform" />
            </>
          )}
        </button>
      </div>

      {isActive && <Booking docId={docId} onClose={() => setIsActive(false)} />}
    </div>
  );
};

export default NewAppoint;
