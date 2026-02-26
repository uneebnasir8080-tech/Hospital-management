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

const ProfileUpdate = ({ response, onClose }) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

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

  //   const handleOnSubmit = async (values) => {
  //     try {
  //       setIsLoading(true);
  //       const formData = new FormData();
  //       console.log(values)
  //       if (values.profileImage) {
  //         // new image selected
  //         formData.append("profileImage", values.profileImage);
  //       } else if (preview) {
  //         // no new image, send old URL
  //         formData.append("oldProfileImage", preview);
  //       }

  //       // append other fields
  //       formData.append("name", values.name);
  //       formData.append("age", values.age);
  //       formData.append("gender", values.gender);
  //       formData.append("experience", values.experience);
  //       formData.append("specialization", values.specialization);

  //       const res = await api.put("/update-user", formData, {
  //         params: { id: data?.id },
  //         headers: {
  //           Authorization: `Bearer ${data?.token}`,
  //         },
  //       });

  //       showToast("success", res.data.message);
  //     } catch (error) {
  //       showToast("error", error.response?.data?.message || "Update failed");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

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
      onClose();
    } catch (error) {
      showToast("error", error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="py-8 px-4 fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <Card className="w-full max-w-lg overflow-hidden p-0">
        <CardContent className="p-0">
          {/* Header */}
          <div className="h-20 bg-blue-500 flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-white">
              Update Profile
            </h1>
          </div>

          {/* Form */}
          <form
            className="space-y-2 px-6 py-6"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <Form {...form}>
              {/* Profile Image */}
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <div className="flex flex-col items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Profile Image
                    </label>
                    <div
                      onClick={() =>
                        document.getElementById("profileInput").click()
                      }
                      className="w-28 h-28 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                      <input
                        id="profileInput"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFile(e.target.files[0], field)}
                      />
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-500 text-center px-2">
                          Click to Upload
                        </span>
                      )}
                    </div>
                    <FormMessage />
                  </div>
                )}
              />

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <FormControl>
                      <input
                        {...field}
                        className="w-full py-2 px-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <FormControl>
                      <input
                        {...field}
                        type="date"
                        className="w-full py-2 px-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
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
                  <FormItem>
                    <label className="text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
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
                  <FormItem>
                    <label className="text-sm font-medium text-gray-700">
                      Experience
                    </label>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        className="w-full py-2 px-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g. 5 Years"
                      />
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
                  <FormItem>
                    <label className="text-sm font-medium text-gray-700">
                      Specialization
                    </label>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        className="w-full py-2 px-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g. Cardiologist"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={onClose}
                type="button"
                variant="outline"
                className="grow"
              >
                Close
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="grow bg-blue-400 hover:bg-blue-500 cursor-pointer text-white"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileUpdate;
