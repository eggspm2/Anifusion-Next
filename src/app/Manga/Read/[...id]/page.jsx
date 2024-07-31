"use client";

import { MangaChapter } from "@/components/hooks/UseApiFetch";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const page = ({ params }) => {
  const [data, setData] = useState("");
  const [chapter, setChapter] = useState(params.id[1]);
  const [count, setCount] = useState();

  useEffect(() => {
    const Fetching = async () => {
      if (chapter) {
        const response = await MangaChapter(params.id[0] + "/" + chapter);
        if (response) {
          console.log(response);
          setData(response);
          const index = response.chapterListIds.findIndex(
            (item) => item.id === params.id[1]
          );
          console.log(index);
          setCount(index);
        }
      }
    };
    Fetching();
  }, [chapter]);

  const handleNextChapter = () => {
    if (data.chapterListIds.length > 0) {
      setCount(c => c + 1);
      setChapter(data.chapterListIds[count].id);
      console.log(chapter,count);
    }
  };
  const handlePreviousChapter = () => {
    if (count >= 0) {
      setCount((c) => c - 1);
      setChapter(data.chapterListIds[count - 1].id);
      console.log(chapter);
    }
  };
    
  

  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-full gap-4 pt-4">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-[30px]">{data.title}</h1>
        <h2 className="text-[20px]">{data.currentChapter}</h2>
      </div>
      <div className="flex justify-center items-center gap-2">
        <FontAwesomeIcon
          icon={faLeftLong}
          className="bg-zinc-800/50 p-[10px]"
          onClick={() => handlePreviousChapter()}
        />
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <FontAwesomeIcon
          icon={faRightLong}
          className="bg-zinc-800/50 p-[10px]"
          onClick={() => handleNextChapter()}
        />
      </div>
      <div className="flex flex-col w-full justify-center items-center py-[20px]">
        {data.images.map((item, index) => (
          <img
            src={item.image}
            alt=""
            key={index}
            className="object-cover w-[70%]"
          />
        ))}
      </div>
    </div>
  );
};

export default page;
