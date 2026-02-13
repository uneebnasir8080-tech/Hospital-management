"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";
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
  Monday: "mon",
  Tuesday: "tue",
  Wednesday: "wed",
  Thursday: "thr",
  Friday: "fri",
  Saturday: "sat",
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
      form.reset();
      router.push("/admin/dashboard");
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
    <div className="flex min-h-screen py-8 px-4 bg-gray-100">
      <Card className="flex w-140 lg:w-160 h-full mx-auto p-0 overflow-hidden">
        <CardContent className="p-0">
          <div
            className="h-65 bg-center relative bg-no-repeat bg-cover clip-zigzag"
            style={{ backgroundImage: `url('/BGLogin.png')` }}
          >
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white">
              DOCTOR SCHEDULE
            </h1>
          </div>

          <form
            className="space-y-6 px-7 my-5 w-full"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <Form {...form}>
              <FormItem>
                <FormControl>
                  <input
                    disabled
                    className="pl-7 w-full py-2 border-b border-b-gray-400 capitalize text-black/60 outline-none"
                    value={data?.name || "Name"}
                  />
                </FormControl>
              </FormItem>

              {["startTime", "endTime", "slot", "fee"].map((fieldName) => {
                const placeholders = {
                  startTime: "Start Time (e.g. 09:00 AM)",
                  endTime: "End Time (e.g. 03:00 PM)",
                  slot: "Slot Duration (e.g: 30 min)",
                  fee: "FEES",
                };

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            type="text"
                            placeholder={placeholders[fieldName]}
                            className="pl-7 w-full py-2 border-b border-b-gray-400 outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3 justify-center text-black/70 flex-wrap">
                      {weekDays.map((day) => {
                        const isChecked = field.value?.includes(day);

                        return (
                          <label
                            key={day}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
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
                            <span>{day}</span>
                          </label>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#3497F9] py-5 text-lg hover:bg-[#106ecc] w-full mt-6 mb-5"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-2xl text-white" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
