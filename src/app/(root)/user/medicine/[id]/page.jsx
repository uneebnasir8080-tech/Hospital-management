"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, Heart, Star, ChevronLeft, ShieldCheck, Truck, RotateCcw, Plus, Minus, Share2 } from "lucide-react";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import { motion, AnimatePresence } from "framer-motion";

const SinglePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [qty, setQty] = useState(1);
    const [liked, setLiked] = useState(false);

    const getMedicineDetails = useCallback(async () => {
        try {
            if (!session?.token) return;
            setLoading(true);
            const res = await api.get(`/patient/medicine/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            setMedicine(res?.data?.medicine);
        } catch (error) {
            console.error("Medicine Detail Fetch Error:", error);
            showToast("error", "Failed to fetch medicine details");
        } finally {
            setLoading(false);
        }
    }, [id, session?.token]);

    useEffect(() => {
        if (status === "authenticated") {
            getMedicineDetails();
        }
    }, [status, getMedicineDetails]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Details...</p>
                </div>
            </div>
        );
    }

    if (!medicine) return null;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 lg:p-16">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors"
                >
                    <ChevronLeft size={16} /> Back to Pharmacy
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left: Gallery Section */}
                    <div className="space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square bg-white rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-indigo-50/50" />
                            <Image
                                src={medicine.images?.[activeImage] || "/medi3.png"}
                                alt={medicine.name}
                                fill
                                className="object-contain p-12 lg:p-20 transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            
                            {/* Action Floating Buttons */}
                            <div className="absolute top-8 right-8 flex flex-col gap-3">
                                <button 
                                    onClick={() => setLiked(!liked)}
                                    className={`p-3 rounded-2xl shadow-lg transition-all active:scale-90 ${liked ? "bg-red-500 text-white" : "bg-white text-slate-400"}`}
                                >
                                    <Heart size={20} fill={liked ? "currentColor" : "none"} />
                                </button>
                                <button className="p-3 bg-white text-slate-400 rounded-2xl shadow-lg hover:text-blue-600 transition-all active:scale-90">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </motion.div>

                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {medicine.images?.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-blue-600 scale-95 shadow-lg shadow-blue-500/20" : "border-transparent bg-white opacity-60 hover:opacity-100"}`}
                                >
                                    <Image src={img} alt="" fill className="object-contain p-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">In Stock</span>
                                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                    <ShieldCheck size={12} /> Authenticity Verified
                                </span>
                            </div>
                            
                            <h1 className="text-4xl lg:text-5xl font-black text-blue-600 tracking-tighter uppercase mb-4 leading-none text-blue-600">
                                {medicine.name}
                            </h1>
                            
                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-1 text-amber-500">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill={s <= 4 ? "currentColor" : "none"} />)}
                                    <span className="text-slate-400 text-xs font-bold ml-2">(120 Reviews)</span>
                                </div>
                                <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{medicine.category || "General Health"}</p>
                            </div>

                            <p className="text-slate-500 font-bold text-lg leading-relaxed mb-10 max-w-xl">
                                {medicine.description || "Premium healthcare formulation designed for maximum efficacy and rapid absorption."}
                            </p>

                            <div className="flex items-end gap-4 mb-10">
                                <span className="text-4xl lg:text-5xl font-black text-slate-800 leading-none">${medicine.price}</span>
                                <span className="text-xl font-bold text-slate-300 line-through leading-none mb-1">${(medicine.price * 1.2).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Order Controls */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
                                    <button 
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-12 text-center font-black text-lg text-slate-800">{qty}</span>
                                    <button 
                                        onClick={() => setQty(qty + 1)}
                                        className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-600 transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                
                                <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 py-5 bg-slate-900 hover:bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 group">
                                    Add to Cart <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <div className="p-2.5 bg-slate-100 rounded-2xl"><Truck size={20} className="text-slate-600" /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Free Express Shipping</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <div className="p-2.5 bg-slate-100 rounded-2xl"><RotateCcw size={20} className="text-slate-600" /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">30-Day Easy Returns</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <div className="p-2.5 bg-slate-100 rounded-2xl"><ShieldCheck size={20} className="text-slate-600" /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">100% Genuine Secure</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;

