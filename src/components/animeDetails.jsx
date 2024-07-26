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
    <div className="w-[75%] h-full bg-zinc-900/40 backdrop-blur-[20px] flex p-[60px] gap-10">
        <img
          src={data.image}
          alt="Anime Image"
          className=" w-[200px] h-[250px] object-cover"
        />
        <div className="flex flex-col gap-7">
          <div className="flex items-center text-[0.9rem] gap-2">
            <p className="font-medium">Home</p>
            <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
            <p className="font-medium">{data.type}</p>
            <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
            {data.title && (
              <p className="text-zinc-400">
                {data.title.english || data.title.romaji}
              </p>
            )}
          </div>
          {data.title && (
            <div className="text-[2.3rem] font-semibold">
              {data.title.english || data.title.romaji}
            </div>
          )}
          <div className="flex gap-1 h-[20px] text-black text-[0.9rem] font-semibold">
            <p className="w-[30px] h-full bg-cyan-100  flex justify-center items-center rounded-l rounded-bl">
              R
            </p>
            <p className="w-[30px] h-full bg-pink-200  flex justify-center items-center ">
              HD
            </p>
            <div className="w-[40px] h-full bg-green-200  flex justify-center items-center gap-1">
              <FontAwesomeIcon
                icon={faClosedCaptioning}
                className="text-[0.7rem]"
              />
              <p>{data.totalEpisodes}</p>
            </div>
            <div className="w-[40px] h-full bg-blue-200 flex justify-center items-center gap-1">
              <FontAwesomeIcon icon={faMicrophone} className="text-[0.7rem]" />
              <p>4</p>
            </div>
            <p className="w-[30px] h-full bg-white/20 text-white backdrop-blur-md  flex justify-center items-center">
              {data.totalEpisodes}
            </p>
            <div className="flex justify-evenly items-center text-white font-light w-[120px]">
              <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
              <p className="font-medium">{data.type}</p>
              <FontAwesomeIcon icon={faCircle} className="text-[4px] text-zinc-400/70" />
              <p>{data.duration}m</p>
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
            {data.description && data.description.replace(/<\/?[^>]+(>|$)/g, "")}
          </div>
        </div>
      </div>
  )
}

export default AnimeDetails;