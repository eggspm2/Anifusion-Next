"use client";

import React from 'react';
import {
    faCircle,
    faClosedCaptioning,
    faMicrophone,
    faPlay,
    faPlus,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 const AnimeDetails = ({data}) => {

    if (!data) return <div>Loading ...</div>;
  return (
    <div className="w-[75%] h-full bg-zinc-900/70 backdrop-blur-[20px] flex p-[60px] gap-10">
      
        <img
          src={data.poster}
          alt="Anime Image"
          className=" w-[200px] h-[250px] object-cover"
        />
        <div className="flex flex-col gap-7">
          <div className="flex items-center text-[0.9rem] gap-2">
            <p className="font-medium">Home</p>
            <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
            <p className="font-medium">{data.stats.type}</p>
            <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
              <p className="text-zinc-400">
                {data.name}
              </p>
          </div>
            <div className="text-[2.3rem] font-semibold">
              {data.name}
            </div>
          <div className="flex gap-1 h-[20px] text-black text-[0.9rem] font-semibold">
            <p className=" px-[4px] h-full bg-cyan-100  flex justify-center items-center rounded-l rounded-bl">
              {data.stats.rating}
            </p>
            <p className="w-[30px] h-full bg-pink-200  flex justify-center items-center ">
              {data.stats.quality}
            </p>
            <div className="w-[40px] h-full bg-green-200  flex justify-center items-center gap-1">
              <FontAwesomeIcon
                icon={faClosedCaptioning}
                className="text-[0.7rem]"
              />
              <p>{data.stats.episodes.sub}</p>
            </div>
            <div className="w-[40px] h-full bg-blue-200 flex justify-center items-center gap-1">
              <FontAwesomeIcon icon={faMicrophone} className="text-[0.7rem]" />
              <p>{data.stats.episodes.dub}</p>
            </div>
            <p className="w-[30px] h-full bg-white/20 text-white backdrop-blur-md  flex justify-center items-center">
              {data.stats.episodes.sub}
            </p>
            <div className="flex justify-evenly items-center text-white font-light w-[120px]">
              <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
              <p className="font-medium">{data.stats.type}</p>
              <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
              <p>{data.stats.duration}</p>
            </div>
          </div>
          <div className="flex w-full gap-4 text-black">
          <div className="flex justify-center items-center w-[180px] bg-pink-300 rounded-3xl h-[45px]">
          <FontAwesomeIcon icon={faPlay} />
            <p>Watch now</p>
          </div>
          <div className="flex justify-center items-center w-[180px] bg-green-100 rounded-3xl h-[45px]">
          <FontAwesomeIcon icon={faPlus} />
            <p>Add to List</p>
          </div>
          </div>
          <div className="w-full text-[0.9rem]">
            {data.description}
          </div>
        </div>
      </div>
  )
}

export default AnimeDetails;