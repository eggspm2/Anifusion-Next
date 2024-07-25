"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NewsetApi } from "./hooks/UseApiFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCirclePlay,
  faClock,
  faStar,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";

const Slider = () => {
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
    <div className="w-full">
      <Swiper>
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-center items-end py-[30px] relative">
              <div className="gradient"></div>
              <img
                className="w-[95%] h-[400px] object-cover rounded-xl"
                src={item.cover}
                alt=""
              />
              <div className="absolute w-[95%] flex flex-col p-[20px] gap-3">
                <h1 className="text-[40px] font-bold">{item.title.english}</h1>
                <div className="w-[300px] h-[40px] bg-zinc-800/30 rounded-xl border border-zinc-500/50 flex justify-center items-center gap-3 text-[18px]">
                  <div className="flex items-center  justify-center gap-1">
                    <FontAwesomeIcon icon={faWineGlass} className="iconStyle" />
                    <p>{item.duration}</p>
                  </div>
                  <div className="flex items-center  justify-center gap-1">
                    <FontAwesomeIcon icon={faStar} />
                    <p>
                      {item.popularity ? `${item.popularity} users` : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center  justify-center gap-1">
                    <FontAwesomeIcon icon={faStar} />
                    <p>{item.rating / 10 || "N/A"}</p>
                  </div>
                  <div className="flex items-center  justify-center gap-1">
                    <FontAwesomeIcon icon={faClock}/>
                    <p>{item.duration || "N/A"} mins</p>
                  </div>
                </div>
                <div className="w-[70%]">
                  {item.description
                    ? item.description.length > 500
                      ? item.description
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .substring(0, 500) + "..."
                      : item.description.replace(/<\/?[^>]+(>|$)/g, "")
                    : "N/A"}
                </div>
              </div>
              <div className="absolute w-[95%] flex justify-end gap-4 p-[30px] text-[18px]">
                    <div className="flex justify-center items-center w-[150px] h-[50px] gap-2 bg-zinc-800/30 rounded-xl border border-zinc-500/50">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                      />
                      <p>Details</p>
                    </div>
                    <div className="flex justify-center items-center w-[150px] h-[50px] bg-zinc-800/30 rounded-xl border border-zinc-500/50 gap-2">
                    <FontAwesomeIcon
                        icon={faCirclePlay}
                      />
                      <p>Watch Now</p>
                    </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slider;
