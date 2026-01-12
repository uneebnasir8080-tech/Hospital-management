import React from "react";
import { Card, CardContent } from "./ui/card";
import { RiTimer2Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdPayments } from "react-icons/md";

const ProfileModal = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/20 z-150 flex items-center"
    >
      <Card
        className="flex mx-auto min-w-130"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* heading  */}
          <hr />
          {/* input  */}{" "}
          <div className="mb-5 mt-3 space-y-5">
            <p className="flex items-center text-xl gap-3 text-gray-700">
              <RiTimer2Line />
              My activity
            </p>
            <p className="flex items-center text-xl gap-3 text-gray-700">
              <IoMdSettings />
              Settings
            </p>
            <p className="flex items-center text-xl gap-3 text-gray-700"> 
              <MdPayments />
              Payment History
            </p>
          </div>
          {/* btns */}
          <hr />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileModal;
