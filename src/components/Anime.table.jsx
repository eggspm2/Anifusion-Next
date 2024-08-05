"use client";

import React from "react";
import { Table } from "./table";
import { Skeleton } from "./ui/skeleton";

export const Animetable = ({ Airing1, Airing2 }) => {
  const skeletonArray = Array.from({ length: 6 });

  if (!Airing1 || !Airing2) {
    return (
      <div className="flex justify-between items-center w-[95%]  max-md:flex-col max-md:gap-5 py-[40px]">
        <Skeleton className="w-[49%] max-md:w-full h-[600px] flex flex-col rounded-xl gap-5 max-md:p-[10px] p-[20px]">
          {skeletonArray.map((_, index) => (
            <Skeleton key={index} className="w-full h-[100px]" />
          ))}
        </Skeleton>
        <Skeleton className="w-[49%] max-md:w-full h-[600px] flex flex-col rounded-xl gap-5 max-md:p-[10px] p-[20px]">
          {skeletonArray.map((_, index) => (
            <Skeleton key={index} className="w-full h-[100px]" />
          ))}
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center w-[95%] max-md:flex-col max-md:gap-5 py-[40px]">
      <div className="w-[49%] max-md:w-full flex flex-col border border-zinc-500/50 bg-black/40 rounded-xl gap-5 max-md:p-[10px] p-[20px]">
        <Table data={Airing1} name={"Latest"} width={"w-[230px]"} />
      </div>
      <div className="w-[49%] max-md:w-full flex flex-col border border-zinc-500/50 bg-black/40 rounded-xl max-md:p-[10px] gap-5 p-[20px]">
        <Table data={Airing2} name={"Favourite"} width={"w-[230px]"} />
      </div>
    </div>
  );
};
