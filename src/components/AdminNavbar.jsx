// AdminNavbar.jsx
import React from "react";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { api } from "@/lib/apiCall";
import PathProvider from "./PathProvider";
import MobileSidebarToggle from "./MobileSidebarToggle";
import Link from "next/link";

const AdminNavbar = async () => {
  // Get session on server
  const session = await getServerSession(authOptions);

  // Default values
  let user = null;

  if (session?.id && session?.token) {
    try {
      const res = await api.get("/user", {
        params: { userId: session.id },
        headers: { Authorization: `Bearer ${session.token}` },
      });
      user = res?.data?.data || null;
    } catch (err) {
      console.error("User fetch error:", err.response?.data || err.message);
    }
  }

  const profileImage = user?.doctor?.profile || "/doc1.png";
  const name = user?.name || "User";
  const role = user?.role || "Administrator";

  return (
    <div className="flex justify-between px-6 md:px-10 items-center h-20 md:h-24 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100/50">
      {/* LEFT */}
      <div className="flex gap-6 items-center">
        <MobileSidebarToggle />
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">
            Current View
          </p>
          <h1 className="font-extrabold text-[#1e293b] text-xl md:text-2xl lg:text-3xl capitalize tracking-tight">
            <PathProvider />
          </h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2 items-center">
        {/* Notifications */}
        <div className="relative group p-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer">
          <Bell
            size={22}
            className="text-gray-500 group-hover:text-blue-600 transition-colors"
          />
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full transition-transform group-hover:scale-110" />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-4 md:pl-8 md:border-l border-gray-100">
          <div className="hidden md:block text-right">
            <p className="font-bold text-gray-800 text-sm lg:text-base leading-none capitalize">
              {name}
            </p>
            <p className="text-[11px] lg:text-xs font-semibold text-blue-500/80 mt-1 uppercase tracking-wider">
              {role}
            </p>
          </div>

          <div className="relative group">
            <Link rel="stylesheet" href="/admin/setting" >
            <div className="w-11 h-11 md:w-13 md:h-13  overflow-hidden border-white  transition-all transform active:scale-95">
              <Image
                src={profileImage}
                alt="profile"
                fill
                className="object-cover transition-transform group-hover:scale-110 rounded-full"
              />
            </div>
            </Link>
            {/* Online Indicator */}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
