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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const ProfileUpdate = ({ response }) => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Form schema using Zod
  const formSchema = zScehma
    .pick({ name: true })
    .extend({
      profileImage: z
        .instanceof(File, { message: "Image is required" })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "Max file size is 5MB",
        })
        .refine(
          (file) =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
              file.type
            ),
          { message: "Only JPG, PNG, WEBP allowed" }
        ),
      age: z.string().min(1, "Age is required"),
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Please select a gender" }),
      }),
    });

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: undefined,
      name: "",
      age: "",
      gender: undefined,
    },
  });

  // Update form values whenever `response` changes
  useEffect(() => {
    if (response) {
      form.reset({
        name: response.name || "",
        age: response.doctor?.age || "",
        gender: response.doctor?.gender || undefined,
        profileImage: undefined,
      });

      if (response.doctor?.profile) {
        setPreview(response.doctor.profile);
      }
    }
  }, [response, form]);

  // Handle image upload & preview
  const handleFile = (file, field) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    field.onChange(file);
  };

  // Submit form
  const handleOnSubmit = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (values.profileImage) formData.append("profileImage", values.profileImage);
      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("gender", values.gender);

      const res = await api.post("/patient", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data?.token}`,
        },
      });

      showToast("success", res.data.message);
      form.reset(values); // reset form with submitted values
    } catch (error) {
      showToast("error", error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <Card className="w-full max-w-lg p-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="h-24 relative bg-blue-400 flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-white">Profile</h1>
          </div>

          {/* Form */}
          <form
            className="space-y-6 px-6 py-6"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <Form {...form}>
              {/* Profile Image */}
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <div className="flex justify-center mb-4">
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFile(e.dataTransfer.files[0], field);
                      }}
                      onClick={() => document.getElementById("profileInput").click()}
                      className="w-28 h-28 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden"
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
                        <span className="text-xs text-gray-500 text-center px-2">
                          Upload Profile Picture
                        </span>
                      )}
                    </div>
                  </div>
                )}
              />

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        className="w-full py-2 border-b px-2 border-gray-400 outline-none text-gray-900"
                        type="text"
                        placeholder="Name"
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
                    <FormControl>
                      <input
                        {...field}
                        type="date"
                        className="w-full py-2 border-b border-gray-400 outline-none text-gray-900"
                        placeholder="Date of Birth"
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full py-2 border-0 border-b border-gray-400 rounded-none text-gray-900">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Form>
            <div className="flex gap-3">
                <Button className="grow ">
                Close
            </Button>
                 <Button
              type="submit"
              disabled={isLoading}
              className=" py-3 text-lg grow bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : "Update"}
            </Button>
            
            </div>
           
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileUpdate;