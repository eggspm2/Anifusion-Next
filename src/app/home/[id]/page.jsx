"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AniWatchAnimeId, AniWatchEpisode, FetchById } from "@/components/hooks/UseApiFetch";
import AnimeDetails from "@/components/animeDetails";
import SideDetails from "@/components/SideDetails";
import back from "../../../assets/back.png";
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
        const data = await AniWatchEpisode(id);
        if(data){
          console.log(data);
        }
        
      }

    };
    fetching();
  }, [id]);

  if (!AniwatchData) return <div>Loading ...</div>;
  return (
    <>
    <div className=" w-full flex h-[600px] relative top-[65px]">

    <Image src={back} alt="" width={0} height={0}  className='absolute w-full h-full object-cover'/>
      {AniwatchData.anime && (
        <>
        <AnimeDetails data={AniwatchData.anime.info} />
        <SideDetails Aniwatch={AniwatchData.anime.moreInfo} />
        </>
      )}
    </div>
    <div className="w-full flex relative top-[65px]">
      <LeftData result={AniwatchData}/>
      <RightData data={AniwatchData}/>
    </div>
    </>
  );
};

export default Page;
