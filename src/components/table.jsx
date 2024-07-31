"use client";

import React from "react";
import { faBook, faCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "./ui/button";

export const Table = ({ data, name, isManga }) => {
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
            className="flex justify-center w-full h-[130px] p-[10px] gap-2 bg-zinc-800/30 rounded-xl border border-zinc-500/50"
            key={index}
          >
            <img
              src={item.poster || item.image}
              alt=""
              className="h-full w-[80px] rounded-[10px]"
            />
            <div className="flex flex-col justify-center items-center w-full gap-4">
              <h1 className="text-[18px] font-semibold">
                {isManga
                  ? item.title.length > 30
                    ? item.title.substring(0, 28) + "..."
                    : item.title
                  : item.name.length > 30
                  ? item.name.substring(0, 28) + "..."
                  : item.name}
              </h1>
              {isManga ? 
              <div className="flex gap-1">
                <Button className="flex gap-2">
                <FontAwesomeIcon icon={faBook} />
                  {item.chapter.length > 12 ? item.chapter.substring(0,9) + '...' : item.chapter}
                </Button>
                <Button className="flex gap-2">
                <FontAwesomeIcon icon={faEye} />
                  {item.view}
                </Button>
              </div>
              :
              <div className="flex justify-center items-center gap-4 px-[10px] bg-cyan-600 rounded-xl ">
                <p>{item.episodes.sub || "??"}</p>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-[4px] text-cyan-800"
                />
                <p>{item.type || "N/A"}</p>

                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-[4px] text-cyan-800"
                />
                <p>{item.episodes.dub || "??"}</p>
              </div>
}
            </div>
          </Link>
        ))}
    </>
  );
};
