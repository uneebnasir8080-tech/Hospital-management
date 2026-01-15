import React from "react";
import MedicineInventory from "@/components/MedicineInventory";

const InventoryPage = () => {
  return (
    <div className="bg-white  rounded-lg ">
      <div className="">
        {/* header  */}
        <div className="flex  justify-between px-10 h-15 border-b   items-center overflow-hidden ">
          <div className=" flex gap-5 font-medium  text-black/60 justify-end">
            <button
              className={`text-xs sm:text-sm lg:text-[16px] border-b-4 border-[#3497F9] text-black/80 tracking-wider py-2 pt-8`}
            >
              MEDICINE INVENTORY
            </button>
          </div>
          <div className=" ">
            <button className="bg-[#3497F9] hover:bg-[#3497F9] cursor-pointer text-xs px-2 rounded-sm text-white gap-1 flex items-center">
              <span className="text-[16px] lg:text-xl pb-1">+</span>{" "}
              <span className="hidden md:block">Add Product</span>
            </button>
          </div>
        </div>
        {/* pages  */}
        <MedicineInventory />
      </div>
    </div>
  );
};

export default InventoryPage;
