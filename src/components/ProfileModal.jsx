"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Settings, Activity, History, CreditCard, ChevronRight, X, Shield, Bell } from "lucide-react";
import PaymentHistory from "./PaymentHistory";
import { motion, AnimatePresence } from "framer-motion";

const ProfileModal = ({ onClose }) => {
  const [currentView, setCurrentView] = useState("menu");

  const menuItems = [
    { icon: <Activity size={20} />, label: "My Activity", count: 12, color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <Settings size={20} />, label: "Settings", color: "text-slate-600", bg: "bg-slate-50" },
    { icon: <History size={20} />, label: "Payment History", onClick: () => setCurrentView("history"), color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: <Bell size={20} />, label: "Notifications", count: 3, color: "text-amber-600", bg: "bg-amber-50" },
    { icon: <Shield size={20} />, label: "Privacy & Security", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      <AnimatePresence mode="wait">
        {currentView === "menu" ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Menu</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="w-full group flex items-center justify-between p-4 hover:bg-white rounded-2xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`p-3 ${item.bg} ${item.color} rounded-xl transition-transform group-hover:scale-110`}>
                        {item.icon}
                      </div>
                      <span className="font-bold text-slate-700 uppercase tracking-widest text-xs">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      {item.count && (
                        <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                    </div>

                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Subscription</p>
                    <p className="text-xs font-black text-slate-800 uppercase">Premium Member</p>
                  </div>
                </div>
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">Manage Plan</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <PaymentHistory key="history" onOpen={() => setCurrentView("menu")} onClose={onClose} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileModal;

