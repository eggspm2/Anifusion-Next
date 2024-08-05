"use client";

import React from "react";
import DetailStack from "./detailStack";
import SideDetails from "./SideDetails";
import { Button } from "./ui/button";

const StreamAnimeInfo = ({ data }) => {
  return (
    <div className=" flex flex-col w-full p-[10px]  bg-zinc-800/50 rounded-lg border border-zinc-500/50">
      <div className="flex max-md:flex-col gap-5">
        <div className="flex flex-col w-[300px] max-md:w-full max-md:items-center gap-5 pt-[20px]">
          <img
            src={data.info.poster}
            alt=""
            className=" w-full max-md:w-[55%] h-[300px] max-md:h-[270px] Box_Shadow object-cover rounded-lg"
          />
          <Button variant="outline" className="p-[20px] rounded-lg text-center">{data.moreInfo.synonyms || data.moreInfo.japanese}</Button>
        </div>
        <div className="flex flex-col gap-5 w-full max-md:items-center p-[10px]">
          <p className="text-[30px] font-semibold max-md:text-[14px]">{data.info.name}</p>
          <DetailStack data={data.info} />
          <SideDetails Aniwatch={data.moreInfo} style={'max-md:items-center'} />
        </div>
      </div>
     
    </div>
  );
};

export default StreamAnimeInfo;
