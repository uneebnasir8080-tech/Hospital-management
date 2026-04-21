"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ArrowRight, Zap } from 'lucide-react'

const tips = [
  { id: 1, img: "/tip1.png", title: "6 Powerful Exercises for Heart Health", category: "Fitness", read: "5 min" },
  { id: 2, img: "/tip2.png", title: "Superfoods for Mental Clarity & Energy", category: "Nutrition", read: "3 min" },
  { id: 3, img: "/tip1.png", title: "Sleep Hygiene: The Ultimate Recovery Guide", category: "Wellness", read: "10 min" },
  { id: 4, img: "/tip2.png", title: "The Anti-Inflammatory Diet Protocol", category: "Diet", read: "7 min" },
  { id: 5, img: "/tip1.png", title: "Micro-Workouts for Busy Professionals", category: "Fitness", read: "4 min" },
  { id: 6, img: "/tip2.png", title: "Hydration Hacks for Peak Performance", category: "Wellness", read: "2 min" },
]

const HomeTips = () => {

const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  
  return (
    <section className="py-8">
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
        {tips.map((data, index) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex-none w-72 snap-start group"
          >
            {/* Main Card */}
            <div className="relative h-80 w-full rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
              {/* Image Header */}
              <div className="relative h-[50%] overflow-hidden">
                 {mounted && data.img && (
                <Image
                  src={data.img}
                  alt={data.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={false}
                />
              )}
                <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-60" />
                
                {/* Float Category */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/40 backdrop-blur-md rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest text-slate-800">
                  <Zap size={10} className="text-amber-500 fill-amber-500" />
                  {data.category}
                </div>
              </div>

              {/* Content Box */}
              <div className="absolute bottom-0 inset-x-0 p-6 pt-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <Heart size={10} className="text-red-500" />
                    Medically Reviewed
                  </span>
                </div>
                <h4 className="font-black text-slate-800 text-base leading-snug tracking-tight uppercase group-hover:text-blue-600 transition-colors">
                  {data.title}
                </h4>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{data.read} read</span>
                  <button className="flex items-center gap-1.5 text-[11px] font-black text-blue-600 uppercase tracking-tighter group-active:translate-x-2 transition-transform">
                    Explore <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Action Hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg ring-4 ring-blue-500/10">
                  <Heart size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

     
    </section>
  )
}
export default HomeTips