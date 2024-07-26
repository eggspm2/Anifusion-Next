"use client";

import React from 'react'
import { faCalendarDays, faFolderOpen, faStar, faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Table = ({data, name}) => {
    if (!data) return <div>Loading ...</div>;
  return (
    <div className="w-[49%] flex flex-col border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-5 p-[20px]">
        <h1 className="text-[28px] font-bold border-l-[5px] border-zinc-500 rounded-[5px] px-[20px]">{name}</h1>
        {data && data.map((item) => (
          <div
            className="flex justify-center w-full h-[130px] p-[10px] bg-zinc-800/30 rounded-xl border border-zinc-500/50"
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
              <div className="flex justify-evenly items-center w-full text-gray-500 ">
                <div className="flex justify-center items-center gap-1">
                  <FontAwesomeIcon icon={faTv} />
                  <p>{item.type || "N/A"}</p>
                </div>
                
                <div className="flex justify-center items-center gap-1">
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <p>{item.episodes.dub || "N/A"}</p>
                </div>

                <div className="flex justify-center items-center gap-1">
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <p>{item.episodes.sub || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}
