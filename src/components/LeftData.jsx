"use client";

import React from "react";
import Seasons from "./Seasons";
import Promotion from "./Promotion";
import  BigCards  from "./BigCards";

const LeftData = ({ result }) => {

    if(!result) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-[77%] max-md:w-full h-full">
      {result.seasons.length > 0 && <Seasons data={result.seasons} />}
      {result.anime.info.promotionalVideos.length > 0 && <Promotion data={result.anime.info.promotionalVideos}/>}
      {result.recommendedAnimes.length > 0 && <BigCards data={result.recommendedAnimes}/>}
    </div>
  );
};

export default LeftData;
