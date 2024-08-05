"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AniWatchAnimeId } from "@/components/hooks/UseApiFetch";
import AnimeDetails from "@/components/animeDetails";
import SideDetails from "@/components/SideDetails";
import back from "../../../../assets/back.png";
import Image from "next/image";
import LeftData from "@/components/LeftData";
import { RightData } from "@/components/RightData";

const Page = () => {
  const { id } = useParams();
  const [AniwatchData, setAniwatchData] = useState("");

  useEffect(() => {
    const fetching = async () => {
      const response = await AniWatchAnimeId(id);

      if (response) {
        console.log(response);
        setAniwatchData(response);
      }
    };
    fetching();
  }, [id]);

  if (!AniwatchData) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col">
      <div className=" w-full flex max-md:flex-col h-[600px] max-md:h-min relative">
        <Image
          src={back}
          alt=""
          width={0}
          height={0}
          className="absolute w-full h-full object-cover"
        />
        {AniwatchData.anime && (
          <div className="flex max-md:flex-col">
            <AnimeDetails data={AniwatchData.anime.info} />
            <div className="w-[23%] max-md:w-full flex bg-zinc-900/80 backdrop-blur-[10px] p-[29px]">
              <SideDetails Aniwatch={AniwatchData.anime.moreInfo} />
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-md:flex-col flex bg-black/40">
        <LeftData result={AniwatchData} />
        <div className="w-[23%] max-md:w-full h-full p-[10px]">
          <RightData data={AniwatchData} height={"h-[600px]"} />
        </div>
      </div>
    </div>
  );
};

export default Page;
