import { AnimeContainer } from "@/components/AnimeContainer";
import Slider from "@/components/Slider";


export default function Home() {
  return (
    <main className="flex flex-col items-center">
       <Slider/>
       <AnimeContainer/>
    </main>
  );
}
