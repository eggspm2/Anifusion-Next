"use client";

import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Promotion = ({ data }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <div className="w-full flex flex-col gap-3 p-[20px]">
      <h1 className="text-[30px] font-semibold">Anime Promosi</h1>
      <div className="flex gap-3">
        {data.map((item) => (
          <div className="flex flex-col w-[200px] h-[140px] justify-center items-center pt-3 relative overflow-x-scroll ScrollWidth" key={item.title}>
            <FontAwesomeIcon icon={faCirclePlay} className="absolute top-9 text-[3rem] text-black/80" />
            <img
              src={item.thumbnail}
              alt=""
              className="w-full h-[70%] object-cover"
            />
            <h1 className="w-full h-[30%] flex justify-center items-center bg-gray-800">
              {item.title.length > 20
                ? item.title.substring(0, 17) + "..."
                : item.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
