import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="w-full flex flex-col h-screen bg-blue-100">
        <div className="shrink-0">
          <AdminNavbar />
        </div>
        <div className="py-3 px-4 flex-1 overflow-y-auto modern-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};
  
export default layout;
