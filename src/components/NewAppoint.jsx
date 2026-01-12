"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Booking from "./Booking";

const appoint = [
  {
    id: 1,
    img: "/doc1.png",
    title: "Dr John Paulliston",
    desc: "Paediatrician",
    imagePostion: "left",
  },
  {
    id: 2,
    img: "/doc2.png",
    title: "Dr Joel Paulliston",
    desc: "Otolaryngologist",
    imagePostion: "right",
  },
  {
    id: 3,
    img: "/doc1.png",
    title: "Dr John Paulliston",
    desc: "Paediatrician",
    imagePostion: "left",
  },
  {
    id: 4,
    img: "/doc2.png",
    title: "Dr Joel Paulliston",
    desc: "Otolaryngologist",
    imagePostion: "right",
  },
  {
    id: 1,
    img: "/doc1.png",
    title: "Dr John Paulliston",
    desc: "Paediatrician",
    imagePostion: "left",
  },
  {
    id: 2,
    img: "/doc2.png",
    title: "Dr Joel Paulliston",
    desc: "Otolaryngologist",
    imagePostion: "right",
  },
  {
    id: 3,
    img: "/doc1.png",
    title: "Dr John Paulliston",
    desc: "Paediatrician",
    imagePostion: "left",
  },
  {
    id: 4,
    img: "/doc2.png",
    title: "Dr Joel Paulliston",
    desc: "Otolaryngologist",
    imagePostion: "right",
  },
  {
    id: 1,
    img: "/doc1.png",
    title: "Dr John Paulliston",
    desc: "Paediatrician",
    imagePostion: "left",
  },
  {
    id: 2,
    img: "/doc2.png",
    title: "Dr Joel Paulliston",
    desc: "Otolaryngologist",
    imagePostion: "right",
  },
  {
    id: 3,
    img: "/doc1.png",
    title: "Dr John Paulliston",
    desc: "Paediatrician",
    imagePostion: "left",
  },
  {
    id: 4,
    img: "/doc2.png",
    title: "Dr Joel Paulliston",
    desc: "Otolaryngologist",
    imagePostion: "right",
  },
];

const NewAppoint = () => {
  const [docId, setDocId] = useState();
  const [isActive, setIsActive] = useState(false);
  // const [isOpen, setIsActive]= useState(false)

  return (
    <div>
      <p className="font-semibold mt-3 sm:text-lg">
        Select a Doctor for Appointment
      </p>
      <div
        className={`space-y-3 my-5 flex flex-col px-5 max-h-[55vh] 2xl:max-h-[62vh] overflow-auto modern-scroll `}
      >
        {appoint.map((data, index) => (
          <Card
            onClick={() => setDocId(data.id)}
            key={index}
            className={`flex w-full md:w-[50%]  ${
              data.imagePostion === "right" ? "ml-auto" : "mr-auto "
            }  cursor-pointer ${docId === data.id ? "bg-[#7ab3ec]" : ""} py-2`}
          >
            <CardContent
              className={`flex gap-7 ${
                data.imagePostion === "left" ? "flex-row" : "flex-row-reverse"
              } items-center `}
            >
              <Image
                src={data.img}
                alt="doc"
                width={90}
                height={98}
                className="rounded-xl object-cover hidden sm:block"
              />
              <div>
                <h1 className="font-semibold sm:text-xl">{data.title}</h1>
                <p className="text-gray-700">{data.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        disabled={!docId}
        onClick={() => setIsActive(true)}
        className="w-full text-[#ffff] bg-[#3497F9] hover:bg-[#137ee9] cursor-pointer"
      >
        Continue
      </Button>
      {isActive && <Booking onClose={() => setIsActive(false)} />}
    </div>
  );
};

export default NewAppoint;
