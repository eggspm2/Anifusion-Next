"use client";

import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const MangaCourosale = ({ data }) => {
    if(!data) return <div>Loading ...</div>
  return (
    <div className="flex w-[95%] justify-center items-center border border-zinc-500/50 rounded-lg overflow-hidden">
      <div className="flex w-full h-[400px] items-center blur-[10px] relative">
        <img
          src={data.imageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="CourosaleGradient"></div>
      </div>
      <div className="flex  w-full absolute  justify-center gap-10 p-[30px]">
        <div className="flex flex-col gap-5">
        <img
          src={data.imageUrl}
          alt="Image"
          className="h-[300px] w-[200px] object-cover rounded-lg Box_Shadow
          "
        />
        <Link href={`/Manga/Read/${data.chapterList[0].path}`}>
        <Button className="gap-2">
            <FontAwesomeIcon icon={faBook}/>
            <p>Read now</p>
        </Button>
        </Link>
        </div>
        <div className="flex flex-col justify-center gap-3 w-[75%]">
          <h1 className="text-[40px] font-semibold ">{data.name}</h1>
          <div className="flex gap-2">
            {data.genres.map((item,index) => (
                <Button key={index}>{item}</Button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
            <FontAwesomeIcon icon={faCircle} className={`text-[8px] ${data.status === "Ongoing" ? "text-green-500" : "text-orange-500"}`}/>
            <p>{data.status}</p>
          </div>
          <div>{data.updated}</div>
          <div>{data.author}</div>
        </div>
      </div>
    </div>
  );
};
