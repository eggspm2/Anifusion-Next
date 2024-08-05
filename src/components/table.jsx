"use client";

import React from "react";
import {
  faCircle,
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Table = ({ data, name, width }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <>
      <h1 className="text-[28px] font-bold border-l-[5px] border-zinc-500 rounded-[5px] px-[20px]">
        {name}
      </h1>
      {data &&
        data.map((item, index) => (
          <Link
            href={`/Anime/home/${item.id}`}
            className="flex justify-center w-full h-[130px] p-[10px]  gap-2 bg-white/10 rounded-xl border border-zinc-500/50"
            key={index}
          >
            <img
              src={item.poster}
              alt=""
              className="h-full w-[80px] rounded-[10px]"
            />
            <div className="flex flex-col justify-center items-center w-full gap-1">
              <h1 className="text-[18px] font-semibold max-md:text-[14px]">
                {item.name.length > 30
                  ? item.name.substring(0, 28) + "..."
                  : item.name}
              </h1>
              <div className={`flex justify-center items-center ${width} max-md:text-[10px] max-md:w-[170px] text-black gap-4 p-1 bg-white rounded-lg`}>
              <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faMicrophone} />
                  <p>{item.episodes.sub || "??"}</p>
                </div>
                <FontAwesomeIcon icon={faCircle} className="text-[4px]" />
                <p>{item.type || "N/A"}</p>

                <FontAwesomeIcon icon={faCircle} className="text-[4px]" />
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClosedCaptioning}/>
                  <p>{item.episodes.dub || "??"}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};
