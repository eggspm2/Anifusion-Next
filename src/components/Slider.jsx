"use client";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCirclePlay,
  faClock,
  faStar,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";

const Slider = ({data}) => {
 

  if (!data) return <div>Loading ...</div>;

  return (
    <div className="w-full">
      <Swiper>
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-center items-end py-[30px] relative text-white">
              <div className="gradient"></div>
              <img
                className="w-[95%] h-[400px] object-cover rounded-xl"
                src={item.poster}
                alt=""
              />
              <div className="absolute w-[95%] flex flex-col p-[20px] gap-3">
                <h1 className="text-[40px] font-bold">{item.name}</h1>
                <div className="w-[300px] h-[40px] bg-zinc-800/30 rounded-xl border border-zinc-500/50 flex justify-center items-center gap-3 text-[18px]">
                  <div className="flex items-center  justify-center gap-1">
                    <FontAwesomeIcon icon={faWineGlass} className="iconStyle" />
                    <p>{item.otherInfo[0]}</p>
                  </div>
                  <div className="flex items-center  justify-center gap-1">
                    <p>
                      {item.otherInfo[3] || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center  justify-center gap-1">
                    <FontAwesomeIcon icon={faStar} />
                    <p>{item.otherInfo[2] || "N/A"}</p>
                  </div>
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
