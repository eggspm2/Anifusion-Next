"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const MangaCourosale = ({ data, id }) => {
  console.log(data);
  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex w-[95%] border border-zinc-500/50 rounded-lg overflow-hidden relative">
      <div className="flex w-full h-[400px] absolute blur-[10px] ">
        <img
          src={data.imageUrl}
          alt=""
          className="h-full w-full  object-cover"
        />
        <div className="CourosaleGradient"></div>
      </div>
      <div className="flex w-full max-md:flex-col max-md:items-center gap-10 max-md:p-[10px] p-[30px] z-10">
        <div className="flex flex-col gap-5">
          <img
            src={data.imageUrl}
            alt="Image"
            className="h-[300px] w-[200px] object-cover rounded-lg Box_Shadow"
          />
          <Link
            href={`/Manga/Read/${id}/${
              data.chapterList[data.chapterList.length - 1].id
            }`}
          >
            <Button className="gap-2 w-full">
              <FontAwesomeIcon icon={faBook} />
              <p>Read now</p>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center  gap-6 max-md:w-full w-[75%]">
          <h1 className="text-[40px] font-semibold max-md:text-[20px] max-md:text-center">{data.name}</h1>
          <div className="flex gap-2 max-md:gap-1 max-md:w-full max-md:flex-wrap max-md:justify-center">
            {data.genres.map((item, index) => (
              <Button key={index} className="max-md:text-[10px] max-md:p-3">{item}</Button>
            ))}
          </div>
          <div className="flex items-center max-md:justify-center gap-4">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <FontAwesomeIcon
              icon={faCircle}
              className={`text-[8px] ${
                data.status === "Ongoing" ? "text-green-500" : "text-orange-500"
              }`}
            />
            <p>{data.status}</p>
          </div>
          <div className="max-md:text-center">{data.updated}</div>
          <div className="max-md:text-center">{data.author}</div>
        </div>
      </div>
    </div>
  );
};
