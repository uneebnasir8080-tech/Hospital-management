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
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Camera,
  X,
  User,
  Calendar,
  Droplet,
  FileText,
  UserCircle2,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PatientProfile = ({ response, onClose }) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const router = useRouter();



const formSchema = useMemo(() => {
  return zScehma.pick({ name: true })
    .extend({
      profileImage: z.instanceof(File).optional(),
      age: z.string().min(1, "Age is required"),
      gender: z.enum(["male","female","other"]).or(z.literal("")),
      blood: z.string().optional(),
      history: z.string().optional(),
      experience: z.string().optional(),
      specialization: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (response?.patient) {
        if (!data.blood) {
          ctx.addIssue({ path:["blood"], message:"Blood is required", code:"custom"});
        }
        if (!data.history) {
          ctx.addIssue({ path:["history"], message:"History is required", code:"custom"});
        }
      }

      if (response?.doctor) {
        if (!data.experience) {
          ctx.addIssue({ path:["experience"], message:"Experience is required", code:"custom"});
        }
        if (!data.specialization) {
          ctx.addIssue({ path:["specialization"], message:"Specialization is required", code:"custom"});
        }
      }
    });
}, [response]);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: undefined,
      name: "",
      age: "",
      gender: "",
      blood: "",
      history: "",
      experience: "",
      specialization: "",
    },
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!response) return ;
    form.reset({
      name: response.name || "",
      age: response.patient?.age || response.doctor?.age || "",
      gender: response?.patient?.gender || response?.doctor?.gender || "",
      blood: response.patient?.blood || "",
      history: response.patient?.history || "",
      experience: response?.doctor?.experience || "",
      specialization: response?.doctor?.specialization || "",
      profileImage: undefined,
    });
    if (response.patient?.profile) {
      setPreview(response.patient.profile);
    }
    if (response.doctor?.profile) {
      setPreview(response.doctor.profile);
    }

    setInitialized(true);
  }, [response, initialized, form]);

  const handleFile = (file, field) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    field.onChange(file);
  };

  const handleOnSubmit = async (values) => {
    try {
      console.log("values are :", values);
      setIsLoading(true);
      const formData = new FormData();

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("gender", values.gender);
      formData.append("history", values.history);
      formData.append("blood", values.blood);
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
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative h-32 bg-linear-to-r from-blue-600 to-indigo-700 p-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <UserCircle2 size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight uppercase">
                Update Profile
              </h2>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80">
                Patient Access Hub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 md:p-10 max-h-[75vh] overflow-y-auto modern-scroll">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-10"
            >
              {/* Profile Image Section */}
              <div className="flex flex-col items-center">
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-xl relative bg-slate-100">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <User size={48} />
                          </div>
                        )}

                        {/* Overlay */}
                        <div
                          onClick={() =>
                            document.getElementById("profileInput").click()
                          }
                          className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-[2px]"
                        >
                          <Camera className="text-white" size={32} />
                        </div>
                      </div>

                      <input
                        id="profileInput"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFile(e.target.files?.[0], field)}
                      />

                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                        <Camera size={16} />
                      </div>
                    </div>
                  )}
                />
                <p className="mt-4 text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                  Click to update avatar
                </p>
                <FormMessage className="mt-2" />
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <label className="flex items-center gap-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest pl-1">
                        <User size={14} className="text-blue-500" />
                        Full Legal Name
                      </label>
                      <FormControl>
                        <input
                          {...field}
                          className="capitalize w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                          type="text"
                          placeholder="John Paulliston"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <label className="flex items-center gap-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest pl-1">
                        <Calendar size={14} className="text-blue-500" />
                        Date of Birth
                      </label>
                      <FormControl>
                        <input
                          {...field}
                          type="date"
                          className="w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                        />
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
                      <label className="flex items-center gap-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest pl-1">
                        <User size={14} className="text-blue-500" />
                        Gender Identity
                      </label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ||''}
                      >
                        <SelectTrigger className="w-full h-14.5 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent className="z-100 rounded-2xl border-slate-100 shadow-2xl">
                          <SelectItem value="male" className="py-3 font-bold">
                            Male
                          </SelectItem>
                          <SelectItem value="female" className="py-3 font-bold">
                            Female
                          </SelectItem>
                          <SelectItem value="other" className="py-3 font-bold">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Blood Group for paitent */}
                {response?.patient && (
                  <FormField
                    control={form.control}
                    name="blood"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <label className="flex items-center gap-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest pl-1">
                          <Droplet size={14} className="text-blue-500" />
                          Blood Type
                        </label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ||''}
                        >
                          <SelectTrigger className="w-full h-14.5 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700">
                            <SelectValue placeholder="Group" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl z-100 overflow-auto border-slate-100 shadow-2xl">
                            {[
                              "A+",
                              "A-",
                              "B+",
                              "B-",
                              "AB+",
                              "AB-",
                              "O+",
                              "O-",
                            ].map((group) => (
                              <SelectItem
                                key={group}
                                value={group}
                                className="py-3 font-bold"
                              >
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Experience for doctor */}
                {response?.doctor && (
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <label className="flex items-center gap-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest pl-1">
                          <User size={14} className="text-blue-500" />
                          Experience
                        </label>
                        <FormControl>
                          <input
                            {...field}
                            className="capitalize w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                            type="text"
                            placeholder="10 Years"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Specialization for doctor  */}
                {response?.doctor && (
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest pl-1">
                          <User size={14} className="text-blue-500" />
                          Specialization
                        </label>
                        <FormControl>
                          <input
                            {...field}
                            className="capitalize w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                            type="text"
                            placeholder="Dentist"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* History for patient */}
                {response?.patient && (
                  <FormField
                    control={form.control}
                    name="history"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 space-y-2">
                        <label className="flex items-center gap-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest pl-1">
                          <FileText size={14} className="text-blue-500" />
                          Short Medical Summary
                        </label>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={3}
                            className="w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 resize-none"
                            placeholder="e.g. Any current allergies or chronic conditions..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={onClose}
                  type="button"
                  className="flex-1 py-4 px-6 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-2xl transition-all active:scale-95"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-2 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Synchronizing...</span>
                    </>
                  ) : (
                    <span>Commit Changes</span>
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientProfile;
