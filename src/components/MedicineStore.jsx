"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "./ui/card";
import { Search, ShoppingCart, Heart, Star, Package, Star as StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMedicines } from "@/services/patient/partientApi";

const MedicineStore = () => {
  const { status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Prescription", "OTC", "Supplements", "First Aid"];

  const { data, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: getMedicines,
    enabled: status === "authenticated",
  });

  const medicines = data?.medicine || [];

  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => 
      (med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       med.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "All" || med.category === category)
    );
  }, [medicines, searchTerm, category]);

  return (
    <div className="space-y-10">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between px-2">
        <div className="relative w-full lg:max-w-xl group">
          <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all" />
          <input 
            type="text" 
            placeholder="Search for medicines, health products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-none rounded-[2rem] py-5 pl-14 pr-6 text-sm font-bold text-slate-700 shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0
                ${category === cat 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                  : "bg-white text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-2 max-h-[60vh] overflow-y-auto modern-scroll pr-4">
        <AnimatePresence>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="border-none bg-white rounded-[2.5rem] shadow-xl shadow-slate-100 h-80 animate-pulse overflow-hidden">
                  <div className="h-48 bg-slate-100" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-slate-100 rounded-full w-2/3" />
                    <div className="h-3 bg-slate-50 rounded-full w-1/3" />
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : filteredMedicines.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Package size={40} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">No medicines found in this section</p>
            </div>
          ) : (
            filteredMedicines.map((med, index) => (
              <motion.div
                key={med._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group relative border-none bg-white hover:bg-slate-50 transition-all duration-500 rounded-[2.5rem] shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden text-center flex flex-col items-center p-6">
                  {/* Image Container */}
                  <Link href={`/user/medicine/${med._id}`} className="relative w-full aspect-square mb-6 overflow-hidden rounded-[2rem]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 transition-transform duration-700 group-hover:scale-110" />
                    <Image
                      src={med.images?.[0] || "/med1.png"}
                      alt={med.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-contain p-8 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                    />
                    
                    {/* Discount Badge */}
                    {med.discount && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                        -{med.discount}%
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="w-full space-y-2 mb-6">
                    <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon key={s} size={10} fill={s <= 4 ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <Link href={`/user/medicine/${med._id}`}>
                      <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {med.name}
                      </h3>
                    </Link>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {med.milligrams} MG • {med.usageType || "ORAL"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="w-full border-t border-slate-100/60 pt-6 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1 line-through">${(med.price * 1.2).toFixed(2)}</p>
                      <p className="text-xl font-black text-slate-800 leading-none">${med.price}</p>
                    </div>
                    
                    <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-90 group/btn">
                      Add <ShoppingCart size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Hover Quick View Overlay */}
                  <button className="absolute top-6 left-6 p-2 bg-white/80 backdrop-blur-md rounded-xl text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={16} />
                  </button>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MedicineStore;
