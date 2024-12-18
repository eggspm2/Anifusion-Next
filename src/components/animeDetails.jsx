"use client";

import React from "react";
import { faCircle, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import DetailStack from "./detailStack";

const AnimeDetails = ({ data }) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <div className="w-[77%] max-md:w-full max-md:flex-col max-md:items-center h-full bg-zinc-900/70 backdrop-blur-[10px] flex p-[60px] gap-10">
      <img
        src={data.poster}
        alt="Anime Image"
        className=" w-[200px] h-[250px] object-cover"
      />
      <div className="flex flex-col max-md:items-center gap-7">
        <div className="flex items-center text-[0.9rem] gap-2 max-md:hidden">
          <p className="font-medium">Home</p>
          <FontAwesomeIcon
            icon={faCircle}
            className="text-[4px] text-zinc-400/70"
          />
          <p className="font-medium">{data.stats.type}</p>
          <FontAwesomeIcon
            icon={faCircle}
            className="text-[4px] text-zinc-400/70"
          />
          <p className="text-zinc-400">{data.name}</p>
        </div>
        <div className="text-[2.3rem] font-semibold max-md:text-[1.5rem]">
          {data.name}
        </div>
        <DetailStack data={data} />
        <div className="flex w-full gap-4 text-black">
          <Link
            href={`/Anime/Episode/${data.id}`}
            className="flex justify-center max-md:w-max max-md:px-[10px] items-center w-[180px] bg-pink-300 rounded-3xl h-[45px] gap-2"
          >
            <FontAwesomeIcon icon={faPlay} />
            <p>Tonton sekarang</p>
          </Link>
          <div className="flex justify-center items-center w-[180px] max-md:w-max max-md:px-[10px] bg-green-100 rounded-3xl h-[45px] gap-2">
            <FontAwesomeIcon icon={faPlus} />
            <p>Tambah ke list</p>
          </div>
        </div>
        <div className="w-full text-[0.9rem]">{data.description.length > 650 ? data.description.substring(0,650) + "..." : data.description}</div>
      </div>
    </div>
  );
};

export default AnimeDetails;
