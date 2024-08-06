"use client";

import { MangaDetail } from "@/components/hooks/UseApiFetch";
import { Chapters } from "@/components/Manga/Chapters";
import { MangaCourosale } from "@/components/Manga/Manga-Courosale";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import React, {useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [MangaData, setMangaData] = useState("");

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await MangaDetail(id);
        if (response) {
          console.log(response);
          setMangaData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetching();
  }, [id]);
  const skeletonArray = Array.from({ length: 12 });

  if (!MangaData)
    return (
      <div className="flex flex-col items-center gap-3 w-full h-max pt-4">
        <Skeleton className="w-[95%] h-[400px]" />
        <Skeleton className="flex flex-col w-[95%] gap-3 p-[10px] max-md:justify-center">
          {skeletonArray.map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-[50px]"
            />
          ))}
        </Skeleton>
      </div>
    );
  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-[20px]">
      <MangaCourosale data={MangaData} id={id} />
      <Chapters data={MangaData} id={id} />
    </div>
  );
};

export default Page;
