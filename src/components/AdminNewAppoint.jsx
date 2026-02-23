"use client";

import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { DatePicker } from "./ui/DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateAge, formatDate } from "@/lib/utils";
import { deleteAppointment } from "@/app/actions/deleteAppointment";
import { showToast } from "@/lib/showToastify";

const AdminNewAppoint = ({ response = [], loading, token }) => {
  /* ========================
      STATES
  ======================== */

  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const filtered =
    response?.filter((appoint) => appoint?.status === "pending") || [];
  const [appointments, setAppointments] = useState(
    Array.isArray(filtered) ? filtered : [],
  );

  /* ========================
      FILTER DATA
  ======================== */

  /* ========================
      DELETE FUNCTION
  ======================== */

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const formData = new FormData();
      formData.append("id", deleteId);
      formData.append("token", token);

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
  useEffect(() => {
    setAppointments(Array.isArray(response) ? response : []);
  }, [response]);

  return (
    <div className="px-3 lg:px-5">
      {/* ========================
          SEARCH + FILTER
      ======================== */}

      <div className="flex gap-10 h-10 md:h-15 lg:h-22 items-center flex-wrap">
        <div className="flex items-center rounded-full shadow-sm px-4 py-1 md:py-2 text-sm lg:text-[16px] w-40 sm:w-50 md:w-55 lg:w-64">
          <FaSearch className="w-4 h-4 text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full text-gray-600 placeholder-gray-400"
          />
        </div>

        <div className="hidden lg:block">
          <DatePicker />
        </div>
      </div>

      {/* ========================
            TABLE
      ======================== */}

      <div className="overflow-x-scroll modern-scroll">
        <div className="min-w-180">
          {/* TABLE HEADER */}

          <div className="grid grid-cols-6 border-b-2 pb-2 text-xs lg:text-[16px]">
            <p className="pl-2 font-medium flex items-center gap-1">
              Time <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1">
              Date <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1">
              Patient Name <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1">
              Patient Age <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1">
              Doctor <IoMdArrowDropdown size={20} />
            </p>

            <p className="font-medium flex items-center gap-1">
              User Action <IoMdArrowDropdown size={20} />
            </p>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="p-5 text-center text-gray-500">
              Loading appointments...
            </div>
          )}

          {/* DATA */}

          {!loading && (
            <div>
              {appointments.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No new appointments found
                </div>
              )}

              {appointments.map((item) => (
                <div
                  key={item._id}
                  className="grid text-gray-600 grid-cols-6 border-b py-3 text-xs lg:text-[15px]"
                >
                  <p className="pl-2">{item?.time || "-"}</p>

                  <p>{item?.date ? formatDate(item.date) : "-"}</p>

                  <p className="capitalize">
                    {item?.patientId?.userId?.name || "-"}
                  </p>

                  <p className="pl-8">
                    {item?.patientId?.age
                      ? calculateAge(item.patientId.age)
                      : "-"}
                  </p>

                  <p className="capitalize">
                    {item?.doctorId?.userId?.name || "-"}
                  </p>

                  {/* ACTIONS */}

                  <div className="flex gap-4 lg:justify-between">
                    <button className="text-blue-600 pl-2 cursor-pointer hover:underline">
                      Reschedule
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(item._id);
                        setShowModal(true);
                      }}
                      className="mr-2 px-4 py-1 text-[13px] rounded-md text-white bg-red-400 hover:bg-red-500 transition"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================
            PAGINATION
      ======================== */}

      <div className="py-2 md:text-sm flex justify-end text-xs gap-2">
        <button className="py-1 px-2 rounded-sm hover:bg-gray-100">Prev</button>

        <button className="py-1 px-3 rounded-sm hover:bg-gray-100">1</button>

        <button className="py-1 px-3 rounded-sm hover:bg-gray-100">2</button>

        <button className="py-1 px-3 rounded-sm hover:bg-gray-100">3</button>

        <button className="py-1 px-2 rounded-sm hover:bg-gray-100">Next</button>
      </div>

      {/* ========================
            DELETE MODAL
      ======================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
          {/* OVERLAY */}

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          {/* MODAL */}

          <div className="relative bg-white w-[90%] sm:w-105 rounded-xl shadow-2xl animate-scaleIn">
            {/* HEADER */}

            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Appointment
              </h2>
            </div>

            {/* BODY */}

            <div className="px-6 py-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Are you sure you want to delete this appointment? This action
                cannot be undone.
              </p>
            </div>

            {/* FOOTER */}

            <div className="border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                disabled={deleting}
                onClick={handleDelete}
                className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewAppoint;
