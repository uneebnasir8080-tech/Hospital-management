"use client";
import { FaBell, FaBars } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/lib/apiCall";
import Image from "next/image";

const AdminNavbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [image, setImage] = useState("/doc1.png"); // backup image
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const pageName = pathname.split("/").filter(Boolean).pop();

  const getData = async () => {
    try {
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      const userData = res?.data?.data;

      setName(userData?.name || "");
      setRole(userData?.role || "");

      const profileImage = userData?.doctor?.profile;
      if (profileImage) {
        setImage(profileImage);
      }
    } catch (err) {
      console.error("Navbar user fetch error:", err);
    }
  };

  useEffect(() => {
    if (status !== "authenticated") return;
    getData();
  }, [status]);

  return (
    <div className="flex justify-between px-10 items-center h-[12%]">
      {/* LEFT */}
      <div className="flex gap-4 items-center">
        <button className="md:hidden cursor-pointer">
          <FaBars />
        </button>
        <p className="font-semibold text-[#374858] text-md sm:text-lg lg:text-2xl capitalize">
          {pageName}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3 items-center">
        <div className="rounded-full p-1 relative cursor-pointer hidden sm:block">
          <FaBell className="text-lg md:text-xl lg:text-2xl text-[#9094AF]" />
          <div className="bg-red-500 absolute p-0.5 rounded-full top-1/6 right-1/4"></div>
        </div>

        <div className="flex items-center gap-2">
          {/* Profile Image */}
          <div className="h-10 w-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden">
            <Image
              src={image}
              alt="profile"
              fill
              className="object-cover rounded-full"
              onError={() => setImage("/avatar.png")}
            />
          </div>

          {/* Name & Role */}
          <div className="hidden md:block">
            <p className="font-medium text-md lg:text-lg capitalize">
              {name || "John Smith"}
            </p>
            <p className="text-xs lg:text-sm text-gray-500 capitalize">
              {role || "Role"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
