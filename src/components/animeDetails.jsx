"use client";

import React from 'react';
import {
    faCircle,
    faPlay,
    faPlus,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import DetailStack from './detailStack';

 const AnimeDetails = ({data}) => {

    if (!data) return <div>Loading ...</div>;
  return (
    <div className="w-[77%] max-md:w-full max-md:flex-col h-full bg-zinc-900/70 backdrop-blur-[20px] flex p-[60px] gap-10">
        <img
          src={data.poster}
          alt="Anime Image"
          className=" w-[200px] h-[250px] object-cover"
        />
        <div className="flex flex-col gap-7">
          <div className="flex items-center text-[0.9rem] gap-2 max-md:hidden">
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
         <DetailStack data={data}/>
          <div className="flex w-full gap-4 text-black">
          <Link  href={`/Anime/Episode/${data.id}`} className="flex justify-center items-center w-[180px] bg-pink-300 rounded-3xl h-[45px] gap-2">
          <FontAwesomeIcon icon={faPlay} />
            <p>Watch now</p>
          </Link>
          <div className="flex justify-center items-center w-[180px] bg-green-100 rounded-3xl h-[45px] gap-2">
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