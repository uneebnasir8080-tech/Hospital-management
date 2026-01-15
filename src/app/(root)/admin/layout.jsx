import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex max-h-screen">
      <AdminSidebar />
      <div className="w-full flex flex-col min-h-screen bg-blue-100">
        <AdminNavbar />
        <div className="py-3 px-4 flex-1 max-h-[88%] overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
  
export default layout;
