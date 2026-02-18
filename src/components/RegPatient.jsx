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
import {  FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoPersonOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { api } from "@/lib/apiCall";
import { showToast } from "@/lib/showToastify";
import { useRouter } from "next/navigation";
import RegData from "./RegData";

const RegPatient = ({onClose}) => {
  const [isLoading, setIsLoading] = useState(false);
  const[storeId, setStoreId]= useState()
  const [next, setNext]= useState(false)

  const formSchema = zScehma
    .pick({
      name: true,
      email: true,
      password: true,
    })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async(values, e) => {
    try {
    setIsLoading(true);

    const res = await api.post("/create", values);
    const ids= res?.data.data.id
    setStoreId(ids)
    // Success handling
    showToast("success", res.data.message || "Account created successfully");
    form.reset();
    setNext(()=>!next)
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong. Please try again.";

    showToast("error", message);
  } finally {
    setIsLoading(false);
  }
  };
  return (
    <div className="fixed inset-0 bg-black/20 z-150 flex items-center">

      {!next && <Card className=" flex  w-90 lg:w-120 mx-auto p-0 overflow-hidden">
        <CardContent className="p-0">
          {/* bg-img  */}
          <div
            className="h-40  bg-center relative bg-no-repeat bg-cover clip-zigzag "
            style={{ backgroundImage: `url('/BGRegister.png')` }}
          >
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white">
              Register
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
                            
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
            <div className="flex justify-between mt-2">
                <Button onClick={onClose} className="w-50 cursor-pointer">Close</Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-[#3497F9] py-5 text-lg w-50 hover:bg-[#106ecc] cursor-pointer`}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-2xl text-white" />
              ) : (
                "Next"
              )}
            </Button>
            
            </div>
          </form>
        </CardContent>
      </Card>}
      {next && <RegData onClose={onClose} ids={storeId}/>}
    </div>
  );
};

export default RegPatient;
