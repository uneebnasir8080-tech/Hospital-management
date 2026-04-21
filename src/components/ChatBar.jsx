"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MoreVertical, MessageSquare, Clock, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

const mockedUsers = [
  {
    id: 1,
    img: "/doc2.png",
    title: "Dr. John Paulliston",
    lastMsg: "Sent an attachment",
    time: "18m ago",
    online: true,
    unread: 2,
  },
  {
    id: 2,
    img: "/doc1.png",
    title: "Dr. Sarah Mitchell",
    lastMsg: "Your prescription is ready",
    time: "45m ago",
    online: false,
    unread: 0,
  },
  {
    id: 3,
    img: "/doc2.png",
    title: "Dr. Robert Wilson",
    lastMsg: "Please check the results",
    time: "2h ago",
    online: true,
    unread: 0,
  },
  {
    id: 4,
    img: "/doc1.png",
    title: "Dr. Emily Davis",
    lastMsg: "See you at the appointment",
    time: "1d ago",
    online: false,
    unread: 0,
  },
];

const ChatBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockedUsers.filter(u => 
    u.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white/40 backdrop-blur-xl border-r border-slate-100 w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Messages</h2>
          <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all" />
          <input 
            type="text" 
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-6">
        <div className="space-y-1">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/user/chat/${user.id}`}
                className="group flex gap-4 p-4 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative"
              >
                {/* Avatar Wrapper */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                    <Image
                      src={user.img}
                      width={50}
                      height={50}
                      alt={user.title}
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  {user.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-slate-800 text-xs truncate uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {user.title}
                    </h3>
                    <span className="text-[9px] font-bold text-slate-300 uppercase shrink-0">
                      {user.time}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className={`text-[10px] font-medium truncate ${user.unread > 0 ? "text-slate-900 font-bold" : "text-slate-400"}`}>
                      {user.lastMsg}
                    </p>
                    {user.unread > 0 ? (
                      <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md min-w-4.5 text-center">
                        {user.unread}
                      </span>
                    ) : (
                      <CheckCheck size={14} className="text-blue-400" />
                    )}
                  </div>
                </div>

                {/* Active Indicator Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-200">
              <MessageSquare size={32} />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBar;

