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

const Slider = ({data}) => {
 



  if (!data) return <div>Loading ...</div>;
  return (
    <div className="w-full">
      <Swiper>
        {data.map((item,index) => (
          <SwiperSlide key={index}>
            <Link href={`/Episode/${item.id}`} className="flex justify-center items-end py-[30px] relative text-white Animation">
              <div className="gradient"></div>
              <img
                className="w-[95%] h-[400px] object-cover rounded-xl"
                src={item.poster}
                alt=""
              />
              <div className="absolute w-[95%]  flex flex-col p-[20px] gap-3">
                <h1 className="text-[40px] font-bold">{item.name}</h1>
                <div className="w-[390px] h-[40px] bg-cyan-600 rounded-xl border border-zinc-500/50 flex justify-center items-center gap-5 text-[18px]">
                  <div className="flex items-center justify-center gap-1">
                    <FontAwesomeIcon icon={faTv}/>
                    <p>{item.otherInfo[0]}</p>
                  </div>
                  <div className="flex items-center  justify-center gap-3">
                  <FontAwesomeIcon icon={faCircle} className="text-[6px] text-cyan-800" />
                    <p>
                      {item.otherInfo[3] || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center  justify-center gap-3">
                  <FontAwesomeIcon icon={faCircle} className="text-[6px] text-cyan-800" />
                    <p>{item.otherInfo[2] || "N/A"}</p>
                  </div>
                  <FontAwesomeIcon icon={faCircle} className="text-[6px] text-cyan-800" />
                  <div className="flex items-center  justify-center gap-1">
                    <FontAwesomeIcon icon={faClock}/>
                    <p>{item.otherInfo[1] || "N/A"}</p>
                  </div>
                </div>
                <div className="w-[70%]">
                 {item.description.length > 500 ? item.description.substring(0,497) + "..." : item.description || "N/A"}
                </div>
              </div>
              <div className="absolute w-[95%] flex justify-end gap-4 p-[30px] text-[18px]">
                    <Link href={`/home/${item.id}`} className="flex justify-center items-center w-[150px] h-[50px] gap-2 bg-zinc-800/30 rounded-xl border border-zinc-500/50">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                      />
                      <p>Details</p>
                    </Link>
                    <div className="flex justify-center items-center w-[150px] h-[50px] bg-zinc-800/30 rounded-xl border border-zinc-500/50 gap-2">
                    <FontAwesomeIcon
                        icon={faCirclePlay}
                      />
                      <p>Watch Now</p>
                    </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slider;
