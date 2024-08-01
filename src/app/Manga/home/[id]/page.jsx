'use client';

import { MangaDetail } from "@/components/hooks/UseApiFetch";
import { Chapters } from "@/components/Manga/Chapters";
import { MangaCourosale } from "@/components/Manga/Manga-Courosale";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();

  const [MangaData, setMangaData] = useState("");

  useEffect(() => {
    const fetching = async () => {
      try{
        const response = await MangaDetail(id);
        if (response) {
          console.log(response);
          setMangaData(response);
        }
      }
      catch(error){
        console.error(error);
      }
      
    };
    fetching();
  }, [id]);
  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-[20px]">
      <MangaCourosale data={MangaData} />
      <Chapters data={MangaData} id={id}/>
    </div>
  );
};

export default Page;
