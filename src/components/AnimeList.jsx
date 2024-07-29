"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export const AnimeList = ({ data, name }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <>
      <div className="w-full h-[40px] pt-1 px-[10px] ">
        <h1 className=" text-[30px] px-[10px] font-bold border-l-[5px] border-zinc-500 rounded-[5px]">
          {name}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-[20px] h-[400px]  border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-3">
        <div className="flex w-full h-[400px]">
          <Swiper spaceBetween={30} slidesPerView={5}>
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/home/${item.id}`} >
                  <div className="flex flex-col  justify-center items-center h-[400px] gap-5">
                    <div className="flex h-[300px] object-cover overflow-hidden relative">
                    <img
                      src={item.poster}
                      alt=""
                      className=" h-[300px] object-cover rounded-xl border border-zinc-500/50 "
                    />
                    <div className="ImageGradient hover:opacity-100">
                      <FontAwesomeIcon icon={faPlay} className="text-[40px]"/>
                    </div>
                    </div>
                    <h1 className="text-[18px] font-semibold w-[60%] h-[60px] flex justify-center items-center pb-[10px]">
                      {item.name}
                    </h1>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
