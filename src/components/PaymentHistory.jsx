"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, CreditCard, Calendar, ArrowUpRight, DollarSign, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const historyData = [
  {
    date: "November 28, 2025",
    payments: [
      { amount: "120.00", desc: "Specialist Consultation", type: "Doctor Fee", time: "10:30 AM", status: "Completed" },
      { amount: "45.50", desc: "Amoxicillin 500mg (30 Caps)", type: "Pharmacy", time: "02:15 PM", status: "Completed" },
    ],
  },
  {
    date: "November 15, 2025",
    payments: [
      { amount: "85.00", desc: "Routine Check-up", type: "General Fee", time: "09:00 AM", status: "Completed" },
    ],
  },
];

const PaymentHistory = ({ onClose, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpen}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-800 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Payments</h2>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CreditCard size={20} />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto no-scrollbar space-y-10 pr-2">
          {historyData.map((day, dIdx) => (
            <div key={dIdx} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] whitespace-nowrap">{day.date}</span>
                <div className="h-px bg-slate-100 grow" />
              </div>
              
              <div className="space-y-3">
                {day.payments.map((pay, pIdx) => (
                  <div 
                    key={pIdx}
                    className="group flex items-center justify-between p-5 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 rounded-3xl transition-all duration-300 border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-sm uppercase tracking-tight mb-0.5">{pay.desc}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{pay.type}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pay.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-black text-lg text-slate-800 leading-none mb-1">${pay.amount}</p>
                      <div className="flex items-center justify-end gap-1.5 text-emerald-600">
                        <span className="text-[9px] font-black uppercase tracking-widest leading-none">Paid</span>
                        <div className="w-1 h-1 bg-emerald-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <button className="w-full py-5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group">
            Download Invoices <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentHistory;

