"use client";
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { z } from "zod";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import ImageDropField from "@/components/ImageDropField";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";
import { useRouter } from "next/navigation";

const PatientData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data, update } = useSession();
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const formSchema = zScehma
    .pick({
      name: false,
    })
    .extend({
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
      history: z.string(),
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Please select a gender" }),
      }),
      blood: z.string().min(1, "Blood group is required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: undefined,
      age: "",
      history: "",
      gender: undefined,
      blood: "",
    },
  });

  const handleFile = (file, field) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    field.onChange(file);
  };

  const handleOnSubmit = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("patient", values.profileImage);
      formData.append("age", values.age);
      formData.append("history", values.history);
      formData.append("gender", values.gender);
      formData.append("blood", values.blood);
      const res = await api.post("/patient", formData, {
        params: {
          id: data?.id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data?.token}`,
        },
      });
      showToast("success", res.data.message);
      await update({
        detail: res?.data.patient,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        router.push("/user/home");
        form.reset();
      }, 500);
    } catch (error) {
      showToast("error", error.response?.data?.message || "Upload failed");
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
                Patient Details
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
                            handleFile(e.dataTransfer.files[0], field);
                          }}
                          onClick={() =>
                            document.getElementById("profileInput").click()
                          }
                          className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-gray-400 transition-colors bg-gray-50"
                        >
                          <input
                            id="profileInput"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => handleFile(e.target.files[0], field)}
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
                    name=""
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* DOB & Symptoms — side by side */}
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
                              placeholder="Date of Birth"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="history"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              type="text"
                              placeholder="Symptoms"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Gender & Blood Group — side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-sm h-auto">
                            <SelectValue
                              className="text-gray-700"
                              placeholder="Gender"
                            />
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
                      name="blood"
                      control={form.control}
                      rules={{ required: "Blood group is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-sm h-auto">
                            <SelectValue placeholder="Blood Group" />
                          </SelectTrigger>
                          <SelectContent>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                              (group) => (
                                <SelectItem key={group} value={group}>
                                  {group}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
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
  );
};

export default PatientData;
