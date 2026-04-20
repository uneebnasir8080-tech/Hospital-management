"use client";

import React from "react";
import { ShoppingBag, Package, Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const medicine = [
  {
    id: 1,
    img: "/med1.png",
    title: "Prescription Drugs",
    subtitle: "Verified pharmacy stock",
    icon: ShoppingBag,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    img: "/med2.png",
    title: "First Aid Kits",
    subtitle: "Complete emergency kits",
    icon: Package,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 3,
    img: "/med1.png",
    title: "Daily Vitamins",
    subtitle: "Boost your immunity",
    icon: Plus,
    color: "from-orange-500 to-amber-600"
  },
  {
    id: 4,
    img: "/med2.png",
    title: "Baby Care",
    subtitle: "Safe & gentle products",
    icon: Package,
    color: "from-rose-500 to-pink-600"
  },
];

const HomeMedicine = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
      {medicine.map((data, index) => {
        const Icon = data.icon;
        return (
          <motion.a
            key={index}
            href="/user/medicine"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-48 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${data.color} opacity-10 rounded-bl-[4rem] group-hover:scale-[2.5] transition-transform duration-700`} />
            
            <div className="relative h-full p-8 flex flex-col justify-between z-10">
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-black text-slate-800 text-lg tracking-tight leading-tight uppercase underline-offset-4 decoration-blue-500/30 group-hover:underline">
                  {data.title}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {data.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">Shop Now</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* Float Image */}
            <div className="absolute -bottom-4 right-4 w-24 h-24 opacity-20 filter grayscale blur-[1px] group-hover:opacity-40 group-hover:grayscale-0 group-hover:blur-0 transition-all duration-500 transform group-hover:-translate-y-4">
              <img src={data.img} alt="" className="w-full h-full object-contain rotate-12" />
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};

export default HomeMedicine;
