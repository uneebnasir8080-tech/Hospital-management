"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zScehma } from "@/lib/zodSchema";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";
import Schedule from "@/components/Schedule";

const DoctorData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [preview, setPreview] = useState(null);

  const { data, update } = useSession();

  useEffect(() => {
    if (data?.detail) {
      setIsStatus(true);
    }
  }, [data]);

  const formSchema = zScehma.pick({ name: false }).extend({
    profileImage: z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "Max file size is 5MB",
      })
      .refine(
        (file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type,
          ),
        { message: "Only JPG, PNG, WEBP allowed" },
      ),
    age: z.string().min(1, "Age is required"),
    specialization: z.string().min(1, "Specialization is required"),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    experience: z.string().min(1, "Experience is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: undefined,
      age: "",
      specialization: "",
      gender: undefined,
      experience: "",
    },
  });

  const handleFile = (file, field) => {
    try {
      if (!file) return;
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      field.onChange(file);
    } catch (error) {
      console.error(error);
      showToast("error", "Image loading failed");
    }
  };

  const handleOnSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (!data?.token) {
        showToast("error", "Authentication failed");
        return;
      }

      const formData = new FormData();
      formData.append("doctor", values.profileImage);
      formData.append("age", values.age);
      formData.append("specialization", values.specialization);
      formData.append("gender", values.gender);
      formData.append("experience", values.experience);
      formData.append("role", data?.role || "");

      const res = await api.post("/doctor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.token}`,
        },
      });

      showToast("success", res?.data?.message || "Details added");
      await update({ ...data, detail: true });

      setIsSubmitted(true);
      setTimeout(async () => {
        const refreshed = await update(); // fetch new session
        setIsStatus(true);
        form.reset();
        setPreview(null);
      }, 500);
    } catch (error) {
      console.error(error);

      const message =
        error?.response?.data?.message || error?.message || "Upload failed";

      showToast("error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isStatus && (
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
                    Doctor Details
                  </h1>
                  <p className="text-gray-500">Complete your profile to get started.</p>
                </div>

                <div className="px-6 sm:px-10 pb-10">
                  <form
                    className="space-y-5"
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                  >
                    <Form {...form}>
                      {/* Image Upload */}
                      <FormField
                        control={form.control}
                        name="profileImage"
                        render={({ field }) => (
                          <div className="flex justify-center py-2">
                            <div
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                handleFile(e.dataTransfer.files?.[0], field);
                              }}
                              onClick={() =>
                                document.getElementById("profileInput")?.click()
                              }
                              className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-gray-400 transition-colors bg-gray-50"
                            >
                              <input
                                id="profileInput"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) =>
                                  handleFile(e.target.files?.[0], field)
                                }
                              />

                              {preview ? (
                                <img
                                  src={preview}
                                  alt="Profile Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-[10px] text-gray-400 text-center px-2">
                                  Upload Profile Picture
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      />

                      {/* Name (disabled) */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <input
                                className="capitalize cursor-not-allowed w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full outline-none text-gray-400 text-sm"
                                type="text"
                                disabled
                                placeholder={data?.name || "Name"}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* DOB & Specialization — side by side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm focus:border-gray-400 transition-colors"
                                  type="date"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="specialization"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                                  type="text"
                                  placeholder="Specialization"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Gender & Experience — side by side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-sm h-auto">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                                  type="text"
                                  placeholder="Experience"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
      )}
      {isStatus && <Schedule docName={data?.name} />}
    </>
  );
};

export default DoctorData;
