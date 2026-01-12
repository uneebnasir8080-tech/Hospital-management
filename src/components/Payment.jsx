"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { BsCash } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { SiApple } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import BookedData from "./BookedData";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: <IoCardOutline /> },
  { id: "apple", label: "Apple Pay", icon: <SiApple /> },
  { id: "google", label: "Google Pay", icon: <FaGoogle /> },
  { id: "cod", label: "Cash on Delivery", icon: <BsCash /> },
  { id: "wallet", label: "Wallet (₹500)", icon: <FaWallet /> },
];

const Payment = ({ onClose, Loading }) => {
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [inClick, setInClick] = useState("amount");
  return (
    <div className="fixed inset-0 bg-black/50 z-150 flex items-center">
      {inClick === "amount" && (
        <Card className="flex mx-auto  w-200">
          <CardContent>
            {/* heading  */}
            <div className="flex gap-2 pb-2">
              <button className="cursor-pointer" onClick={onClose}>
                <X size={20} />
              </button>
              <p className="font-medium text-lg">Checkout</p>
            </div>
            <hr />
            {/* input  */}{" "}
            <div className="mb-5 mt-3 flex flex-2 gap-10">
              {/* card and data  */}
              <div>
                <Card className="p-0">
                  <CardContent className="flex items-center gap-4">
                    <Image
                      src="/doc1.png"
                      height={20}
                      width={120}
                      alt="doctor"
                    />
                    <div>
                      <h1 className="font-semibold">Dr Joel Paulliston</h1>
                      <p className="text-sm text-gray-600">Otolarynologist</p>
                    </div>
                  </CardContent>
                </Card>
                <p className="my-1 text-sm text-gray-600">
                  Appointment Date:{" "}
                  <span className="text-black px-2">08th Dec 2022</span>
                </p>
                <p className="my-1 text-sm text-gray-600">
                  Appointment Time:{" "}
                  <span className="text-black px-2">11:30 Am</span>
                </p>
              </div>
              <div className="w-[50%]">
                <h1 className="text-gray-600 my-2">Booking Summary</h1>
                <hr />
                <div className="flex justify-between my-1 text-gray-600">
                  <p>Booking Charges</p>
                  <p>$250</p>
                </div>
                <div className="flex justify-between my-2 text-gray-600">
                  <p>GST</p>
                  <p>$30</p>
                </div>
                <div className="flex justify-between mt-7 ">
                  <p className="font-semibold">Total</p>
                  <p className="text-blue-400">$280</p>
                </div>
              </div>
            </div>
            {/* btns */}
            <hr />
            <div className="w-full mt-3">
              <Button
                onClick={() => setInClick("method")}
                disabled={Loading}
                className="bg-[#7ab3ec] w-full hover:bg-[#1fb2d3] cursor-pointer "
              >
                {" "}
                {Loading && (
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
                )}
                Proceed to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {inClick === "method" && (
        <Card className="flex mx-auto  w-200">
          <CardContent>
            {/* heading  */}
            <div className="flex gap-2 pb-2">
              <button className="cursor-pointer" onClick={onClose}>
                <X size={20} />
              </button>
              <p className="font-medium text-lg">Payment Methods</p>
            </div>
            <hr />
            {/* input  */}{" "}
            <div className="mb-5 mt-3 flex flex-col  gap-7">
              {paymentMethods.map((data, index) => (
                <div key={index} className="">
                  <label
                    className={`flex justify-between border-2 ${
                      selectedMethod === data.id
                        ? "border-blue-500"
                        : "border-black/50"
                    } rounded-lg py-2 px-7 transition`}
                  >
                    <div className="flex items-center gap-4 text-lg">
                      {data.icon}
                      <h1>{data.label}</h1>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={data.id}
                      checked={selectedMethod === data.id}
                      onChange={() => setSelectedMethod(data.id)}
                    />
                  </label>
                </div>
              ))}
            </div>
            {/* btns */}
            <hr />
            <div className="w-full mt-3">
              <Button
                onClick={() => setInClick("data")}
                disabled={Loading}
                className="bg-[#7ab3ec] w-full hover:bg-[#1fb2d3] cursor-pointer "
              >
                {" "}
                {Loading && (
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
                )}
                Confirm Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {inClick === "data" && <BookedData onClose={onClose} />}
    </div>
  );
};

export default Payment;
