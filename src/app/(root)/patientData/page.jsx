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
import z from "zod";
import { Button } from "@/components/ui/button";
const PatientData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = zScehma
    .pick({
      name: true,
    })
    .extend({
      date: z.string().min(1, "Date is required"),
      number: z
        .string()
        .regex(/^\d{10,15}$/, "Phone number must be 10–15 digits"),
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Please select a gender" }),
      }),
      blood: z.string(),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      number: "",
      gender: "",
      blood: "",
    },
  });

  const handleOnSubmit = (values, e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      console.log(values);
      form.reset();
    } catch (error) {
      console.log("error");
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
              <div className="">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="pl-7 w-full py-2 border-b border-b-gray-400 outline-none text-gray-700"
                          type="text"
                          placeholder="Your Name"
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
                  name="date"
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
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="pl-7 w-full py-2 border-b border-b-gray-400 outline-none text-gray-00"
                          type="number"
                          placeholder="Mobile Number"
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
                          )
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
