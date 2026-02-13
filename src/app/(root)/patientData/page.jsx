"use client";
import { Card, CardContent } from "@/components/ui/card";
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
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ImageDropField from "@/components/ImageDropField";
import { showToast } from "@/lib/showToastify";
import { api } from "@/lib/apiCall";
import { useRouter } from "next/navigation";
const PatientData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();
  const [preview, setPreview] = useState(null);
  const router= useRouter()
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
    // store file url in form
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
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data?.token}`,
        },
      });

      showToast("success", res.data.message);
      router.push('/user/home')
      form.reset();
    } catch (error) {
      showToast("error", error.response?.data?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen py-8 px-4 bg-gray-100 ">
      <Card className=" flex  w-140 lg:w-160 h-full mx-auto p-0 overflow-hidden">
        <CardContent className="p-0">
          {/* bg-img  */}

          <div
            className="h-65  bg-center relative bg-no-repeat bg-cover clip-zigzag "
            style={{ backgroundImage: `url('/patient.png')` }}
          >
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white">
              PATIENT DETAILS
            </h1>
          </div>

          {/* form  */}

          <form
            className="space-y-6 px-7 my-5 w-full"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <Form {...form}>
              {/* <ImageDropField form={form} /> */}
              <div>
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <div className="flex justify-center m-0">
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleFile(e.dataTransfer.files[0], field);
                        }}
                        onClick={() =>
                          document.getElementById("profileInput").click()
                        }
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
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name=""
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="capitalize cursor-not-allowed pl-7 w-full py-2 border-b border-b-gray-400 outline-none placeholder:text-black/50"
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
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className=" w-full pl-7 py-2 border-b border-b-gray-400 outline-none text-gray-700"
                          type="date"
                          placeholder="Date of Birth"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="history"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="pl-7 w-full py-2 border-b border-b-gray-400 outline-none text-gray-00"
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
              <div>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full pl-7 py-2 border-0 border-b border-b-gray-400 outline-none  rounded-none text-gray-700 text-md ">
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
              </div>
              <div>
                <FormField
                  name="blood"
                  control={form.control}
                  rules={{ required: "Blood group is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className=" w-full border-0 border-b border-b-gray-400 pl-7 py-2 rounded-none">
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
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-[#3497F9] py-5 text-lg  hover:bg-[#106ecc] cursor-pointer w-full mt-12 mb-5`}
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

export default PatientData;
