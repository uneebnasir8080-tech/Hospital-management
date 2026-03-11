"use client";

import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect, useCallback } from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateAge, formatDate } from "@/lib/utils";
import { deleteAppointment } from "@/app/actions/deleteAppointment";
import { showToast } from "@/lib/showToastify";

import Pagination from "./Pagination";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SkeletonRow = () => (
  <div className="grid grid-cols-6 py-3 border-b animate-pulse text-xs lg:text-[15px]">
    {Array(6)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="px-2 py-3 h-5 bg-gray-100 rounded-md mx-1"
        ></div>
      ))}
  </div>
);

const AdminNewAppoint = ({ refresh }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredAppointments = React.useMemo(() => {
    return appointments.filter((item) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        item?.patientId?.userId?.name?.toLowerCase().includes(searchStr) ||
        item?.doctorId?.userId?.name?.toLowerCase().includes(searchStr) ||
        item?.time?.toLowerCase().includes(searchStr) ||
        (item?.date && formatDate(item.date).toLowerCase().includes(searchStr))
      );
    });
  }, [appointments, searchTerm]);

  const getAppointments = useCallback(async () => {
    if (!session?.token) return;

    try {
      setLoading(true);
      const res = await api.get(
        `/patient/all-appointment?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );

      const allData = res?.data?.getData || [];
      const pending = allData.filter(
        (app) => app.status === "pending" || app.status === "confirmed",
      );
      setAppointments(pending);
      setCount(res?.data?.pagination?.totalPage || "");
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch appointments", "error");
    } finally {
      setLoading(false);
    }
  }, [session, page, limit]);

  useEffect(() => {
    if (status === "authenticated") {
      getAppointments();
    }
  }, [status, getAppointments, refresh, page]);

  /* ========================
      DELETE FUNCTION
  ======================== */

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const formData = new FormData();
      formData.append("id", deleteId);
      formData.append("token", session?.token);

      const res = await deleteAppointment(formData);

      if (res?.success) {
        setAppointments((prev) => prev.filter((item) => item._id !== deleteId));
        showToast("Appointment deleted successfully ✅", "success");
      } else {
        showToast("Failed to delete appointment ❌", "error");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      showToast("Something went wrong ❌", "error");
    } finally {
      setDeleting(false);
      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="px-3 lg:px-5">
      <div className="flex gap-10 h-10 md:h-15 lg:h-22 items-center flex-wrap">
        <div className="flex items-center rounded-full shadow-sm px-4 py-1 md:py-2 text-sm lg:text-[16px] w-40 sm:w-50 md:w-55 lg:w-64 bg-white">
          <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full text-gray-600 placeholder-gray-400 bg-transparent"
          />
        </div>

        <div className="hidden lg:block">
          <DatePicker />
        </div>
      </div>

      <div className="overflow-x-scroll modern-scroll bg-white rounded-md shadow-sm border border-gray-100 max-h-[60vh] overflow-y-auto">
        <div className="min-w-180">
          <div className="grid grid-cols-6 border-b-2 pb-2 text-xs lg:text-[16px] text-gray-700 bg-gray-50/50 sticky top-0 z-10">
            <p className="pl-2 font-medium flex items-center gap-1 py-3">
              Time <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1 py-3">
              Date <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1 py-3">
              Patient Name <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1 py-3">
              Patient Age <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1 py-3">
              Doctor <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1 py-3">
              User Action <IoMdArrowDropdown size={20} />
            </p>
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
                {filteredAppointments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-gray-500"
                  >
                    No new appointments found
                  </motion.div>
                ) : (
                  filteredAppointments.map((item, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      key={item._id}
                      className="grid text-gray-600 grid-cols-6 border-b py-3 text-xs lg:text-[15px] hover:bg-blue-50/30 transition-colors items-center"
                    >
                      <p className="pl-4 font-medium text-gray-800">
                        {item?.time || "-"}
                      </p>
                      <p>{item?.date ? formatDate(item.date) : "-"}</p>
                      <p className="capitalize font-semibold text-gray-700">
                        {item?.patientId?.userId?.name || "-"}
                      </p>
                      <p className="pl-8">
                        {item?.patientId?.age
                          ? calculateAge(item.patientId.age)
                          : "-"}
                      </p>
                      <p className="capitalize text-black font-medium">
                        {item?.doctorId?.userId?.name || "-"}
                      </p>

                      <div className="flex gap-4 lg:justify-between px-2 items-center">
                        <button className="text-blue-400 font-medium cursor-pointer hover:text-blue-700 transition px-2 py-1 rounded-md hover:bg-blue-50 text-[13px]">
                          Reschedule
                        </button>

                        <button
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <X size={18} />
                        </button>
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
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="h-24 bg-red-50 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="text-red-600" size={32} />
                </div>
              </div>

              <div className="px-8 py-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Delete Appointment
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Are you sure you want to delete this appointment? <br />
                  This action is permanent and cannot be reversed.
                </p>
              </div>

              <div className="px-8 pb-8 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                >
                  Keep It
                </button>

                <button
                  disabled={deleting}
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 rounded-xl text-white bg-red-500 font-semibold hover:bg-red-600 transition disabled:opacity-50 shadow-lg shadow-red-100"
                >
                  {deleting ? "Deleting..." : "Delete Now"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNewAppoint;
