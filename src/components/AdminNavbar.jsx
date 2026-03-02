// AdminNavbar.jsx
import React from "react";
import Image from "next/image";
import { FaBell, FaBars } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import  api  from "@/lib/apiCall";
import PathProvider from "./PathProvider";

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

  // Page name from pathname
  // const pageName = path.split("/").filter(Boolean).pop() || "";
  // console.log("first", path);
  const profileImage = user?.doctor?.profile || "/doc1.png";
  const name = user?.name || "Name";
  const role = user?.role || "Role";

  return (
    <div className="flex justify-between px-10 items-center h-[12%]">
      {/* LEFT */}
      <div className="flex gap-4 items-center">
        <button className="md:hidden cursor-pointer">
          <FaBars />
        </button>
        <p className="font-semibold text-[#374858] text-md sm:text-lg lg:text-2xl capitalize">
          <PathProvider/>
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3 items-center">
        <div className="rounded-full p-1 relative cursor-pointer hidden sm:block">
          <FaBell className="text-lg md:text-xl lg:text-2xl text-[#9094AF]" />
          <div className="bg-red-500 absolute p-0.5 rounded-full top-1/6 right-1/4"></div>
        </div>

        <div className="flex items-center gap-2 w-40 justify-center">
          {/* Profile Image */}
          <div className="h-10 w-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden">
            <Image
              src={profileImage}
              alt="profile"
              fill
              className="object-cover rounded-full"
            />
          </div>

          {/* Name & Role */}
          <div className="hidden md:block ">
            <p className="font-medium text-md lg:text-lg capitalize">{name}</p>
            <p className="text-xs lg:text-sm text-gray-500 capitalize">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
