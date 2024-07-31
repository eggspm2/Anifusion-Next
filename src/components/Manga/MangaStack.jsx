"use client";

import { MangaList } from "./MangaList";

export const MangaStack = ({ trending, topUpcoming }) => {
  if (!trending || !topUpcoming) return <div>Loading ...</div>;
  return (
      <div className="flex flex-col w-[95%] gap-10">
        <MangaList data={trending} name={"Trending"}  />
        <MangaList data={topUpcoming} name={"UpComing"}/>
      </div>
  );
};
