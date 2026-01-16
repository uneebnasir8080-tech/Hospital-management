import AdminTable from "@/components/AdminTable";
import DashAppointment from "@/components/DashAppointment";
import EducationContent from "@/components/EducationContent";
import Graph from "@/components/Graph";
import PaymentFee from "@/components/PaymentFee";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-scroll modern-scroll">
      <div className="flex gap-5 space-y-3 flex-col lg:flex-row">
        {/* total appointments  */}
        <div className=" bg-white max-h-60 mx-5 sm:mx-20 lg:mx-0 xl:max-h-65 min-h-60 xl:min-h-65 flex-1 rounded-md ">
          <DashAppointment />
        </div>
        {/* table  */}
        <div className=" bg-white max-h-60 xl:max-h-65 min-h-60 xl:min-h-65 flex-2 rounded-md">
          <AdminTable />
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row mt-10 lg:mt-0">
        {/* education content  */}
        <div className=" bg-white min-h-50 mx-5 sm:mx-20 lg:mx-0 xl:min-h-65 max-h-50 xl:max-h-65 overflow-y-scroll modern-scroll flex-1 rounded-md">
          <EducationContent />
        </div>
        {/* graph */}
        <div className=" bg-white min-h-50 mx-5 sm:mx-20 lg:mx-0 xl:min-h-65 max-h-50 xl:max-h-65 flex-1 rounded-md">
          <Graph />
        </div>
        {/* fees  */}
        <div className=" bg-white min-h-50 mx-5 sm:mx-20 lg:mx-0 xl:min-h-65 max-h-50 xl:max-h-65 overflow-y-scroll modern-scroll flex-1 rounded-md">
          <PaymentFee />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
