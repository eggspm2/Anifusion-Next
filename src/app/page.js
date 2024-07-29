
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {



 
  return (
    <div className="flex flex-col justify-center items-center relative top-[65px] h-[100vh]">
      <Link href='/Main/Anime'>
       <Button>
        Anime
       </Button>
       </Link>
    </div>
  );
}
