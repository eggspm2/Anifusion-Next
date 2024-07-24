"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


export const AnimeList = ({ data, name }) => {
    if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col justify-center items-center w-full p-[20px] h-[450px]  border border-zinc-500/50 bg-zinc-800/30 rounded-xl">
      <h1 className="w-full px-[10px] mt-4 text-[30px] font-bold border-l-[5px] border-zinc-500 rounded">
        {name}
      </h1>
      <div className="flex w-full h-[400px] py-[30px] ">
        <Swiper spaceBetween={30} slidesPerView={5}>
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center h-[400px] gap-3">
                <img
                  src={item.image}
                  alt=""
                  className=" h-[300px] object-cover rounded-xl"
                />
                <h1 className="text-[20px]">
                  {item.title.english.length > 25
                    ? item.title.english.substring(0, 22) + "..."
                    : item.title.english}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};