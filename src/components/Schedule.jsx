"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";
import { useRouter } from "next/navigation";

const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
const slotRegex = /^\d+\s?(min|minutes)$/i;

const formSchema = z.object({
  startTime: z.string().regex(timeRegex, "Enter valid start time (09:00 AM)"),
  endTime: z.string().regex(timeRegex, "Enter valid end time (03:00 PM)"),
  slot: z.string().regex(slotRegex, "Enter slot like 30 min"),
  fee: z.string().min(1, "Fee is required"),
  days: z.array(z.string()).min(1, "Select at least one day"),
});

const dayMap = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
};

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Schedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
      slot: "",
      fee: "",
      days: [],
    },
  });

  const handleOnSubmit = async (values) => {
    if (!data?.token) {
      showToast("error", "Authentication failed");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...values,
        doctorId: data?.id,
        days: values.days.map((day) => dayMap[day]),
      };

      const res = await api.post("/doctor/schedule", payload, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      showToast("success", res?.data?.message || "Schedule added");
      setIsSubmitted(true);
      setTimeout(() => {
        form.reset();
        router.push("/admin/dashboard");
      }, 500);
    } catch (error) {
      console.error("Schedule Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      showToast("error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8">
      <AnimatePresence>
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-white"
          >
            {/* Header */}
            <div className="text-center pt-10 pb-4 px-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Doctor Schedule
              </h1>
              <p className="text-gray-500">Set your availability and consultation fee.</p>
            </div>

            <div className="px-6 sm:px-10 pb-10">
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(handleOnSubmit)}
              >
                <Form {...form}>
                  {/* Name (disabled) */}
                  <FormItem>
                    <FormControl>
                      <input
                        disabled
                        className="capitalize cursor-not-allowed w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full outline-none text-gray-400 text-sm"
                        value={data?.name || "Name"}
                      />
                    </FormControl>
                  </FormItem>

                  {/* Start Time & End Time — side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              type="text"
                              placeholder="Start Time (e.g. 09:00 AM)"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              type="text"
                              placeholder="End Time (e.g. 03:00 PM)"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Slot & Fee — side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="slot"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              type="text"
                              placeholder="Slot Duration (e.g. 30 min)"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fee"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              type="text"
                              placeholder="Consultation Fee"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Days selection */}
                  <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                      <FormItem>
                        <p className="text-sm text-gray-500 mb-2 text-center">Select available days</p>
                        <div className="flex gap-2 justify-center flex-wrap">
                          {weekDays.map((day) => {
                            const isChecked = field.value?.includes(day);

                            return (
                              <label
                                key={day}
                                className={`px-4 py-2 rounded-full text-sm cursor-pointer border transition-colors select-none ${isChecked
                                  ? "bg-gray-900 text-white border-gray-900"
                                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={isChecked || false}
                                  onChange={(e) => {
                                    const current = field.value || [];

                                    if (e.target.checked) {
                                      field.onChange([...new Set([...current, day])]);
                                    } else {
                                      field.onChange(
                                        current.filter((d) => d !== day),
                                      );
                                    }
                                  }}
                                />
                                {day.slice(0, 3)}
                              </label>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Form>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin text-xl text-white" />
                  ) : (
                    <>
                      Submit
                      <MdArrowForward className="text-lg" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;
