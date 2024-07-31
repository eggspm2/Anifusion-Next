"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  AniWatchAnimeId,
} from "@/components/hooks/UseApiFetch";
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
    <>
      <div className=" w-full flex h-[600px]">
        <Image
          src={back}
          alt=""
          width={0}
          height={0}
          className="absolute w-full h-full object-cover"
        />
        {AniwatchData.anime && (
          <>
            <AnimeDetails data={AniwatchData.anime.info} />
            <div className="w-[23%] flex  bg-zinc-900/60 backdrop-blur-[10px] p-[29px]">
              <SideDetails Aniwatch={AniwatchData.anime.moreInfo} />
            </div>
          </>
        )}
      </div>
      <div className="w-full flex relative top-[65px] bg-zinc-800/50">
        <LeftData result={AniwatchData} />
        <div className="w-[23%] h-full p-[10px]">
          <RightData data={AniwatchData} height={"h-[600px]"} />
        </div>
      </div>
    </>
  );
};

export default Page;
