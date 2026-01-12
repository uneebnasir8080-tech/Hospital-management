import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

const tips=[
    {
        id:1,
        img:"/tip1.png",
        title:"6 Healthy Excercises for Everyone"
    },
    {
        id:2,
        img:"/tip2.png",
        title:"Healthy Diet for Everyone"
    },
    {
        id:3,
        img:"/tip1.png",
        title:"6 Healthy Excercises for Everyone"
    },
    {
        id:4,
        img:"/tip2.png",
        title:"Healthy Diet for Everyone"
    },
    {
        id:5,
        img:"/tip1.png",
        title:"6 Healthy Excercises for Everyone"
    },
    {
        id:2,
        img:"/tip2.png",
        title:"Healthy Diet for Everyone"
    },
    {
        id:3,
        img:"/tip1.png",
        title:"6 Healthy Excercises for Everyone"
    },
    {
        id:4,
        img:"/tip2.png",
        title:"Healthy Diet for Everyone"
    },
    {
        id:5,
        img:"/tip1.png",
        title:"6 Healthy Excercises for Everyone"
    },  
]

const HomeTips = () => {
  return (
    <div className="w-full my-10">
      {/* Scroll Container */}
      <div className="flex gap-8 overflow-x-auto pb-2 modern-scroll">
        {tips.map((data, index) => (
          <Card
            key={index}
            className="min-w-[250px] max-w-[250px] flex-shrink-0 p-0"
          >
            <CardContent className="p-0">
              <Image
                src={data.img}
                height={160}
                width={250}
                alt="tip"
                className="object-cover w-full h-[160px]"
              />
              <p className="px-2 py-4 text-gray-600 font-semibold text-sm">{data.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HomeTips