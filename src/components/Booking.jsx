"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Payment from "./Payment";
import { api } from "@/lib/apiCall";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";

const Booking = ({ onClose, Loading, docId }) => {
  // states
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [payment, setPayment] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: session, status } = useSession();

  const today = new Date().toISOString().split("T")[0];

  // ---------------- TIME UTILS ----------------

  const parse12HourTimeToMinutes = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") return null;

    const match = timeStr
      .trim()
      .toLowerCase()
      .match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);

    if (!match) return null;

    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const modifier = match[3];

    if (modifier === "pm" && hours !== 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const generateTimeSlots = (startTime, endTime, interval = 30) => {
    const start = parse12HourTimeToMinutes(startTime);
    const end = parse12HourTimeToMinutes(endTime);

    if (start === null || end === null) return [];

    const format = (mins) => {
      let h = Math.floor(mins / 60);
      const m = mins % 60;
      const mod = h >= 12 ? "pm" : "am";
      h = h % 12 || 12;
      return `${h}:${String(m).padStart(2, "0")} ${mod}`;
    };

    const result = [];
    let current = start;

    while (current + interval <= end) {
      result.push(format(current));
      current += interval;
    }

    return result;
  };

  // ---------------- API ----------------

  const fetchDoctorSchedule = useCallback(async () => {
    if (!session?.token || !docId) return;

    try {
      const res = await api.get("/doctor/schedule", {
        params: { docId },
        headers: { Authorization: `Bearer ${session.token}` },
      });
      // console.log("response of booking", res)
      setDoctor(res.data.getDoctor);
    } catch (error) {
      console.error(error);
      showToast(
        "error",
        error?.response?.data?.message || "Failed to fetch doctor schedule",
      );
    }
  }, [session?.token, docId]);

  useEffect(() => {
    if (status !== "authenticated") return
      fetchDoctorSchedule();
    
  }, [status, fetchDoctorSchedule]);

  // generate slots when date or schedule changes
  useEffect(() => {
    if (!doctor?.schedule.startTime || !doctor?.schedule.endTime)
      return;

    setSelectedSlot(null); // reset on date change

    const generated = generateTimeSlots(
      doctor?.schedule.startTime,
      doctor?.schedule.endTime,
    );

    setSlots(generated);
  }, [doctor, date]);

  // ---------------- SUBMIT ----------------

  const handleSubmit = async () => {
    if (!date || !selectedSlot) {
      showToast("warning", "Please select date and time");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        doctorId: docId,
        patientId: session?.detail.id,
        date,
        time: selectedSlot,
      };

      await api.post("/patient/appointment", payload, {
        headers: { Authorization: `Bearer ${session.token}` },
      });

      showToast("success", "Clear Payment");
      setPayment(true);
    } catch (error) {
      console.error(error);
      showToast("error", error?.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };
  const getDayName = (selectedDate) => {
    if (!selectedDate) return "";

    const day = new Date(selectedDate);
    return day.toLocaleDateString("en-US", { weekday: "long" });
  };

  // ---------------- UI ----------------

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-150 flex items-center"
      >
        <Card
          className="flex mx-auto w-200"
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent>
            <div className="flex gap-2 pb-2">
              <button onClick={onClose}>
                <X size={20} />
              </button>
              <p className="font-medium text-lg">Book Appointment</p>
            </div>

            <hr />

            <div className="mb-5 mt-3">
              <p className="text-center text-lg font-semibold mb-10">
                Select a Slot for Appointment
              </p>

              <div className="grid grid-cols-2 gap-20">
                {/* Date */}
                <div className="flex flex-col">
                  <label className="font-semibold">Appointment Date</label>
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="my-2 border-b border-black/80 py-1 px-2 outline-none"
                  />
                  <p className="font-semibold">
                    Day:{" "}
                    <span className="font-normal text-black/60">
                      {getDayName(date) || "Select date"}
                    </span>
                  </p>
                </div>

                {/* Time */}
                <div>
                  <h3 className="font-semibold text-sm">Select Time</h3>
                  <div className="grid grid-cols-3 gap-3 mt-3 max-h-60 overflow-y-scroll modern-scroll">
                    {slots?.map((time) => {
                      const active = selectedSlot === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedSlot(time)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium
                            ${
                              active
                                ? "bg-blue-500 text-white"
                                : "border border-blue-500 text-blue-500 hover:bg-blue-50"
                            }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <Button
              onClick={handleSubmit}
              disabled={!date || !selectedSlot || submitting}
              className="w-full bg-[#7ab3ec] hover:bg-[#1fb2d3]"
            >
              {(Loading || submitting) && (
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              )}
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </div>

      {payment && (
        <Payment
          onClose={onClose}
          date={date}
          slot={selectedSlot}
          docId={docId}
          response={doctor}
        />
      )}
    </>
  );
};

export default Booking;
