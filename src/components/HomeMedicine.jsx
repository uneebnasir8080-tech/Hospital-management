import React from "react";
import { Card, CardContent } from "./ui/card";

const medicine = [
  {
    id: 1,
    img: "/med1.png",
    title: "Buy Medicines",
  },
  {
    id: 2,
    img: "/med2.png",
    title: "Buy Medical Kits",
  },
  {
    id: 3,
    img: "/med1.png",
    title: "Buy Medicines",
  },
  {
    id: 4,
    img: "/med2.png",
    title: "Buy Medical Kits",
  },
];

const HomeMedicine = () => {
  return (
    <div className="flex justify-between flex-wrap mx-10 my-15 gap-3">
      {medicine.map((data, index) => (
        <div key={index} className="">
          <div className="space-y-2">
            <p className="font-semibold text-black/70">{data.title}</p>

            <a href="#">
              {" "}
              <img src={data.img} alt="" className="h-25" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeMedicine;
