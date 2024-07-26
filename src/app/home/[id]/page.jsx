"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FetchById } from "@/components/hooks/UseApiFetch";
import AnimeDetails from "@/components/animeDetails";
import SideDetails from "@/components/SideDetails";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const response = await FetchById(id);
      if (response) {
        console.log(response);
        setData(response);
      }
    };
    fetching();
  }, [id]);

  if (!data) return <div>Loading ...</div>;
  return (
    <div className=" w-full flex h-[600px] relative top-[65px] backImage">
      <AnimeDetails data={data}/>
      <SideDetails result={data}/>
    </div>
  );
};

export default Page;
