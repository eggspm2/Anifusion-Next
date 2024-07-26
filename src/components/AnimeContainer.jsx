"use client";

import { AnimeList } from "./AnimeList";

export const AnimeContainer = ({ trending, topUpcoming }) => {
  if (!trending || !topUpcoming) return <div>Loading ...</div>;
  return (
    <>
      <div className="flex flex-col w-[95%] gap-10">
        <AnimeList data={trending} name={"Trending"} />
        <AnimeList data={topUpcoming} name={"UpComing"} />
      </div>
    </>
  );
};
