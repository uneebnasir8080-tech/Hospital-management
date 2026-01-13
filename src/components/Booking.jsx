"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Payment from "./Payment";

const slots = {
  morning: [
    { time: "9:30 AM", disabled: true },
    { time: "10:30 AM", disabled: true },
    { time: "11:00 AM", disabled: false },
    { time: "11:30 AM", disabled: true },
    { time: "12:00 PM", disabled: false },
  ],
  evening: [
    { time: "6:00 PM", disabled: true },
    { time: "6:30 PM", disabled: true },
    { time: "7:00 PM", disabled: false },
    { time: "7:30 PM", disabled: false },
    { time: "8:00 PM", disabled: true },
    { time: "8:30 PM", disabled: true },
    { time: "9:30 PM", disabled: true },
    { time: "10:00 PM", disabled: false },
    { time: "10:30 PM", disabled: false },
  ],
};

const Booking = ({ onClose, Loading }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [value, setValue] = useState("");
  const [payment, setPayment]= useState(false)
  const handleSubmit = () => {
    // console.log(selectedSlot);
    // console.log(value);
    setPayment(true)
    // onClose()
  };
  const renderSlots = (slotList) => (
    <div className="grid grid-cols-3 gap-3 mt-3">
      {slotList.map((slot) => {
        const isSelected = selectedSlot === slot.time;

        return (
          <button
            key={slot.time}
            disabled={slot.disabled}
            onClick={() => setSelectedSlot(slot.time)}
            className={`
              py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${
                slot.disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-500 text-white"
                  : "border border-blue-500 text-blue-500 hover:bg-blue-50"
              }
            `}
          >
            {slot.time}
          </button>
        );
      })}
    </div>
  );
  return (
    <>
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-150 flex items-center"
    >
      <Card
        className="flex mx-auto  w-200"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* heading  */}
          <div className="flex gap-2 pb-2">
            <button className="cursor-pointer" onClick={onClose}>
              <X size={20} />
            </button>
            <p className="font-medium text-lg">Book Appointment</p>
          </div>
          <hr />
          {/* input  */}{" "}
          <div className="mb-5 mt-3">
            <p className="text-gray-800 text-center text-lg font-semibold mb-10">
              Select a Slot for Appointment
            </p>
            <div className="grid grid-cols-2 items-center gap-20">
              {/* input calender */}
              <div className="flex flex-col">
                <label className=" text-gray-900 font-semibold text-start">
                  Appointment Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="text-gray-500 my-2 border-b border-black/80 py-1 px-2 outline-none"
                />
              </div>
              {/* time  */}
              <div>
                <div className="max-w-sm">
                  {/* Morning */}
                  <h3 className="font-semibold text-sm">Morning</h3>
                  {renderSlots(slots.morning)}

                  {/* Evening */}
                  <h3 className="font-semibold text-sm mt-6">Evening</h3>
                  {renderSlots(slots.evening)}
                </div>
              </div>
            </div>
          </div>
          {/* btns */}
          <hr />
          <div className="w-full mt-3">
            <Button
              onClick={() => handleSubmit()}
              disabled={!value || !selectedSlot}
              className="bg-[#7ab3ec] w-full hover:bg-[#1fb2d3] cursor-pointer "
            >
              {" "}
              {Loading && (
                <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
              )}
              Book Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
      {payment && <Payment onClose={onClose}/>}
      </>
  );
};

export default Booking;
