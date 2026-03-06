"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { getSession, signIn, useSession } from "next-auth/react";
import { zScehma } from "@/lib/zodSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import z from "zod";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/showToastify";
import { useStore } from "@/store/store";
import Image from "next/image";

const LoginPage = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  const formSchema = zScehma
    .pick({
      email: true,
    })
    .extend({
      password: z.string(),
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleOnSubmit = async (values) => {
    try {
      setIsLoading(true);

      // Sign in with credentials
      const res = await signIn("credentials", {
        redirect: false, // we handle redirect manually
        email: values.email,
        password: values.password,
      });
      if (!res.ok) {
        showToast("error", "Invalid Credentials");
        return;
      }
      if (res?.error) {
        showToast("error", res?.error || "Something went wrong");
        return;
      }

      // Fetch latest session after sign in
      const sessionData = await getSession();
      if (!sessionData) {
        showToast("error", "Session not found");
        return;
      }
      setUser({
        name: sessionData.name,
        email: sessionData.email,
        role: sessionData.role,
      });

      // Role-based redirect
      if (sessionData?.role === "patient") {
        if (sessionData?.message === "Profile Incomplete") {
          router.push("/patientData");
          return
        }
        router.push("/user/home");


      } else if (sessionData?.role === "admin") {
        if (sessionData?.message === "Profile Incomplete") {
          router.push("/adminData");
          return
        }
        router.push("/admin/dashboard");
      } else if (sessionData?.role === "doctor") {
        if (sessionData?.message === "Profile Incomplete") {
          router.push("/doctorData");
          return
        }
        router.push("/admin/dashboard");
      }

      showToast("success", "Login successful");
      form.reset();
    } catch (error) {
      console.error(error);
      showToast("error", error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[600px]">
        {/* Left Panel — Branding */}
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
              Welcome back. Your health, our priority.
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
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-500">Sign in to your JHC Clinic account.</p>
            </div>

            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleOnSubmit)}
            >
              <Form {...form}>
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <TfiEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                          <input
                            className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
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

                {/* Password */}
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              className="w-full pl-10 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-full outline-none text-gray-700 text-sm placeholder-gray-400 focus:border-gray-400 transition-colors"
                              type={isPassword ? "text" : "password"}
                              placeholder="Password"
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
              </Form>

              {/* Links row */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <a href="/auth/register" className="hover:text-gray-700 transition-colors">
                  Don't have an account?
                </a>
                <a href="#" className="font-semibold hover:text-gray-700 transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-xl text-white" />
                ) : (
                  <>
                    Login
                    <MdArrowForward className="text-lg" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
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

export default LoginPage;
