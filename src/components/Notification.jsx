import React from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import Image from "next/image";

const notification = [
  {
   id: 1,
   img:"/doc2.png",
   title:"Medicine Fee",
   payment:"500",
   time:"18 mins ago"
  },
  {
    id: 1,
   img:"/doc1.png",
   title:"Medicine Fee",
   payment:"500",
   time:"18 mins ago"
  },
  {
   id: 1,
   img:"/doc1.png",
   title:"Medicine Fee",
   payment:"500",
   time:"18 mins ago"
  },
  {
    id: 1,
   img:"/doc1.png",
   title:"Medicine Fee",
   payment:"500",
   time:"18 mins ago"
  },
  {
   id: 1,
   img:"/doc1.png",
   title:"Medicine Fee",
   payment:"500",
   time:"18 mins ago"
  },
   
];

const Notification = ({onClose}) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/90  z-150 flex items-center"
    >
      <Card
        className="flex sm:mx-auto w-130 mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          {/* heading  */}
          <div className="flex gap-2 pb-2">
            <button className="cursor-pointer" onClick={onClose}>
              <X size={25} />
            </button>
            <p className="font-medium text-lg">Notification</p>
          </div>
          <hr />
          {/* input  */}{" "}
          <div className="max-h-50 sm:max-h-80 overflow-auto modern-scroll">
            {notification.map((data, index) => (
                <div key={index } className="flex flex-3 border-b border-dashed border-gray-500">
                  {/* img  */}
                  <div className=" flex-1 flex justify-center ">
                    <Image src={data.img} width={90} height={20} alt="Doc" className=" rounded-full"/>
                  </div>
                  {/* data  */}
                  <div className="flex-1 space-y-1 my-auto">
                    <p className="font-semibold text-lg">{data.title}</p>
                    <p className="font-medium">${data.payment}</p>
                  </div>
                  {/* time  */}
                  <div className="flex-1 text-gray-600 mt-5">
                    {data.time}
                  </div>
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

export default Notification;
