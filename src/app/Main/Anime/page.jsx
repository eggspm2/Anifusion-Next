"use client";

import Airing from "@/components/Airing";
import { Animetable } from "@/components/Anime.table";
import { AnimeContainer } from "@/components/AnimeContainer";
import { AniWatchHome, AniWatchSchedule } from "@/components/hooks/UseApiFetch";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";

export default function Anime() {
  const [SpotLightData, setSpotLightData] = useState("");
  const [TrendingAnime, setTrendingAmime] = useState("");
  const [Upcoming, setUpcoming] = useState("");
  const [Airing1, setAiring1] = useState("");
  const [Airing2, setAiring2] = useState("");
  

  useEffect(() => {
    const Fetching = async () => {
      const data = await AniWatchHome();
      if (data) {
        setSpotLightData(data.spotlightAnimes);
        setTrendingAmime(data.trendingAnimes);
        setUpcoming(data.topUpcomingAnimes);
        setAiring1(data.topAiringAnimes.splice(0, 10));
        setAiring2(data.topAiringAnimes.splice(0, 10));
      }
    };
    Fetching();
  }, []);

  
  if (!SpotLightData || !TrendingAnime || !Upcoming)
    return <div>Loading ...</div>;
  return (
    <main className="flex flex-col items-center relative top-[65px] overflow-hidden">
      <Slider data={SpotLightData} />
      <AnimeContainer trending={TrendingAnime} topUpcoming={Upcoming} />
      <Animetable Airing1={Airing1} Airing2={Airing2} />
      <Airing />
    </main>
  );
}
