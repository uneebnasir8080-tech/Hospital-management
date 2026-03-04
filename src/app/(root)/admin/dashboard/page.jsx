import AdminTable from "@/components/AdminTable";
import DashAppointment from "@/components/DashAppointment";
import EducationContent from "@/components/EducationContent";
import Graph from "@/components/Graph";
import PaymentFee from "@/components/PaymentFee";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto modern-scroll">
      <div className="flex gap-3 space-y-3 flex-col lg:flex-row">
        {/* total appointments  */}
        <div className="bg-white h-67 mx-5 sm:mx-10 lg:mx-0 flex-1 rounded-md overflow-hidden">
          <DashAppointment />
        </div>
        {/* table  */}
        <div className="bg-white h-67 flex-2 rounded-md overflow-hidden">
          <AdminTable />
        </div>
      </div>
      <div className="flex gap-3 flex-col lg:flex-row mt-10 lg:mt-0">
        {/* education content  */}
        <div className="bg-white h-75 mx-5 sm:mx-10 lg:mx-0 flex-1 rounded-md overflow-auto">
          <EducationContent />
        </div>
        {/* graph */}
        <div className="bg-white h-75 mx-5 sm:mx-10 lg:mx-0 flex-1 rounded-md overflow-hidden">
          <Graph />
        </div>
        {/* fees  */}
        <div className="bg-white h-75 mx-5 sm:mx-10 lg:mx-0 flex-1 rounded-md overflow-auto">
          <PaymentFee />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
