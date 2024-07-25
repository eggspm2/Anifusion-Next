import { Animetable } from "@/components/Anime.table";
import { AnimeContainer } from "@/components/AnimeContainer";
import Slider from "@/components/Slider";


export default function Home() {
  return (
    <main className="flex flex-col items-center relative top-[65px]">
       <Slider/>
       <AnimeContainer/>
       <Animetable/>
    </main>
  );
}
