import { FaSearch, FaRegEdit } from "react-icons/fa";
import React, { useState, useMemo } from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_DATA = [
  {
    id: 1,
    name: "Albuterol (salbutamol)",
    desc: "ALXSDHCCO",
    type: "Inhaler",
    price: 28.55,
    stock: 100,
    expiry: "01 Jun 2024",
    manu: "John's Health Care",
  },
  {
    id: 2,
    name: "Amoxicillin",
    desc: "AMX500MG",
    type: "Capsule",
    price: 15.2,
    stock: 250,
    expiry: "15 Aug 2024",
    manu: "Global Pharm",
  },
  {
    id: 3,
    name: "Lisinopril",
    desc: "LSN10MG",
    type: "Tablet",
    price: 12.0,
    stock: 180,
    expiry: "20 Dec 2024",
    manu: "LifeCare Labs",
  },
];

const MedicineInventory = ({ refreshKey }) => {
  const [medicines, setMedicines] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredData = useMemo(() => {
    return medicines.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.manu.toLowerCase().includes(searchTerm.toLowerCase());
      // Date filtering logic would go here if we had actual date objects
      return matchesSearch;
    });
  }, [medicines, searchTerm]);

  const handleDelete = (id) => {
    setMedicines((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="px-3 xl:px-5">
      {/* inputs  */}
      <div className="h-12 lg:h-15 xl:h-20 flex items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center rounded-xl bg-gray-50 border border-gray-100 px-4 py-2.5 w-64 lg:w-80 transition-all focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50">
            <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name or manufacturer..."
              className="outline-none w-full bg-transparent text-gray-600 placeholder-gray-400 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="hidden sm:block">
            <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
          </div>
        </div>
        <div className="text-sm text-gray-400 font-medium">
          Showing {filteredData.length} products
        </div>
      </div>

      {/* table  */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-h-[60vh] overflow-y-auto">
        <div className="overflow-x-auto modern-scroll">
          <div className="min-w-180 w-full">
            {/* heading  */}
            <div className="grid grid-cols-7 bg-gray-50/50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider py-3 sticky top-0 z-10 backdrop-blur-md">
              {[
                "Product Name",
                "Type",
                "Price",
                "In Stock",
                "Expiry Date",
                "Manufacturer",
                "Actions",
              ].map((title, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-1 px-4"
                >
                  {title}
                  <IoMdArrowDropdown
                    className="cursor-pointer text-gray-400"
                    size={16}
                  />
                </div>
              ))}
            </div>

            {/* body  */}
            <div className="relative">
              <AnimatePresence mode="popLayout">
                {filteredData.length > 0 ? (
                  filteredData.map((items, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      key={items.id}
                      className="grid text-gray-600 grid-cols-7 w-full border-b border-gray-50 py-3 hover:bg-blue-50/30 transition-colors items-center"
                    >
                      <div className="px-4">
                        <p className="font-semibold text-gray-800 text-[13px]">
                          {items.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                          {items.desc}
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium">
                          {items.type}
                        </span>
                      </div>
                      <p className="text-center font-semibold text-blue-600">
                        ${items.price.toFixed(2)}
                      </p>
                      <div className="text-center">
                        <span
                          className={`font-medium ${items.stock < 50 ? "text-red-500" : "text-green-600"}`}
                        >
                          {items.stock}
                        </span>
                        <span className="text-gray-400 text-[11px] ml-1">
                          pcs
                        </span>
                      </div>
                      <p className="text-center text-sm font-medium">
                        {items.expiry}
                      </p>
                      <p className="text-center text-sm text-gray-500">
                        {items.manu}
                      </p>
                      <div className="flex items-center gap-3 justify-center">
                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                          <CgFileDocument size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(items.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <RiDeleteBin5Line size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-gray-400"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <FaSearch size={32} className="text-gray-200" />
                    </div>
                    <p className="text-lg font-medium">No medicines found</p>
                    <p className="text-sm">
                      Try adjusting your search or filters
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* pagination */}
      <div className="py-6 flex justify-between items-center text-gray-500 px-2">
        <div className="text-sm">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {filteredData.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">
            {medicines.length}
          </span>{" "}
          entries
        </div>
        <div className="flex gap-1">
          <button
            className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg transition-all shadow-md shadow-blue-100">
            1
          </button>
          <button className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded-lg transition-all">
            2
          </button>
          <button className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded-lg transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineInventory;
