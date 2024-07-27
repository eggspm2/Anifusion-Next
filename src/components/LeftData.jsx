"use client";

import React from "react";
import Seasons from "./Seasons";
import Promotion from "./Promotion";

const LeftData = ({ result }) => {

    if(!result) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-[77%]">
      {result.seasons.length > 0 && <Seasons data={result.seasons} />}
      {result.anime.info.promotionalVideos.length > 0 && <Promotion data={result.anime.info.promotionalVideos}/>}
    </div>
  );
};

export default LeftData;
