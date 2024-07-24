"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NewsetApi } from "./hooks/UseApiFetch";

export const AnimeContainer = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const Fetching = async () => {
      const response = await NewsetApi();
      if (response) {
        setData(response);
        console.log(response);
      }
    };
    Fetching();
  }, []);

  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col justify-center items-center w-[95%] h-[500px] bg-slate-700">
      <div className="flex w-full h-[400px]">
        <Swiper spaceBetween={20} slidesPerView={6}>
          {data.map((item) => (
            <SwiperSlide
              key={item.id}
            >
              <div className="flex flex-col  items-center border h-[400px] gap-3">
                <img
                  src={item.image}
                  alt=""
                  className=" h-[300px] object-cover"
                />
                <h1 className="text-[20px]">{item.title.english.length > 25 ? item.title.english.substring(0,22) + "..." : item.title.english}</h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
