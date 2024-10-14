"use client";

import React from 'react';
import {
    faCircle,
    faClosedCaptioning,
    faMicrophone,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailStack = ({data}) => {
  return (
    <div className="flex gap-1 h-[20px] max-md:text-[10px] text-black text-[0.9rem] font-semibold">
    <p className=" px-[5px] text-[8px] h-full bg-cyan-100 max-md:px-[10px] flex justify-center items-center rounded-l rounded-bl">
      {data.stats.rating}
    </p>
    <p className="px-[5px] h-full bg-pink-200  flex justify-center items-center ">
      {data.stats.quality}
    </p>
    <div className="px-[5px] h-full bg-green-200  flex justify-center items-center gap-1">
      <FontAwesomeIcon
        icon={faClosedCaptioning}
        className="text-[0.7rem]"
      />
      <p>{data.stats.episodes.sub}</p>
    </div>
    <div className="h-full px-[5px] bg-blue-200 flex justify-center items-center gap-1">
      <FontAwesomeIcon icon={faMicrophone} className="text-[0.7rem]" />
      <p>{data.stats.episodes.dub}</p>
    </div>
    <p className="h-full px-[5px] bg-gray-600/20 text-white backdrop-blur-md  flex justify-center items-center">
      {data.stats.episodes.sub}
    </p>
    <div className="flex justify-evenly items-center text-white font-light w-[120px]">
      <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
      <p className="font-medium">{data.stats.type}</p>
      <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
      <p>{data.stats.duration}</p>
    </div>
  </div>
  )
}

export default DetailStack;