"use client";

import Airing from "@/components/Airing";
import { Animetable } from "@/components/Anime.table";
import { AnimeContainer } from "@/components/AnimeContainer";
import { AniWatchHome, AniWatchSchedule } from "@/components/hooks/UseApiFetch";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";

export default function Anime() {
  const [SpotLightData, setSpotLightData] = useState("");
  const [Airing1, setAiring1] = useState("");
  const [Airing2, setAiring2] = useState("");
  

  useEffect(() => {
    const Fetching = async () => {
      const data = await AniWatchHome();
      if (data) {
        setSpotLightData(data.spotlightAnimes);
        setAiring1(data.topAiringAnimes.slice(0, 9));
        setAiring2(data.topAiringAnimes.slice(10, 19));
      }
    };
    Fetching();
  }, []);

  return (
    <main className="flex flex-col items-center bg-black overflow-hidden">
      <Slider data={SpotLightData} />
      <AnimeContainer/>
      <Animetable Airing1={Airing1} Airing2={Airing2} />
      <Airing/>
    </main>
  );
}
