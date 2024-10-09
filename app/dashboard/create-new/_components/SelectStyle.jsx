"use client";
import Image from "next/image";
import React, { useState } from "react";

const SelectStyle = ({ onUserSelect }) => {
  const styleOptions = [
    {
      name: "Comic",
      image: "/comic.jpg",
    },
    {
      name: "Real",
      image: "/real.jpg",
    },
    {
      name: "Grand Theft Auto",
      image: "/gta.jpg",
    },
    {
      name: "Watercolor",
      image: "/watercolor.jpg",
    },
    {
      name: "HIstory",
      image: "/history.jpg",
    },
  ];
  const [selectStyle, setSelectStyle] = useState("");
  return (
    <div className="mt-10 w-full">
      <h2 className="text-primary font-bold text-2xl">Style</h2>
      <p className="text-gray-600">Select your video style</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4">
        {styleOptions.map((style, index) => (
          <div
            key={index}
            className={`relative hover:scale-105 transition-all duration-200 border-4 rounded-xl ${
              selectStyle === style.name
                ? "border-primary"
                : "border-transparent"
            }`}
            onClick={() => {
              setSelectStyle(style.name);
              onUserSelect("imageStyle", style.name);
            }}
          >
            <Image
              width={200}
              className="w-full h-48 rounded-lg object-cover"
              height={200}
              src={style.image}
              alt={style.name}
            />
            <h2 className="absolute text-base text-center bg-black/50 backdrop-blur-lg bottom-0 w-full p-2 text-white rounded-b-lg">
              {style.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
