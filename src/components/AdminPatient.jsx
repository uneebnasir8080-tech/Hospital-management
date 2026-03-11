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
  <div className="grid grid-cols-5 py-3 border-b animate-pulse">
    {Array(5)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="px-3 py-3 h-5 bg-gray-100 rounded-md mx-1"
        ></div>
      ))}
  </div>
);

const AdminPatient = ({ refresh }) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredPatients = useMemo(() => {
    return response.filter((patient) => {
      const search = searchTerm.toLowerCase();
      return (
        patient?.name?.toLowerCase().includes(search) ||
        patient?.patient?.age?.toString().includes(search) ||
        patient?.patient?.gender?.toLowerCase().includes(search) ||
        patient?.patient?.blood?.toLowerCase().includes(search) ||
        patient?.patient?.history?.toLowerCase().includes(search) ||
        patient?.email?.toLowerCase().includes(search)
      );
    });
  }, [response, searchTerm]);

  const getPatient = useCallback(async () => {
    if (!session?.token) {
      showToast("error", "Authentication token missing");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/all-patient?page=${page}&limit=${limit}`, {
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
        err?.response?.data?.message || "Failed to fetch patients",
      );
    } finally {
      setLoading(false);
    }
  }, [session, page, limit]);

  useEffect(() => {
    if (status === "authenticated") {
      getPatient();
    }
  }, [status, getPatient, refresh, page]);

  const deletePatient = async () => {
    if (!deleteId) return;

    if (!session?.token) {
      showToast("error", "Authentication token missing");
      return;
    }

    try {
      setIsDeleting(true);

      const res = await api.delete(`/patient/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setResponse((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);

      showToast(
        "success",
        res?.data?.message || "Patient deleted successfully",
      );
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to delete patient",
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
          {/* Table Header */}
          <div className="grid grid-cols-7 border-b font-medium text-xs lg:text-[15px] text-gray-700">
            {[
              "Patient Name",
              "Age",
              "Gender",
              "Blood Group",
              "History",
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

          {/* Loading Skeleton */}
          {loading && (
            <>
              {Array(limit)
                .fill(0)
                .map((_, idx) => (
                  <SkeletonRow key={idx} />
                ))}
            </>
          )}

          {/* No Data */}
          {!loading && filteredPatients.length === 0 && (
            <p className="text-center py-6 text-gray-500">No patients found</p>
          )}

          {/* Patient Data */}
          <div className="relative">
            <AnimatePresence mode="popLayout">
              {!loading &&
                filteredPatients.length > 0 &&
                filteredPatients.map((items, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    key={items._id || index}
                    className="grid grid-cols-7 border-b text-gray-600 text-xs xl:text-[15px] hover:bg-gray-50 transition-colors"
                  >
                    <p className="px-3 py-3 capitalize">{items?.name}</p>
                    <p className="px-3 py-3 text-center">
                      {calculateAge(items?.patient?.age)}
                    </p>
                    <p className="px-3 py-3 text-center capitalize">
                      {items?.patient?.gender}
                    </p>
                    <p className="px-3 py-3 text-center">
                      {items?.patient?.blood}
                    </p>
                    <p className="px-3 py-3 text-center">
                      {items?.patient?.history}
                    </p>
                    <p className="px-2 py-3 text-center break-all">
                      {items?.email}
                    </p>

                    <div className="flex items-center justify-center gap-2 px-3 py-3">
                      <span className="bg-blue-500 cursor-pointer p-1 text-white rounded-sm">
                        <BiSolidMessageRounded size={15} />
                      </span>

                      <button
                        onClick={() => setDeleteId(items._id)}
                        className="border border-red-500 text-red-500 cursor-pointer p-1 rounded-sm"
                      >
                        <X size={15} />
                      </button>

                      <span className="border border-blue-500 cursor-pointer p-1 rounded-sm">
                        <TiInfoLarge size={15} />
                      </span>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Pagination
        totalPages={count}
        currentPage={page}
        onPageChange={setPage}
      />

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-5 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Delete Patient</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this patient?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-1 border rounded-sm text-gray-600"
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                onClick={deletePatient}
                className="px-3 py-1 bg-red-500 text-white rounded-sm"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPatient;
