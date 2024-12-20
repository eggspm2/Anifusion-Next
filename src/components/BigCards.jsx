"use client";

import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const BigCards = ({ data }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-full  p-[20px] gap-10">
      <h1 className="text-[35px] font-semibold max-md:text-[25px]">Rekomendasi Untukmu</h1>
      <div className="flex flex-wrap gap-5">
        {data.map((item, index) => (
          <Link
            href={`/Anime/home/${item.id}`}
            className="flex flex-col w-[220px] max-md:w-[45%] h-[350px] max-md:h-[300px] gap-2 font-medium "
            key={index}
          >
            <div className="relative h-[300px] w-full">
              <img
                src={item.poster}
                alt="Image"
                className="w-full h-full object-cover rounded-xl Box_Shadow"
              />
              <div className="ImageGradient hover:opacity-100">
                <FontAwesomeIcon icon={faPlay} className="text-[40px]" />
              </div>
            </div>
            <div className="w-full h-[50px] text-[0.9rem] max-md:text-[10px]">
              <h1 className="font-medium">
                {item.name.length > 25
                  ? item.name.substring(0, 22) + "..."
                  : item.name}
              </h1>
              <div className="flex  items-center gap-4 font-extralight text-gray-300">
                <p>{item.type}</p>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-[4px] text-gray-500"
                />
                <p>{item.duration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BigCards;
