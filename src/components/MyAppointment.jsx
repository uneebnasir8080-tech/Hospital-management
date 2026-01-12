import React from "react";
import { Card, CardContent } from "./ui/card";
import { SlCalender } from "react-icons/sl";

const cardData = [
  {
    id: 1,
    img: "/doc1.png",
    title: "Dr John Patulliston",
    desc: "Paediatrician",
    date: "04-Dec-22",
    time: "9:30 Am",
  },
  {
    id: 2,
    img: "/doc2.png",
    title: "Dr Joel Patulliston",
    desc: "Otolaryngologist",
    date: "08-Dec-22",
    time: "11:30 Am",
  },
  {
    id: 3,
    img: "/doc1.png",
    title: "Dr John Patulliston",
    desc: "Paediatrician",
    date: "04-Dec-22",
    time: "9:30 Am",
  },
  {
    id: 4,
    img: "/doc2.png",
    title: "Dr Joel Patulliston",
    desc: "Otolaryngologist",
    date: "08-Dec-22",
    time: "11:30 Am",
  },
  {
    id: 5,
    img: "/doc1.png",
    title: "Dr John Patulliston",
    desc: "Paediatrician",
    date: "04-Dec-22",
    time: "9:30 Am",
  },
  {
    id: 6,
    img: "/doc2.png",
    title: "Dr Joel Patulliston",
    desc: "Otolaryngologist",
    date: "08-Dec-22",
    time: "11:30 Am",
  },
  {
    id: 1,
    img: "/doc1.png",
    title: "Dr John Patulliston",
    desc: "Paediatrician",
    date: "04-Dec-22",
    time: "9:30 Am",
  },
  {
    id: 2,
    img: "/doc2.png",
    title: "Dr Joel Patulliston",
    desc: "Otolaryngologist",
    date: "08-Dec-22",
    time: "11:30 Am",
  },
  {
    id: 3,
    img: "/doc1.png",
    title: "Dr John Patulliston",
    desc: "Paediatrician",
    date: "04-Dec-22",
    time: "9:30 Am",
  },
  {
    id: 4,
    img: "/doc2.png",
    title: "Dr Joel Patulliston",
    desc: "Otolaryngologist",
    date: "08-Dec-22",
    time: "11:30 Am",
  },
  {
    id: 5,
    img: "/doc1.png",
    title: "Dr John Patulliston",
    desc: "Paediatrician",
    date: "04-Dec-22",
    time: "9:30 Am",
  },
  {
    id: 6,
    img: "/doc2.png",
    title: "Dr Joel Patulliston",
    desc: "Otolaryngologist",
    date: "08-Dec-22",
    time: "11:30 Am",
  },
];

const MyAppointment = () => {
  return (
    <>
      <div className="max-h-[65vh] overflow-auto my-18  modern-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
          {cardData.map((data, index) => {
             const row = Math.floor(index / 2);
        const col = index % 2;
        const isCross = (row + col) % 2 === 0;
            return(
            <Card key={index} className={`${isCross?"lg:bg-blue-400 ":""} `}>
              <CardContent className="flex items-center p-0 justify-center md:gap-8">
                <div className="">
                  <img src={data.img} className="hidden sm:flex" alt="doctor" />
                </div>
                <div className="space-y-1">
                  <h1 className="font-semibold text-lg">{data.title}</h1>
                  <p className="text-lg ">{data.desc}</p>
                  <p className="flex gap-2 items-center ">
                    <SlCalender />
                    {data.date}
                  </p>
                </div>
                <div>
                  <p className="bg-blue-500 px-2 py-1 rounded-md text-sm mt-3">
                    {data.time}
                  </p>
                </div>
              </CardContent>
            </Card>
        )  })}
        </div>
      </div>
    </>
  );
};

export default MyAppointment;
