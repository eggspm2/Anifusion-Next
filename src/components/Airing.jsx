"use client";

import React, { useEffect, useState } from "react";
import { AniWatchSchedule } from "./hooks/UseApiFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { WeekDay } from "./hooks/WeekDay";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Airing = () => {
  const [Schedule, setSchedule] = useState("");
  const [animate, setAnimate] = useState(false);

  const days = WeekDay();
  const date = new Date();
  let CurrentDay = date.getDay();
  const [today, setToday] = useState(days[CurrentDay].day);

  useEffect(() => {
    const ScheduleFetch = async () => {
      console.log(days);
      const ScheduleDay = await AniWatchSchedule(today);
      if (ScheduleDay) {
        console.log(ScheduleDay);
        setSchedule(ScheduleDay.scheduledAnimes);
      }
    };
    ScheduleFetch();
  }, [today]);

  const handleButtonClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };
  const day = (number) => {
    setToday(days[number].day);
    handleButtonClick();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="flex w-[60%] max-md:w-[90%] gap-10">
        <Swiper
        spaceBetween={10}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 5,
          },
        }} 
        >
          {days.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className={`  w-[140px] p-[10px] max-md:w-[100px] max-md:p-[7px] text-center rounded-lg max-md:text-[10px] border border-zinc-500/50 Transition font-semibold hover:bg-white hover:text-black ${
                  item.day === today ? "bg-white text-black" : "bg-black/40"
                }`}
                onClick={() => day(item.id)}
              >
                {item.name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {Schedule && (
        <div className="flex justify-center items-center flex-col gap-3 w-full p-[10px] ">
          {Schedule.map((item, index) => (
            <Link
              key={index}
              href={`/Anime/home/${item.id}`}
              className={`flex justify-between gap-2 bg-zinc-800/50 max-md:w-full max-md:text-[10px] w-[70%] p-[20px] border border-zinc-500/50 rounded-lg Transition ${
                animate ? "Animation" : ""
              } hover:bg-zinc-500/50`}
            >
              <div className="flex gap-2 justify-center items-center  bg-white text-black px-[10px] rounded-2xl">
                <FontAwesomeIcon icon={faPlay} />
                <p>{item.episode}</p>
              </div>
              <h1 className="w-full px-[10px]">{item.name.length > 25 ? item.name.substring(0,23) + "..." : item.name}</h1>
              <div className="flex gap-2 justify-center items-center bg-white text-black px-[10px] rounded-2xl">
                <p>{item.time}</p>
                <FontAwesomeIcon icon={faClock} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Airing;
