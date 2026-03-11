"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zScehma } from "@/lib/zodSchema";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { Camera, X, Check, User, Calendar, Award, Briefcase } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

const ProfileUpdate = ({ response, onClose }) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const router=useRouter()
  const formSchema = zScehma.pick({ name: true }).extend({
    profileImage: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "Max file size is 5MB",
      })
      .refine(
        (file) =>
          !file ||
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type,
          ),
        { message: "Only JPG, PNG, WEBP allowed" },
      ),
    age: z.string().min(1, "Age is required"),
    gender: z.enum(["male", "female", "other"]),
    experience: z.string().min(1, "Experience is required"),
    specialization: z.string().min(1, "Specialization is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: undefined,
      name: "",
      age: "",
      gender: undefined,
      experience: "",
      specialization: "",
    },
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (response && !initialized) {
      form.reset({
        name: response.name || "",
        age: response.doctor?.age || "",
        gender: response?.doctor?.gender || undefined,
        experience: response.doctor?.experience || "",
        specialization: response.doctor?.specialization || "",
        profileImage: undefined,
      });

      // set old image preview
      if (response.doctor?.profile) {
        setPreview(response.doctor.profile);
      }
      setInitialized(true);
    }
  }, [response, initialized, form]);

  const handleFile = (file, field) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    field.onChange(file);
  };

  const handleOnSubmit = async (values) => {
    try {
      // console.log(values)
      setIsLoading(true);
      const formData = new FormData();

      // If user uploaded a new image, send it; otherwise send old image URL
      if (values.profileImage && values.profileImage !== undefined) {
        formData.append("profileImage", values.profileImage);
      }
      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("gender", values.gender);
      formData.append("experience", values.experience);
      formData.append("specialization", values.specialization);

      const res = await api.put("/update-user", formData, {
        params: { id: data?.id },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data?.token}`,
        },
      });
      showToast("success", res.data.message);
       router.refresh();
      onClose();
    } catch (error) {
      showToast("error", error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Update Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Refine your professional appearance and details.</p>
          </div>

          <div className="overflow-y-auto px-8 py-4 modern-scroll flex-grow">
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(handleOnSubmit)}
            >
              <Form {...form}>
                {/* Profile Image Section */}
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-xl group-hover:shadow-blue-100 transition-all">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Profile Preview"
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <User size={40} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => document.getElementById("profileInput").click()}
                          className="absolute -bottom-2 -right-2 p-2.5 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all border-4 border-white"
                        >
                          <Camera size={18} />
                        </button>
                        <input
                          id="profileInput"
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleFile(e.target.files[0], field)}
                        />
                      </div>
                      <FormMessage />
                    </div>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                          Full Name
                        </label>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <User size={18} />
                            </span>
                            <input
                              {...field}
                              className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-gray-700 font-medium placeholder:text-gray-300"
                              type="text"
                              placeholder="e.g. Dr. John Smith"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Age (Date of Birth) */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                          Date of Birth
                        </label>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <Calendar size={18} />
                            </span>
                            <input
                              {...field}
                              type="date"
                              className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-gray-700 font-medium"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                          Gender
                        </label>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full h-[54px] px-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-gray-700 font-medium">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-gray-100 shadow-xl z-[10000]">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Experience */}
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                          Experience
                        </label>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <Briefcase size={18} />
                            </span>
                            <input
                              {...field}
                              type="text"
                              className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-gray-700 font-medium placeholder:text-gray-300"
                              placeholder="e.g. 12+ Years"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Specialization */}
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem className="space-y-2 md:col-span-2">
                        <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                          Specialization
                        </label>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <Award size={18} />
                            </span>
                            <input
                              {...field}
                              type="text"
                              className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-gray-700 font-medium placeholder:text-gray-300"
                              placeholder="e.g. Senior Neurosurgeon"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>

              <div className="flex gap-4 pt-4 border-t border-gray-50">
                <button
                  onClick={onClose}
                  type="button"
                  className="flex-1 py-4 px-6 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <Check size={20} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileUpdate;
