import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

const tips = [
  { id: 1, img: "/tip1.png", title: "6 Healthy Exercises for Everyone" },
  { id: 2, img: "/tip2.png", title: "Healthy Diet for Everyone" },
  { id: 3, img: "/tip1.png", title: "6 Healthy Exercises for Everyone" },
  { id: 4, img: "/tip2.png", title: "Healthy Diet for Everyone" },
  { id: 5, img: "/tip1.png", title: "6 Healthy Exercises for Everyone" },
  { id: 6, img: "/tip2.png", title: "Healthy Diet for Everyone" },
  { id: 7, img: "/tip1.png", title: "6 Healthy Exercises for Everyone" },
  { id: 8, img: "/tip2.png", title: "Healthy Diet for Everyone" },
  { id: 9, img: "/tip1.png", title: "6 Healthy Exercises for Everyone" },
]

const HomeTips = () => {
  return (
    <section className=" my-10 overflow-x-hidden modern-scroll">
    

      {/* Horizontal scroll ONLY inside this div */}
      <div className="flex gap-4 overflow-auto pb-2">
        {tips.map((data) => (
          <div
            key={data.id}
            className=" shrink-0 rounded-lg overflow-hidden"
          >
            <Image
              src={data.img}
              alt={data.title}
              width={220}
              height={140}
              className="object-cover"
            />
            <div>
              <p className='text-sm py-2 text-gray-600'>{data.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
export default HomeTips