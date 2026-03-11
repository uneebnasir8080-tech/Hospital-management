"use client";
import React, { useState } from "react";
import MedicineInventory from "@/components/MedicineInventory";
import AddMedicineModal from "@/components/AddMedicineModal";

const InventoryPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddMedicine = (newMedicine) => {
    // In a real app, we'd refetch from API.
    // Here we'll trigger a refresh in the child component if needed,
    // but the child will handle its own local state for now as per plan.
    setRefreshKey((prev) => prev + 1);
  };

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
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#3497F9] hover:bg-[#2086e9] cursor-pointer text-xs px-4 py-1 rounded-lg text-white gap-2 flex items-center transition-all shadow-md shadow-blue-100"
            >
              <span className="text-[16px] lg:text-xl font-bold">+</span>{" "}
              <span className="hidden md:block font-medium">Add Product</span>
            </button>
          </div>
        </div>
        {/* pages  */}
        <MedicineInventory refreshKey={refreshKey} />
      </div>

      {showAddModal && (
        <AddMedicineModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMedicine}
        />
      )}
    </div>
  );
};

export default InventoryPage;
