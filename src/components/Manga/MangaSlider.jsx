"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const MangaSlider = ({ data }) => {
  console.log(data);
  if (!data) return 
  <div className="w-full grid place-items-center h-[450px]">
  <Skeleton className="w-[95%] h-[400px]"/>
  </div>
  ;
  return (
    <div className="w-full flex justify-center items-center">
      <Swiper>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-end  max-md:py-[10px] py-[30px] relative text-white Animation">
              <div className="gradient"></div>
              <img
                className="w-[95%] h-[400px] max-md:h-[300px] object-cover rounded-xl"
                src={item.image}
                alt=""
              />
              <div className="absolute w-[95%] max-md:p-[0] max-md:left-5 max-md:bottom-[70px] flex flex-col p-[20px] gap-3">
                <h1 className="text-[40px] max-md:text-[18px] font-bold">
                  {item.title}
                </h1>

                <div className="w-[70%] max-md:hidden">
                  {item.description.length > 500
                    ? item.description.substring(0, 497) + "..."
                    : item.description || "N/A"}
                </div>
              </div>

              <div className="absolute w-[95%] text-black max-md:left-5 max-md:bottom-[20px]  max-md:justify-start max-md:p-[0] max-md:text-[12px] flex justify-end gap-4 p-[30px] text-[18px]">
                <Link
                  href={`/Manga/home/${item.id}`}
                  className="flex justify-center items-center py-[10px] px-[20px] max-md:px-[20px] max-md:py-[10px] max-md:h-min max-md:text-[12px] gap-2 bg-white rounded-3xl border border-zinc-500/50"
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                  <p>Details</p>
                </Link>
                <Link
                  href={`/Manga/Read/${item.id}/${"chapter-1"}`}
                  className="flex justify-center items-center py-[10px] px-[20px] max-md:px-[20px] max-md:py-[10px] max-md:h-min max-md:text-[12px] gap-2 bg-white rounded-3xl border border-zinc-500/50"
                >
                  <FontAwesomeIcon icon={faBook} />
                  <p>Read now</p>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MangaSlider;
