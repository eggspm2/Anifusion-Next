"use client";

import { Skeleton } from "../ui/skeleton";
import { MangaList } from "./MangaList";

export const MangaStack = ({ trending, topUpcoming }) => {
  if (!trending || !topUpcoming || !trending[5].image || !topUpcoming[5].image) return <div className="flex flex-col w-full items-center gap-10">
    <Skeleton className='w-[95%] h-[300px]'/>
    <Skeleton className='w-[95%] h-[300px]'/>
  </div>;
  return (
      <div className="flex flex-col w-[95%] gap-10">
        <MangaList data={trending} name={"Trending"}  />
        <MangaList data={topUpcoming} name={"UpComing"}/>
      </div>
  );
};
