"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faClosedCaptioning,
  faMicrophone,
  faStar,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const SearchResults = ({ result }) => {
  if (!result.animes) return <div></div>;
  return (
    <div className="flex flex-col gap-3 h-full w-full p-[10px]  overflow-y-scroll ScrollWidth">
      {result.animes.map((item) => (
        <Link
          href={`/Anime/home/${item.id}`}
          key={item.id}
          className="flex w-full h-[110px] bg-zinc-700/50 border border-zinc-500/50 rounded-xl p-[10px]"
        >
          <img
            src={item.poster}
            alt=""
            className="w-[80px] h-full object-cover rounded-xl border border-zinc-500/50"
          />
          <div className="flex flex-col justify-center items-center w-full gap-1">
            <h1 className="text-[18px] font-semibold">
              {item.name.length > 20
                ? item.name.substring(0, 18) + "..."
                : item.name}
            </h1>
            <div className="flex items-center justify-evenly gap-2 w-[250px] bg-black Box_Shadow  p-1 text-[14px] rounded-lg">
              <div className="flex justify-center items-center gap-1">
                <FontAwesomeIcon icon={faTv} />
                <p>{item.type || "??"}</p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <FontAwesomeIcon icon={faClock} />
                <p>{item.dration || "??"}</p>
              </div>

              <div className="flex justify-center items-center gap-1">
                <FontAwesomeIcon icon={faClosedCaptioning} />
                <p>{item.episodes.sub || "??"}</p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <FontAwesomeIcon icon={faMicrophone} />
                <p>{item.episodes.sub || "??"}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
