"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

export const AnimeList = ({ data, name }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <>
      <div className="w-full h-[40px] pt-1 px-[10px]">
        <h1 className=" text-[30px] px-[10px] font-bold border-l-[5px] border-zinc-500 rounded-[5px]">
          {name}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-[20px] h-[450px]  border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-3">
        <div className="flex w-full h-[450px]">
          <Swiper spaceBetween={30} slidesPerView={5}>
            { data ? data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/home/${item.id}`}>
                  <div className="flex flex-col justify-center items-center h-[450px] gap-3">
                    <img
                      src={item.poster}
                      alt=""
                      className=" h-[300px] object-cover rounded-xl border border-zinc-500/50"
                    />
                    <h1 className="text-[18px] font-semibold w-full">
                      {item.name}
                    </h1>
                  </div>
                </Link>
              </SwiperSlide>
            )) : <div>Loading ...</div> }
          </Swiper>
        </div>
      </div>
    </>
  );
};
