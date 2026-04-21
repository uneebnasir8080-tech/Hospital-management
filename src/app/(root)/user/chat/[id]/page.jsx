"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, Camera, Paperclip, MoreHorizontal, Phone, Video, Smile, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockedMessages = [
  { id: 1, sender: "doctor", msg: "Hello! How can I help you today?", time: "10:30 AM" },
  { id: 2, sender: "user", msg: "Hi Doctor, I've been feeling a bit dizzy lately.", time: "10:32 AM" },
  { id: 3, sender: "doctor", msg: "I see. Have you noticed any other symptoms like headache or nausea?", time: "10:35 AM" },
  { id: 4, sender: "user", msg: "Yes, a slight headache in the mornings.", time: "10:36 AM" },
  { id: 5, sender: "doctor", msg: "Let's schedule a quick check-up. Are you available tomorrow?", time: "10:40 AM" },
];

const ChatId = () => {
  const [messages, setMessages] = useState(mockedMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: "user",
      msg: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-slate-50/50 relative overflow-hidden">
      {/* Immersive Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 md:p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl overflow-hidden bg-blue-50 border-2 border-white shadow-md">
              <Image src="/doc1.png" fill className="object-cover" alt="Doctor" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
          </div>
          <div>
            <h3 className="font-black text-slate-800 text-sm md:text-sm uppercase tracking-tight">Dr. John Paulliston</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Online now</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden sm:flex p-2.5 bg-slate-50 hover:bg-white hover:text-blue-600 text-slate-400 rounded-xl transition-all shadow-sm">
            <Phone size={18} />
          </button>
          <button className="hidden sm:flex p-2.5 bg-slate-50 hover:bg-white hover:text-blue-600 text-slate-400 rounded-xl transition-all shadow-sm">
            <Video size={18} />
          </button>
          <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />
          <button className="p-2.5 bg-slate-50 hover:bg-white hover:text-blue-600 text-slate-400 rounded-xl transition-all shadow-sm">
            <Search size={18} />
          </button>
          <button className="p-2.5 bg-slate-50 hover:bg-white hover:text-blue-600 text-slate-400 rounded-xl transition-all shadow-sm">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 flex flex-col pt-8"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex w-full ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex flex-col max-w-[80%] md:max-w-[65%] ${m.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`
                 p-3 rounded-[2rem] text-[12px] font-bold leading-relaxed shadow-sm
                  ${m.sender === "user" 
                    ? "bg-slate-900 text-white rounded-tr-none shadow-slate-200" 
                    : "bg-white text-slate-700 rounded-tl-none border border-slate-100"}
                `}>
                  {m.msg}
                </div>
                <div className="mt-2 flex items-center gap-2 px-2">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{m.time}</span>
                  {m.sender === "user" && <CheckCheck size={12} className="text-blue-400" />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-2 bg-transparent sticky bottom-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white border border-slate-100 p-1.5 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
          <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-full transition-all shrink-0">
            <Paperclip size={20} />
          </button>
          
          <input 
            type="text" 
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 px-2"
          />

          <div className="flex items-center gap-1 shrink-0">
            <button className="hidden sm:flex p-3 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-full transition-all">
              <Smile size={20} />
            </button>
            <button className="hidden sm:flex p-3 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-full transition-all">
              <Camera size={20} />
            </button>
            <button 
              onClick={handleSend}
              className="p-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-full transition-all shadow-lg active:scale-95 group"
            >
              <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCheck = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 7 17l-5-5" />
    <path d="m22 10-7.5 7.5L13 16" />
  </svg>
);

export default ChatId;

