"use client";

import React from "react";
import Link from "next/link";

const MangaSearchResults = ({ result, setFocused }) => {
  if (!result.mangaList) return <div></div>;
  return (
    <div className="flex flex-col gap-3 h-full w-full p-[10px]  overflow-y-scroll ScrollWidth">
      {result.mangaList.map((item) => (
        <Link
          href={`/Manga/home/${item.id}`}
          key={item.id}
          onClick={() => setFocused(false)}
          className="flex w-full h-[110px] bg-zinc-700/50 border border-zinc-500/50 rounded-xl p-[10px]"
        >
          <img
            src={item.image}
            alt=""
            className="w-[80px] h-full object-cover rounded-xl border border-zinc-500/50"
          />
          <div className="flex flex-col justify-center items-center w-full gap-1">
            <h1 className="text-[18px] font-semibold">
              {item.title.length > 20
                ? item.title.substring(0, 18) + "..."
                : item.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MangaSearchResults;
