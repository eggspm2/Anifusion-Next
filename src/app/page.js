import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center relative top-[65px] h-[100vh] gap-2">
      <Link href="/Anime">
        <Button>Anime</Button>
      </Link>
      <Link href="/Manga">
        <Button>Manga</Button>
      </Link>
    </div>
  );
}
