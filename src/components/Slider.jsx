"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleInfo,
  faCirclePlay,
  faClock,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Slider = ({ data, isManga }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <div className="w-full flex justify-center items-center">
      <Swiper>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex justify-center items-end  max-md:py-[10px] py-[30px] relative text-white Animation"
            >
              <div className="gradient"></div>
              <img
                className="w-[95%] h-[400px] max-md:h-[300px] object-cover rounded-xl"
                src={item.poster || item.image}
                alt=""
              />
              <div className="absolute w-[95%] max-md:p-[0] max-md:left-5 max-md:bottom-[70px] flex flex-col p-[20px] gap-3">
                <h1 className="text-[40px] max-md:text-[18px] font-bold">
                  {item.name || item.title}
                </h1>
                {!isManga &&  
                <div className="w-max p-[5px] max-md:text-[10px] max-md:gap-2 bg-cyan-600 rounded-xl border border-zinc-500/50 flex justify-center items-center gap-5 text-[18px]">
                  <div className="flex items-center justify-center gap-1">
                    <FontAwesomeIcon icon={faTv} />
                    <p>{item.otherInfo[0]}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 max-md:gap-1">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-[6px] text-cyan-800"
                    />
                    <p>{item.otherInfo[3] || "N/A"}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 max-md:gap-1">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-[6px] text-cyan-800"
                    />
                    <p>{item.otherInfo[2] || "N/A"}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[6px] text-cyan-800"
                  />
                  <div className="flex items-center justify-center gap-1">
                    <FontAwesomeIcon icon={faClock} />
                    <p>{item.otherInfo[1] || "N/A"}</p>
                  </div>
                </div>
                
                  }
                <div className="w-[70%] max-md:hidden">
                  {item.description.length > 500
                    ? item.description.substring(0, 497) + "..."
                    : item.description || "N/A"}
                </div>
              </div>
              
              <div className="absolute w-[95%] text-black max-md:left-5 max-md:bottom-[20px]  max-md:justify-start max-md:p-[0] max-md:text-[12px] flex justify-end gap-4 p-[30px] text-[18px]">
                <Link
                  href={isManga ? `/Manga/home/${item.id}`:`/Anime/home/${item.id}`}
                  className="flex justify-center items-center py-[10px] px-[20px] max-md:px-[20px] max-md:py-[10px] max-md:h-min max-md:text-[12px] gap-2 bg-white rounded-3xl border border-zinc-500/50"
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                  <p>Details</p>
                </Link>
                <Link
                  href={isManga ? `/Manga/Read/${item.id}` : `/Anime/Episode/${item.id}`}
                  className="flex justify-center items-center py-[10px] px-[20px] max-md:px-[20px] max-md:py-[10px] max-md:h-min max-md:text-[12px] gap-2 bg-white rounded-3xl border border-zinc-500/50"
                >
                  <FontAwesomeIcon icon={faCirclePlay}/>
                  <p>{isManga ? "Read now": "Watch now"}</p>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slider;