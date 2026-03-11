"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSpinner,
  FaPills,
  FaFlask,
  FaDollarSign,
  FaBoxes,
  FaIndustry,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { medicineSchema } from "@/lib/zodSchema";
import { showToast } from "@/lib/showToastify";

const AddMedicineModal = ({ onClose, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: "",
      type: "Tablet",
      price: "",
      stock: "",
      expiry: undefined,
      manufacturer: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      // Simulate API call since backend might not have this endpoint yet
      // In a real scenario, this would be: await api.post("/inventory/add", values);
      await new Promise((resolve) => setTimeout(resolve, 800));

      onAdd({
        ...values,
        id: Date.now(), // Temporary ID
        expiry: values.expiry.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });

      showToast("success", "Medicine added to inventory");
      onClose();
    } catch (error) {
      showToast("error", "Failed to add medicine");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg"
        >
          <Card className="overflow-hidden border-none shadow-2xl">
            <div
              className="h-32 bg-[#3497F9] relative flex items-center justify-center overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-40 h-40 rounded-full bg-white"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-60 h-60 rounded-full bg-white"></div>
              </div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <FaPills /> Add Medicine
              </h2>
            </div>

            <CardContent className="p-6 pt-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 font-medium">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FaFlask className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                            <input
                              {...field}
                              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-gray-700"
                              placeholder="Enter medicine name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-medium">
                            Type
                          </FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-gray-700 cursor-pointer"
                            >
                              <option value="Tablet">Tablet</option>
                              <option value="Capsule">Capsule</option>
                              <option value="Syrup">Syrup</option>
                              <option value="Injection">Injection</option>
                              <option value="Inhaler">Inhaler</option>
                              <option value="Ointment">Ointment</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-medium">
                            Price ($)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                              <input
                                {...field}
                                type="number"
                                step="0.01"
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-gray-700"
                                placeholder="0.00"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-medium">
                            Stock Quantity
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FaBoxes className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                              <input
                                {...field}
                                type="number"
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-gray-700"
                                placeholder="Quantity"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-gray-600 font-medium mb-1">
                            Expiry Date
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 font-medium">
                          Manufacturer
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FaIndustry className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                            <input
                              {...field}
                              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-gray-700"
                              placeholder="Company name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 py-6 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-6 bg-[#3497F9] hover:bg-[#287bc8] text-white shadow-lg shadow-blue-200 rounded-xl transition-all"
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin text-xl" />
                      ) : (
                        "Add Product"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddMedicineModal;
