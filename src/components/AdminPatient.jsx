"use client";

import React, { useEffect, useState, useCallback } from "react";
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

const AdminPatient = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: session, status } = useSession();

  const getPatient = useCallback(async () => {
    if (!session?.token) {
      showToast("error", "Authentication token missing");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get("/all-patient", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setResponse(res?.data?.getData || []);
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to fetch patients"
      );
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      getPatient();
    }
  }, [status, getPatient]);

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
        res?.data?.message || "Patient deleted successfully"
      );
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to delete patient"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="px-3 xl:px-5 w-full">
      <div className="flex gap-4 lg:gap-8 items-center flex-wrap mb-4">
        <div className="flex items-center rounded-full shadow-sm px-4 py-2 text-sm xl:text-[16px] w-full sm:w-60 xl:w-72 bg-white">
          <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full text-gray-600 bg-transparent"
          />
        </div>
        <div className="hidden lg:block">
          <DatePicker />
        </div>
      </div>

      {loading && (
        <p className="text-center py-4 text-sm text-gray-500">
          Loading patients...
        </p>
      )}

      {!loading && (
        <div className="w-full overflow-x-auto modern-scroll bg-white rounded-md">
          <div className="min-w-225">
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

            {response.length === 0 ? (
              <p className="text-center py-6 text-gray-500">
                No patients found
              </p>
            ) : (
              response.map((items, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 border-b text-gray-600 text-xs xl:text-[15px]"
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
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="py-3 flex justify-end gap-1 text-xs md:text-sm">
        {["Prev", "1", "2", "3", "Next"].map((btn, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-sm cursor-pointer ${
              btn === "Next"
                ? "bg-blue-400 text-white"
                : "text-gray-600 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

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
