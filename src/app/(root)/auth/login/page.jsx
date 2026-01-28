"use client";
import { Card, CardContent } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/showToastify";

const LoginPage = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  // const { data: session, status } = useSession();
  // const handleOnSubmit = async (values) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await signIn("credentials", {
  //       redirect: false,
  //       email: values.email,
  //       password: values.password,
  //     });
  //     if (!res.ok) {
  //       showToast("error", "Invalid Credentials");
  //       return;
  //     }
  //     if (res?.error) {
  //       showToast("error", "Something went wrong");
  //       return;
  //     }
  //     if (res?.ok) {
  //       showToast("success", "Login successful");
  //       if (session?.role === "patient") {
  //         router.push("/user/home");
  //       }
  //       if (session?.role === "admin" || session?.role === "doctor") {
  //         router.push("/admin/dashboard");
  //       }
  //       form.reset();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     showToast("error", error?.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        showToast("error", "Something went wrong");
        return;
      }

      // Fetch latest session after sign in
      const sessionData = await getSession();
      if (!sessionData) {
        showToast("error", "Session not found");
        return;
      }

      // Role-based redirect
      if (sessionData?.role === "patient") {
        router.push("/user/home");
      } else if (
        sessionData?.role === "admin" ||
        sessionData?.role === "doctor"
      ) {
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
    <div className="flex min-h-screen py-5 px-4 bg-gray-100 ">
      <Card className=" flex h-full  w-140 lg:w-160 mx-auto p-0 overflow-hidden">
        <CardContent className="p-0">
          {/* bg-img  */}

          <div
            className="h-60  bg-center relative bg-no-repeat bg-cover clip-zigzag "
            style={{ backgroundImage: `url('/BG.png')` }}
          >
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white">
              LOGIN
            </h1>
          </div>

          {/* form  */}

          <form
            className="space-y-9 px-7 my-10 w-full"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <Form {...form}>
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
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <div className="relative">
                            <input
                              className="w-full pl-7 py-2 border-b  border-b-gray-400 outline-none text-gray-700"
                              type={isPassword ? "text" : "password"}
                              placeholder="Password"
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
                <p className="  text-gray-500 mt-3">
                  <span className="font-semibold">
                    <a href="/auth/register">Forgot Password?</a>
                  </span>
                </p>
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
                "Login"
              )}
            </Button>
          </form>

          <div className="flex items-center mb-3 mx-7">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-4 text-gray-500">or Login with</span>
            <hr className="flex-grow border-gray-400" />
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
              Don't have an Account?{" "}
              <span className="text-[#8DB9C3] hover:text-[#4e96a7] font-semibold">
                <a href="/auth/register">Sign up here</a>
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
