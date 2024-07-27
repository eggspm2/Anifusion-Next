"use client";

import React from 'react'
import { faCalendarDays, faCircle, faClosedCaptioning, faFolderOpen, faMicrophone, faStar, faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';


export const Table = ({data, name}) => {
    if (!data) return <div>Loading ...</div>;
  return (
    <>
        <h1 className="text-[28px] font-bold border-l-[5px] border-zinc-500 rounded-[5px] px-[20px]">{name}</h1>
        {data && data.map((item) => (
          <Link href={`/home/${item.id}`}
            className="flex justify-center w-full h-[130px] p-[10px] gap-2 bg-zinc-800/30 rounded-xl border border-zinc-500/50"
            key={item.id}
          >
            <img
              src={item.poster}
              alt=""
              className="h-full w-[80px] rounded-[10px]"
            />
            <div className="flex flex-col justify-center items-center w-full gap-4">
              <h1 className="text-[18px] font-semibold">
                {item.name.length > 30
                  ? item.name.substring(0, 28) + "..."
                  : item.name || "N/A"}
              </h1>
              <div className="flex justify-center items-center gap-1 w-full text-gray-500 ">

              <div className="w-[40px] h-full px-[25px] bg-green-200  flex justify-center items-center gap-1 rounded-l rounded-bl">
              <FontAwesomeIcon
                icon={faClosedCaptioning}
                className="text-[0.7rem]"
              />
              <p>{item.episodes.sub || "??"}</p>
            </div>

            <div className="w-[40px] h-full px-[25px] bg-blue-300 flex justify-center items-center gap-1">
              <FontAwesomeIcon icon={faMicrophone} className="text-[0.7rem]" />
              <p>{item.episodes.dub || "??"}</p>
            </div>

                <div className="flex justify-evenly items-center gap-3 px-[10px]">
                  <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
                  <p>{item.type || "N/A"}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </>
  )
}
