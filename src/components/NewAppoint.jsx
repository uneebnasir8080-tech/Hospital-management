import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

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
  return (
    <div >
      <div
        className={`space-y-5 my-10 flex flex-col px-5  max-h-[68vh] overflow-auto modern-scroll`}
      >
        {appoint.map((data, index) => (
          <Card
            key={index}
            className={`flex w-[60%]  ${
              data.imagePostion === "right" ? "ml-auto" : "mr-auto "
            } `}
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
                className="rounded-xl object-cover"
              />
              <div>
                <h1 className="font-semibold text-xl">{data.title}</h1>
                <p className="text-gray-700">{data.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="w-full text-[#ffff] bg-[#3497F9] hover:bg-[#137ee9] cursor-pointer">
        Continue
      </Button>
    </div>
  );
};

export default NewAppoint;
