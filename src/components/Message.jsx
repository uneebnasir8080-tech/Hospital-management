"use client";
import React, { useState } from "react";
import { useStore } from "@/store/store";
import { Search, ChevronDown, CheckCheck, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const data = [
  {
    id: 1,
    img: "/doc1.png",
    title: "Dr. John Paulliston",
    desc: "I've reviewed the lab results.",
    time: "9:00 AM",
    online: true,
    unread: 2,
  },
  {
    id: 2,
    img: "/doc2.png",
    title: "Sarah Mitchell",
    desc: "Sent attachment: report.pdf",
    time: "Yesterday",
    online: false,
    unread: 0,
  },
  {
    id: 3,
    img: "/doc3.png",
    title: "David Chen",
    desc: "Can we reschedule?",
    time: "Monday",
    online: true,
    unread: 0,
  },
  // ... adding more for scrolling test
  {
    id: 4,
    img: "/doc1.png",
    title: "Dr. Elena Rodriguez",
    desc: "The prescription is ready.",
    time: "10:30 AM",
    online: true,
    unread: 1,
  },
  {
    id: 5,
    img: "/doc1.png",
    title: "Dr. Elena Rodriguez",
    desc: "The prescription is ready.",
    time: "10:30 AM",
    online: true,
    unread: 1,
  },
  {
    id: 6,
    img: "/doc1.png",
    title: "Dr. Elena Rodriguez",
    desc: "The prescription is ready.",
    time: "10:30 AM",
    online: true,
    unread: 1,
  },
  {
    id: 7,
    img: "/doc1.png",
    title: "Dr. Elena Rodriguez",
    desc: "The prescription is ready.",
    time: "10:30 AM",
    online: true,
    unread: 1,
  },
];

const Message = () => {
  const [click, setClick] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const open = useStore((state) => state.msgScreen);
  const close = useStore((state) => state.openScreen);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="h-full bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
      {/* Search Header */}
      <div className="p-6 border-b border-gray-50 bg-gray-50/30">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto modern-scroll p-4">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item.id}
                onClick={() => setClick(item.id)}
                className={`relative flex items-center gap-4 p-4 rounded-[1.5rem] cursor-pointer transition-all ${
                  click === item.id
                    ? "bg-blue-600 shadow-xl shadow-blue-500/20"
                    : "hover:bg-gray-50 active:scale-[0.98]"
                }`}
              >
                {/* Avatar with Status */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-2xl overflow-hidden shadow-sm border-2 ${click === item.id ? "border-blue-400" : "border-white"}`}
                  >
                    <Image
                      src={item.img}
                      fill
                      className="object-cover"
                      alt={item.title}
                    />
                  </div>
                  {item.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3
                      className={`font-bold text-sm truncate ${click === item.id ? "text-white" : "text-gray-800"}`}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`text-[10px] font-medium ${click === item.id ? "text-blue-100" : "text-gray-400"}`}
                    >
                      {item.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <p
                      className={`text-xs truncate max-w-[140px] ${click === item.id ? "text-blue-50" : "text-gray-500"}`}
                    >
                      {item.desc}
                    </p>
                    {item.unread > 0 && click !== item.id ? (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg h-5 min-w-[20px] flex items-center justify-center">
                        {item.unread}
                      </span>
                    ) : (
                      <CheckCheck
                        size={14}
                        className={`${click === item.id ? "text-blue-200" : "text-gray-300"}`}
                      />
                    )}
                  </div>
                </div>

                {/* Active Indicator */}
                {click === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-1 w-1.5 h-8 bg-white rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Message;
