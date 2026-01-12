import React from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import QRCode from "react-qr-code";

const BookedData = ({ onClose, Loading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-150 flex items-center">
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
          <div className="mb-5 mt-3 flex flex-3 gap-10">
            {/* card and data  */}
            <div className=" flex flex-col flex-2 my-auto">
              <Card className="p-0">
                <CardContent className="flex flex-row-reverse items-center gap-4">
                  <Image src="/doc1.png" height={20} width={120} alt="doctor" />
                  <div className="w-full">
                    <h1 className="font-semibold">Dr Joel Paulliston</h1>
                    <p className="text-sm text-gray-600">Otolarynologist</p>
                    <div className="flex text-xs gap-2 my-1 text-gray-600">
                      <p className="flex gap-1">
                        <SlCalender /> 22-Dec-22
                      </p>
                      <p className="flex gap-1">
                        <CiClock2 /> 7:30 pm
                      </p>
                    </div>
                    <p className="text-sm">$280</p>
                  </div>
                  <div></div>
                </CardContent>
              </Card>
              <div className="flex justify-between px-5 py-2">
                <p className="my-1 text-sm text-gray-600">
                  FLOOR{" "}
                  <span className="text-black px-2  font-semibold">Ground</span>
                </p>
                <p className="my-1 text-sm text-gray-600">
                  ROOM NO{" "}
                  <span className="text-black px-2 font-semibold">G 02</span>
                </p>
              </div>
            </div>
            {/* qr code scanner */}
            <div className="w-[50%]">
              <div className="flex items-center w-full my-6">
                <div className="flex-grow border-t border-gray-300"></div>

                <span className="mx-4 text-xs font-medium text-gray-500 whitespace-nowrap">
                  SCAN QR CODE AT RECEPTION
                </span>

                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="flex justify-center my-2">
                <QRCode
                  size={100}
                  bgColor="white"
                  color="black"
                  value="appointment"
                />
              </div>
            </div>
          </div>
          {/* btns */}
          <hr />
          <div className="w-full mt-3">
            <Button
              onClick={onClose}
              disabled={Loading}
              className="bg-[#7ab3ec] w-full hover:bg-[#1fb2d3] cursor-pointer "
            >
              {" "}
              {Loading && (
                <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
              )}
              Download Recipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookedData;
