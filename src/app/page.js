import { Animetable } from "@/components/Anime.table";
import { AnimeContainer } from "@/components/AnimeContainer";
import Slider from "@/components/Slider";


export default function Home() {
  return (
    <main className="flex flex-col items-center">
       <Slider/>
       <AnimeContainer/>
       <Animetable/>
    </main>
  );
}
