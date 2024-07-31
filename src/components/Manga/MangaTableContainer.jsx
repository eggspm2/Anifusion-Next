"use client";

import React from "react";
import { MangaTable } from "./MangaTable";

export const MangaTableContainer = ({Airing1, Airing2}) => {
  if (!Airing1 || !Airing2) return <div>Loading ...</div>;

  return (
    <div className="flex justify-between items-center w-[95%] py-[40px]">
      <div className="w-[49%] flex flex-col border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-5 p-[20px]">
        <MangaTable data={Airing1} name={"Latest"}/>
      </div>
      <div className="w-[49%] flex flex-col border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-5 p-[20px]">
        <MangaTable data={Airing2} name={"Favourite"}/>
      </div>
    </div>
  );
};
