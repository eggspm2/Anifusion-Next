"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AniWatchAnimeId, FetchById } from "@/components/hooks/UseApiFetch";
import AnimeDetails from "@/components/animeDetails";
import SideDetails from "@/components/SideDetails";
import back from "../../../assets/image.png";

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
    <div className=" w-full flex h-[600px] relative top-[65px]">
      <img src={back} alt=""  className='absolute w-full h-full object-cover'/>
      
      {AniwatchData.anime && (
        <>
        <AnimeDetails data={AniwatchData.anime.info} />
        <SideDetails Aniwatch={AniwatchData.anime.moreInfo} />
        </>
      )}
    </div>
  );
};

export default Page;
