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
            key={item.name}
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
              <div className="flex justify-center items-center gap-4 px-[10px] bg-cyan-600 rounded-xl ">
              <p>{item.episodes.sub || "??"}</p>
              <FontAwesomeIcon icon={faCircle} className="text-[4px] text-cyan-800" />
              <p>{item.type || "N/A"}</p>
             
                <FontAwesomeIcon icon={faCircle} className="text-[4px] text-cyan-800" />
                  <p>{item.episodes.dub || "??"}</p>
              </div>
            </div>
          </Link>
        ))}
        </>
  )
}
