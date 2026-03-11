import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect, useCallback } from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateAge, formatDate } from "@/lib/utils";

import Pagination from "./Pagination";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const SkeletonRow = () => (
  <div className="grid grid-cols-7 py-3 border-b animate-pulse text-xs lg:text-[16px]">
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

const AdminComplete = ({ refresh }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [searchTerm, setSearchTerm] = useState("");

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
      const completed = allData.filter(
        (app) => app.status === "confirmed" || app.status === "pending",
      );
      setAppointments(completed);
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

  return (
    <div className="px-3 lg:px-5">
      {/* inputs */}
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

      {/* table */}
      <div className="overflow-x-scroll modern-scroll bg-white rounded-md shadow-sm border border-gray-100 max-h-[60vh] overflow-y-auto">
        <div className="min-w-180">
          {/* heading */}
          <div className="grid grid-cols-7 justify-center border-b-2 pb-2 text-xs lg:text-[16px] text-gray-700 bg-gray-50/50 sticky top-0 z-10">
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
              Fee Status <IoMdArrowDropdown size={20} />
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
                    No completed appointments found
                  </motion.div>
                ) : (
                  filteredAppointments.map((items, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      key={items._id || index}
                      className="grid text-gray-600 grid-cols-7 w-full border-b py-4 text-xs lg:text-[15px] hover:bg-blue-50/30 transition-colors items-center"
                    >
                      <p className="pl-4 font-medium text-gray-800">
                        {items?.time || "-"}
                      </p>
                      <p>{items?.date ? formatDate(items.date) : "-"}</p>
                      <p className="capitalize font-semibold text-gray-700">
                        {items?.patientId?.userId?.name || "-"}
                      </p>
                      <p className="pl-8">
                        {items?.patientId?.age
                          ? calculateAge(items.patientId.age)
                          : "-"}
                      </p>
                      <p className="capitalize font-medium text-gray-600">
                        {items?.doctorId?.userId?.name || "-"}
                      </p>
                      <p
                        className={`font-semibold ${
                          items?.status === "UnPaid"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {items?.status || "-"}
                      </p>
                      <button
                        className={`${
                          items?.status === "pending"
                            ? "text-blue-500 hover:text-blue-700 bg-blue-50/50"
                            : "text-gray-400 hover:text-gray-600 bg-gray-50"
                        } cursor-pointer px-3 py-1 rounded-full text-[12px] font-medium transition-all hover:shadow-sm`}
                      >
                        Request Fee
                      </button>
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
    </div>
  );
};

export default AdminComplete;
