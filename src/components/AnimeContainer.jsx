"use client";

import React, { useEffect, useState } from "react";


import { NewsetApi, PopularApi } from "./hooks/UseApiFetch";
import { AnimeList } from "./AnimeList";

export const AnimeContainer = () => {
  const [data, setData] = useState();
  const [popular, setPopular] = useState();

  useEffect(() => {
    const Fetching = async () => {
      const response = await NewsetApi();
      if (response) {
        setData(response);
        console.log(response);
      }
      const response2 = await PopularApi();
      if(response2){
        setPopular(response2);
      }
    };
    Fetching();
  }, []);

  if (!data || !popular) return <div>Loading ...</div>;
  return (
    <>
    <div className="flex flex-col w-[95%] gap-10">
      <AnimeList data={data} name={"Trending"}/>
      <AnimeList data={popular} name={"Popular"}/>
      </div>
      </>
  );
};
