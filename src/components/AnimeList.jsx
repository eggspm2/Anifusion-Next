"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


export const AnimeList = ({ data, name }) => {
    if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col justify-between items-center w-full p-[20px] h-[500px]  border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-3">
        <div className="w-full h-[80px] pt-1 px-[10px] ">
        <h1 className=" text-[30px] px-[10px] font-bold border-l-[5px] border-zinc-500 rounded-[5px]">
        {name}
      </h1>
        </div>
     
      <div className="flex w-full h-[400px]">
        <Swiper spaceBetween={30} slidesPerView={5}>
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center h-[350px] gap-3">
                <img
                  src={item.image}
                  alt=""
                  className=" h-[300px] object-cover rounded-xl border border-zinc-500/50"
                />
                <h1 className="text-[20px] font-semibold w-full text-center">
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
