"use client";
import  {api}  from "@/lib/apiCall";
import { showToast } from "@/lib/showToastify";
import { formatDate } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";

const AdminTable = () => {
  const [pages, setPages] = useState("new");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();

  const getData = useCallback(async () => {
    if (!session?.token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/patient/all-appointment",{
        headers:{
          Authorization:`Bearer ${session?.token}`
        }
      });

      const resp = res?.data?.getData ?? [];
      setResponse(resp);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch appointments");
      showToast("Failed to fetch appointments", "error");
      setResponse([]);
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status, getData]);

  return (
    <div className="w-full h-65 bg-white rounded-lg flex flex-col shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b text-sm font-medium">
        <div className="flex gap-6">
          <button
            onClick={() => setPages("new")}
            className={`pb-1 ${
              pages === "new"
                ? "border-b-2 border-blue-400 text-blue-400"
                : "text-gray-500"
            }`}
          >
            New Appointments
          </button>
          <button
            onClick={() => setPages("old")}
            className={`pb-1 ${
              pages === "old"
                ? "border-b-2 border-blue-400 text-blue-400"
                : "text-gray-500"
            }`}
          >
            Completed Appointments
          </button>
        </div>

        <TbArrowsDiagonalMinimize className="cursor-pointer text-gray-500" />
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full overflow-x-auto h-full">
          <table className="min-w-full text-sm text-left">
            
            <thead className="bg-gray-100 text-gray-600 text-xs sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Doctor</th>
                {pages === "old" && (
                  <th className="px-4 py-2">Status</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y text-xs">

              {/* 🔹 Loading Skeleton */}
              {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 py-3">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-3 bg-gray-200 rounded w-28"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </td>
                    {pages === "old" && (
                      <td className="px-4 py-3">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </td>
                    )}
                  </tr>
                ))}

              {/* 🔹 Error State */}
              {!loading && error && (
                <tr>
                  <td
                    colSpan={pages === "old" ? 5 : 4}
                    className="text-center py-6 text-red-400"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {/* 🔹 Empty State */}
              {!loading && !error && response.length === 0 && (
                <tr>
                  <td
                    colSpan={pages === "old" ? 5 : 4}
                    className="text-center py-6 text-gray-400"
                  >
                    No appointments found
                  </td>
                </tr>
              )}

              {/* 🔹 Actual Data */}
              {!loading &&
                !error &&
                response.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{item?.time || "-"}</td>
                    <td className="px-4 py-2">
                      {item?.date ? formatDate(item.date) : "-"}
                    </td>
                    <td className="px-4 py-2 capitalize">
                      {item?.patientId?.userId?.name || "-"}
                    </td>
                    <td className="px-4 py-2 capitalize">
                      {item?.doctorId?.userId?.name || "-"}
                    </td>

                    {pages === "old" && (
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            item?.status === "pending"
                              ? "bg-red-100 text-red-500"
                              : "bg-green-100 text-green-500"
                          }`}
                        >
                          {item?.status}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;