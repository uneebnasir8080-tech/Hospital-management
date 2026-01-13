import React from "react";
import { Card, CardContent } from "./ui/card";
import { FaArrowLeft } from "react-icons/fa";
import { id } from "zod/v4/locales";

const history = [
  {
    date: "November 28",
    payment: [{ pay: "29", desc: "Doctor fee" }],
  },
  {
    date: "November 28",
    payment: [
      { pay: "29", desc: "Doctor fee" },
      { pay: "29", desc: "Doctor fee" },
    ],
  },
  {
    date: "November 28",
    payment: [{ pay: "29", desc: "Doctor fee" }],
  },
];

const PaymentHistory = ({ onClose, onOpen }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/20 z-150 flex items-center"
    >
      <Card
        className="flex sm:mx-auto w-130 mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* heading  */}
          <div className="flex gap-2 pb-2">
            <button className="cursor-pointer" onClick={onOpen}>
              <FaArrowLeft size={20} />
            </button>
            <p className="font-medium text-lg">Payment History</p>
          </div>
          <hr />
          {/* input  */}{" "}
          <div className="max-h-50 sm:max-h-80 overflow-auto modern-scroll">
            {history.map((data, index) => (
              <div className="my-5 space-y-5 " key={index}>
                <div className="flex items-center w-full my-6">
                  <div className="flex-grow border-t border-dashed border-gray-400"></div>
                  <span className="mx-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                    {data.date}
                  </span>
                  <div className=" flex-grow border-t border-dashed border-gray-400"></div>
                </div>
                {/* data  */}
                {data.payment.map((items, index) => (
                  <div className="flex " key={index}>
                    <div className="bg-blue-300 flex px-3 py-2 rounded-xl items-center gap-3 grif grid-cols-1 mx-auto">
                      <p className="font-semibold text-lg ">${items.pay}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* btns */}
          <hr />
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;
