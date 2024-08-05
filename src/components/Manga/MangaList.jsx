"use client";


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export const MangaList = ({ data, name }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <>
      <div className="w-full h-[40px] pt-1 px-[10px] ">
        <h1 className=" text-[30px] max-md:text-[25px] px-[10px] font-bold border-l-[5px] border-zinc-500 rounded-[5px]">
          {name}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-[10px]  border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-3">
        <div className="flex w-full">
          <Swiper spaceBetween={20} 
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
            1440: {
              slidesPerView: 5,
            },
          }} 
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/Manga/home/${item.id}`}>
                  <div className="flex flex-col justify-center items-center p-[10px] gap-5">
                    <div className="flex h-[300px] max-md:h-[250px] object-cover overflow-hidden relative">
                      <img
                        src={item.image}
                        alt=""
                        className=" h-[300px] max-md:h-[250px] object-cover rounded-xl border border-zinc-500/50 "
                      />
                      <div className="ImageGradient hover:opacity-100">
                        <FontAwesomeIcon
                          icon={faBook}
                          className="text-[40px]"
                        />
                      </div>
                    </div>
                    <h1 className="text-[18px] max-md:text-[12px] font-semibold flex justify-center items-center">
                      {item.title.length > 20
                        ? item.title.substring(0, 17) + "..."
                        : item.title}
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
