"use client";
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
import { IoPersonOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";
import { api } from "@/lib/apiCall";
import { showToast } from "@/lib/showToastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RegisterPage = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = zScehma
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      ConfirmPassword: z.string(),
      role: z.string(),
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

  const handleOnSubmit = async (values, e) => {
    try {
      setIsLoading(true);

      const res = await api.post("/create", values);

      // Success handling
      showToast("success", res.data.message || "Account created successfully");
      form.reset();
      router.push("/auth/login");
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";

      showToast("error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[600px]">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative background glows */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          {/* Floating transparent boxes */}
          <motion.div
            className="absolute top-12 left-8 w-20 h-20 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-32 right-12 w-14 h-14 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
            animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-24 left-16 w-16 h-16 rounded-xl bg-teal-400/10 border border-teal-400/20 backdrop-blur-sm"
            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-6 w-12 h-12 rounded-lg bg-blue-400/10 border border-blue-400/15 backdrop-blur-sm"
            animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          <div className="relative z-10 text-center px-8">
            <motion.h1
              className="text-4xl xl:text-5xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-teal-400">JHC</span> Clinic
            </motion.h1>
            <motion.p
              className="text-gray-400 text-lg mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Join our community. Your health, our priority.
            </motion.p>

            {/* Image Card with hover */}
            <motion.div
              className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl max-w-sm mx-auto cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileHover={{ scale: 1.04, boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}
            >
              <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-xl">
                <Image
                  src="/BGRegister.png"
                  alt="Hospital"
                  fill
                  className="object-cover rounded-xl transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h2 className="text-2xl font-bold text-white">
                <span className="text-teal-400">JHC</span> Clinic
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-500">Join the JHC Clinic community.</p>
            </div>

            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleOnSubmit)}
            >
              <Form {...form}>
                {/* Name & Email — side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              type="text"
                              placeholder="Full Name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <TfiEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              type="email"
                              placeholder="Email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password & Confirm Password — side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              type="password"
                              placeholder="Password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ConfirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              type={isPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                              onClick={() => setIsPassword(!isPassword)}
                            >
                              {isPassword ? (
                                <FaRegEyeSlash className="text-lg" />
                              ) : (
                                <FaRegEye className="text-lg" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Role select */}
                <FormField
                  control={form.control}
                  name="role"
                  defaultValue="patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full outline-none cursor-pointer text-gray-500 text-sm focus:border-gray-400 transition-colors appearance-none"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                        >
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>

              {/* Links row */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <a href="/auth/login" className="hover:text-gray-700 transition-colors">
                  Already have an account?
                </a>
                <a href="#" className="hover:text-gray-700 transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Register button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-xl text-white" />
                ) : (
                  <>
                    Register
                    <MdArrowForward className="text-lg" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-5">
              <hr className="grow border-gray-300" />
              <span className="mx-4 text-gray-400 text-sm">or</span>
              <hr className="grow border-gray-300" />
            </div>

            {/* Social login */}
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <img src="/Google.png" alt="Google" className="h-5 w-5 object-contain" />
                <span className="text-sm text-gray-600 hidden sm:inline">Google</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <img src="/Apple.png" alt="Apple" className="h-5 w-5 object-contain" />
                <span className="text-sm text-gray-600 hidden sm:inline">Apple</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <img src="/Facebook.png" alt="Facebook" className="h-5 w-5 object-contain" />
                <span className="text-sm text-gray-600 hidden sm:inline">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
