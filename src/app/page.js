"use client";

import { Animetable } from "@/components/Anime.table";
import { AnimeContainer } from "@/components/AnimeContainer";
import { AniWatchHome } from "@/components/hooks/UseApiFetch";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";


export default function Home() {
  const [SpotLightData, setSpotLightData] = useState([]);
  const [TrendingAnime, setTrendingAmime] = useState([]);
  const [Upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const Fetching = async () => {
      const data = await AniWatchHome();
      if(data){
        console.log(data);
        setSpotLightData(data.spotlightAnimes);
        setTrendingAmime(data.trendingAnimes);
        setUpcoming(data.topUpcomingAnimes);
      }
    }
    Fetching();
  }, []);
  return (
    <main className="flex flex-col items-center relative top-[65px]">
       <Slider data={SpotLightData}/>
       <AnimeContainer trending={TrendingAnime} topUpcoming={Upcoming}/>
       <Animetable/>
    </main>
  );
}
