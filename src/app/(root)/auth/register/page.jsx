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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import z from "zod";
import { Button } from "@/components/ui/button";
import { IoPersonOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { api } from "@/lib/apiCall";
import { showToast } from "@/lib/showToastify";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const formSchema = zScehma
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      ConfirmPassword: z.string(),
      role:z.string(),
    })
    .refine((data) => data.password === data.ConfirmPassword, {
      message: "Password and confirm password must be same",
      path: ["ConfirmPassword"],
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
    },
  });

  const handleOnSubmit = async(values, e) => {
    try {
    setIsLoading(true);

    const res = await api.post("/create", values);
    
    // Success handling
    showToast("success", res.data.message || "Account created successfully");
    form.reset();
     router.push("/auth/login")   
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong. Please try again.";

    showToast("error", message);
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
            className="h-60  bg-center relative bg-no-repeat bg-cover clip-zigzag "
            style={{ backgroundImage: `url('/BGRegister.png')` }}
          >
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white">
              SIGN UP
            </h1>
          </div>

          {/* form  */}

          <form
            className="space-y-3 px-7 my-5 w-full"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <Form {...form}>
              <div className="">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <input
                            className="pl-7 w-full py-2 border-b border-b-gray-400 outline-none text-gray-700"
                            type="text"
                            placeholder="Name"
                            {...field}
                          />
                          <IoPersonOutline className="absolute top-1/4  text-lg text-gray-700" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <input
                            className=" w-full pl-7 py-2 border-b border-b-gray-400 outline-none text-gray-700"
                            type="email"
                            placeholder="example@gmaail.com"
                            {...field}
                          />
                          <TfiEmail className="absolute top-1/4  text-lg text-gray-700" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <input
                            className="pl-7 w-full py-2 border-b border-b-gray-400 outline-none text-gray-00"
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                          <CiLock className="absolute top-1/4  text-xl text-black" />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="ConfirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <div className="relative">
                            <input
                              className="w-full pl-7 py-2 border-b  border-b-gray-400 outline-none text-gray-700"
                              type={isPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              {...field}
                            />
                            <CiLock className="absolute top-1/4  text-xl text-black" />
                          </div>
                        </FormControl>
                        <button
                          type="button"
                          className="absolute bottom-3 right-4 cursor-pointer "
                          onClick={() => setIsPassword(!isPassword)}
                        >
                          {isPassword ? (
                            <FaRegEyeSlash className="text-xl" />
                          ) : (
                            <FaRegEye className="text-xl" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="role"
                  defaultValue="patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <select
                            {...field}
                            className="w-full pl-3 py-2 border-b border-b-gray-400 outline-none cursor-pointer text-gray-500 bg-transparent"
                          >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-[#3497F9] py-5 text-lg  hover:bg-[#106ecc] cursor-pointer w-full mt-2`}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-2xl text-white" />
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="flex items-center mb-3 mx-7">
            <hr className="grow border-gray-400" />
            <span className="mx-4 text-gray-500">or sign up with</span>
            <hr className="grow border-gray-400" />
          </div>
          <div className="flex justify-center gap-9">
            <a href="#">
              <img src="/Google.png" alt="" className="h-20" />
            </a>
            <a href="#">
              <img src="/Apple.png" alt="" className="h-20" />
            </a>
            <a href="#">
              <img src="/Facebook.png" alt="" className="h-20" />
            </a>
          </div>
          <div>
            <p className="text-center text-gray-500 my-4">
              Have an Account?{" "}
              <span className="text-[#8DB9C3] hover:text-[#4e96a7] font-semibold">
                <a href="/auth/login">Login here</a>
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
