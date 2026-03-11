"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { BiSolidMessageRounded } from "react-icons/bi";
import { X } from "lucide-react";
import { DatePicker } from "./ui/DatePicker";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import { calculateAge } from "@/lib/utils";
import Pagination from "./Pagination";
import { motion, AnimatePresence } from "framer-motion";

const SkeletonRow = () => (
  <div className="grid grid-cols-7 py-3 border-b animate-pulse">
    {Array(7)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="px-2 py-3 h-5 bg-gray-100 rounded-md mx-1"
        ></div>
      ))}
  </div>
);

const AdminDoctor = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredResponse = useMemo(() => {
    return response.filter((item) => {
      return (
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.doctor?.age?.toString().includes(searchTerm.toLowerCase()) ||
        item?.doctor?.gender
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item?.doctor?.specialization
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item?.doctor?.experience
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [response, searchTerm]);
  const getDoctor = useCallback(async () => {
    if (!session?.token) {
      showToast("error", "Authentication token missing");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/all-doctors?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setResponse(res?.data?.getData || []);
      setCount(res?.data?.pagination?.totalPage || "");
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to fetch doctors",
      );
    } finally {
      setLoading(false);
    }
  }, [session, page, limit]);

  useEffect(() => {
    if (status === "authenticated") {
      getDoctor();
    }
  }, [status, getDoctor, page]);

  const deleteDoctor = async () => {
    if (!deleteId) return;

    if (!session?.token) {
      showToast("error", "Authentication token missing");
      return;
    }

    try {
      setIsDeleting(true);

      const res = await api.delete(`/doctor-delete/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setResponse((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);

      showToast("success", res?.data?.message || "Doctor deleted successfully");
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to delete doctor",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="px-3 xl:px-5 w-full">
      <div className="flex gap-4 lg:gap-8 items-center flex-wrap mb-4 mt-2">
        <div className="flex items-center rounded-full shadow-sm px-4 py-2 text-sm xl:text-[16px] w-full sm:w-60 xl:w-72 bg-white">
          <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full text-gray-600 bg-transparent"
          />
        </div>
        <div className="hidden lg:block">
          <DatePicker />
        </div>
      </div>

      <div className="w-full overflow-x-auto modern-scroll bg-white rounded-md shadow-sm border border-gray-100 max-h-[60vh] overflow-y-auto">
        <div className="min-w-225">
          <div className="grid grid-cols-7 border-b font-medium text-xs lg:text-[15px] text-gray-700 bg-gray-50/50 sticky top-0 z-10">
            {[
              "Doctor Name",
              "Age",
              "Gender",
              "Specialization",
              "Experience",
              "Email",
              "User Action",
            ].map((title, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-1 py-3 px-3"
              >
                {title}
                <IoMdArrowDropdown size={18} />
              </div>
            ))}
          </div>

          {loading && (
            <>
              {Array(limit)
                .fill(0)
                .map((_, idx) => (
                  <SkeletonRow key={idx} />
                ))}
            </>
          )}

          {!loading && (
            <div className="relative">
              <AnimatePresence mode="popLayout">
                {filteredResponse.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-gray-500"
                  >
                    No Doctor found
                  </motion.div>
                ) : (
                  filteredResponse.map((items, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      key={items._id || index}
                      className="grid grid-cols-7 border-b text-gray-600 text-xs xl:text-[15px] hover:bg-blue-50/30 transition-colors items-center py-3"
                    >
                      <p className="px-3 capitalize font-semibold text-gray-800">
                        {items?.name}
                      </p>
                      <p className="px-3 text-center">
                        {calculateAge(items?.doctor?.age)}
                      </p>
                      <p className="px-3 text-center capitalize">
                        {items?.doctor?.gender}
                      </p>
                      <p className="px-3 text-center font-medium text-blue-600">
                        {items?.doctor?.specialization}
                      </p>
                      <p className="px-3 text-center">
                        {items?.doctor?.experience}
                      </p>
                      <p className="px-2 text-center break-all text-[13px]">
                        {items?.email}
                      </p>

                      <div className="flex items-center justify-center gap-2 px-3">
                        <span className="bg-blue-500 cursor-pointer p-2  text-white rounded-lg hover:bg-blue-600 transition-colors">
                          <BiSolidMessageRounded size={15} />
                        </span>

                        <button
                          onClick={() => setDeleteId(items._id)}
                          className="p-2 text-gray-400 text-red-500 bg-red-50 cursor-pointer rounded-lg transition-all"
                        >
                          <X size={18} />
                        </button>

                        <span className="border border-blue-200 cursor-pointer p-2 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                          <TiInfoLarge size={15} />
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <Pagination
        totalPages={count}
        currentPage={page}
        onPageChange={setPage}
      />

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-[200] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl overflow-hidden text-center"
            >
              <div className="h-24 bg-red-100/50 flex items-center justify-center mb-6 -mx-8 -mt-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                  <X className="text-red-500" size={32} />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Remove Doctor
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                You are about to remove this doctor from the registry. <br />
                This action is permanent and cannot be undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition"
                  disabled={isDeleting}
                >
                  Cancel
                </button>

                <button
                  onClick={deleteDoctor}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition shadow-lg shadow-red-100"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Removing..." : "Remove Now"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDoctor;
