"use client";

import Image from "next/image";
import React, { useState } from "react";
import { 
  Menu, 
  PhoneCall, 
  Edit3, 
  Wallet, 
  Mail, 
  User, 
  Calendar, 
  Droplet, 
  FileText,
  ChevronRight,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileModal from "@/components/ProfileModal";
import PatientProfile from "@/components/PatientProfile";

const ClientProfile = ({ resData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const profileImage = resData?.patient?.profile?.trim() || "/doc1.png";

  const infoItems = [
    { icon: <Mail size={20} />, label: "Email ID", value: resData?.email || "example@gmail.com" },
    { icon: <Calendar size={20} />, label: "Age", value: `${calculateAge(resData?.patient?.age) ?? "N/A"} years` },
    { icon: <User size={20} />, label: "Gender", value: resData?.patient?.gender || "Male" },
    { icon: <Droplet size={20} />, label: "Blood Group", value: resData?.patient?.blood || "A+" },
    { icon: <FileText size={20} />, label: "Medical History", value: resData?.patient?.history || "No records" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* ---------------- HEADER ---------------- */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Patient Profile</h1>
          <button 
            onClick={() => setIsOpen(true)}
            className="p-3 hover:bg-slate-50 rounded-2xl transition-all active:scale-95"
          >
            <Menu size={24} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* ---------------- SCROLLABLE CONTENT ---------------- */}
      <div className="flex-1 overflow-y-auto px-6 pb-20 pt-8 modern-scroll">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* ---------------- PROFILE CARD ---------------- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Background Decorative Element */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-2xl shadow-blue-200" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-sm" />
              </div>

              {/* Name & Quick Info */}
              <div className="flex-1 text-center md:text-left text-white space-y-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                    {resData?.name || "John Doe"}
                  </h2>
                  <p className="text-blue-100 font-medium text-lg flex items-center justify-center md:justify-start gap-2 mt-2">
                    <PhoneCall size={18} />
                    {resData?.phone || "+1 234 567 890"}
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                    Official Member
                  </span>
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                    {resData?.patient?.blood || "A+"} Group
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button 
                onClick={() => setIsActive(!isActive)}
                className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all active:scale-95"
              >
                <Edit3 size={24} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ---------------- PERSONAL INFO ---------------- */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  {infoItems.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="font-bold text-slate-700 capitalize">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ---------------- WALLET & ACTIONS ---------------- */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Wallet Card */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                
                <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <Wallet size={24} className="text-blue-600" />
                  Wallet
                </h3>

                <div className="space-y-6 relative">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                    <p className="text-4xl font-black text-slate-800">$500.00</p>
                  </div>
                  
                  <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-2xl font-bold transition-all group/btn">
                    <span className="flex items-center gap-3">
                      <Plus size={20} />
                      Recharge Account
                    </span>
                    <ChevronRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Quick Actions Placeholder */}
              <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white">
                <h4 className="font-bold text-lg mb-4">Patient Support</h4>
                <p className="text-slate-400 text-sm mb-6">Need assistance with your records or appointments?</p>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all">
                  Contact Help Desk
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------------- MODALS ---------------- */}
      <AnimatePresence>
        {isOpen && <ProfileModal onClose={() => setIsOpen(false)} />}
        {isActive && (
          <PatientProfile
            onClose={() => setIsActive(false)}
            response={resData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientProfile;