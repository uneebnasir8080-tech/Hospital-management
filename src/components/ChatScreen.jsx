"use client";
import React from "react";
import { useStore } from "@/store/store";
import { 
  Smile, 
  Paperclip, 
  Send, 
  MoreVertical, 
  Phone, 
  Video,
  ArrowLeft,
  Circle
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const text = [
  {
    id: 1,
    msg: "hello",
    time: "11:20pm",
  },
  {
    id: 2,
    msg: "hey",
    time: "11:23pm",
  },
  {
    id: 3,
    msg: "jje",
    time: "11:24pm",
  },
  {
    id: 4,
    msg: "agya",
    time: "11:10pm",
  },
  {
    id: 5,
    msg: "ee",
    time: "11:20pm",
  },
  {
    id: 1,
    msg: "hello",
    time: "11:20pm",
  },
  {
    id: 2,
    msg: "hey",
    time: "11:23pm",
  },
  {
    id: 3,
    msg: "jje",
    time: "11:24pm",
  },
  {
    id: 4,
    msg: "agya",
    time: "11:10pm",
  },
  {
    id: 5,
    msg: "ejjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    time: "11:20pm",
  },
  {
    id: 1,
    msg: "hello",
    time: "11:20pm",
  },
  {
    id: 2,
    msg: "hey",
    time: "11:23pm",
  },
  {
    id: 3,
    msg: "jje",
    time: "11:24pm",
  },
  {
    id: 4,
    msg: "agya",
    time: "11:10pm",
  },
  {
    id: 5,
    msg: "ee",
    time: "11:20pm",
  },
];

const ChatScreen = () => {
  const open = useStore((state) => state.openScreen);

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
      {/* Interactive Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "url('/Chat.png')", backgroundSize: '400px' }} />

      {/* Modern Header */}
      <div className="relative flex justify-between px-6 py-4 bg-white border-b border-gray-100 items-center z-10">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all" onClick={open}>
            <ArrowLeft className="text-gray-500" size={20} />
          </button>
          
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
              <Image src="/doc1.png" width={48} height={48} className="object-cover" alt="Profile" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
          </div>

          <div>
            <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight">
              Elizabeth Polson
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] md:text-[11px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                Active Now
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <Phone size={20} />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Video size={20} />
          </button>
          <div className="w-px h-6 bg-gray-100 mx-1" />
          <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Clean Chat Section */}
      <div className="flex-1 flex flex-col-reverse px-6 py-4 overflow-y-auto modern-scroll relative z-10">
        <div className="space-y-4">
          <AnimatePresence>
            {text.map((data, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={index}
                className={`flex group ${data.id % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] md:max-w-[70%] space-y-1`}>
                  <div className={`
                    px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${data.id % 2 === 0 
                      ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none" 
                      : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200/50"}
                  `}>
                    {data.msg}
                  </div>
                  <p className={`text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity px-1 ${
                    data.id % 2 === 0 ? "text-right text-gray-400" : "text-left text-gray-400"
                  }`}>
                    {data.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Elevated Input */}
      <div className="p-4 bg-white border-t border-gray-100 z-10">
        <div className="bg-gray-50/80 backdrop-blur-md rounded-[2rem] border border-gray-200/50 p-2 flex items-center gap-2 pr-4 shadow-inner">
          <button className="p-2.5 text-gray-400 hover:text-yellow-500 transition-colors">
            <Smile size={22} />
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none py-2 px-1 text-sm text-gray-700 placeholder:text-gray-400"
            placeholder="Write a message..."
          />
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors">
              <Paperclip size={20} />
            </button>
            <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 group">
              <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
