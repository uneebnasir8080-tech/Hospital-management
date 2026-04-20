"use client";
import React from 'react';
import { MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const ChatPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-6'>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center text-blue-600 mb-8 shadow-2xl shadow-blue-500/10"
      >
        <MessageSquare size={40} />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase mb-4 leading-none">
          Select a Conversation
        </h1>
        <p className="text-slate-400 font-bold text-sm tracking-wide mb-10 max-w-md mx-auto line-relaxed uppercase">
          Choose a doctor from the sidebar to start your secure medical consultation. Our experts are here to assist you.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl"><ShieldCheck size={20} /></div>
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest leading-none">End-to-End Encrypted</span>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-3">
            <div className="p-2 bg-pink-50 text-pink-500 rounded-xl"><Heart size={20} /></div>
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest leading-none">Compassionate Care</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPage;