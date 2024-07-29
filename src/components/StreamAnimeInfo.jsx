"use client";

import React from "react";
import DetailStack from "./detailStack";
import SideDetails from "./SideDetails";

const StreamAnimeInfo = ({ data }) => {
  return (
    <div className=" flex flex-col w-full p-[10px] bg-zinc-800/50 rounded-lg border border-zinc-500/50">
      <div className="flex gap-5 items-center">
        <div className="flex flex-col justify-center w-[300px] gap-5">
          <img
            src={data.info.poster}
            alt=""
            className=" w-full h-[300px] object-cover rounded-lg"
          />
          <h1 className="bg-cyan-600 border border-zinc-500/50 p-[10px] rounded-lg text-center">{data.moreInfo.synonyms}</h1>
        </div>
        <div className="flex flex-col gap-5 w-full p-[10px]">
          <p className="text-[30px] font-semibold">{data.info.name}</p>

          <DetailStack data={data.info} />
          <SideDetails Aniwatch={data.moreInfo} />
        </div>
      </div>
     
    </div>
  );
};

export default StreamAnimeInfo;
