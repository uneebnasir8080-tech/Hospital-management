"use client";
import MyAppointment from "@/components/MyAppointment";
import NewAppoint from "@/components/NewAppoint";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, CalendarCheck, Sparkles } from "lucide-react";

const DoctorPage = () => {
  const [isActive, setIsActive] = useState("old");

  const tabs = [
    { id: "old", label: "Book Appointment", icon: Stethoscope },
    { id: "new", label: "My Appointments", icon: CalendarCheck },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Sparkles size={18} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Specialized Care</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
              Doctor <span className="text-blue-600">Registry</span>
            </h1>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-[1.5rem] self-start md:self-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = isActive === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setIsActive(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all relative
                    ${isSelected ? "text-white" : "text-slate-400 hover:text-slate-600"}
                  `}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon size={16} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={isActive}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40"
        >
          {isActive === "new" ? <MyAppointment /> : <NewAppoint />}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorPage;
