import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full flex flex-col h-screen bg-blue-100">
        <AdminNavbar />
        <div className="py-3 px-4 flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
