"use client";

import React from "react";
import { Table } from "./table";

export const RightData = ({ data ,height}) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-full gap-5  h-[100%]">
      {data.relatedAnimes && (
        <div className="flex flex-col gap-2 p-[10px] border border-zinc-500/50 rounded-lg ">
          <h1 className="text-[30px] font-semibold">Related Anime</h1>
          <div className="overflow-y-scroll ScrollWidth max-h-[400px] flex flex-col gap-2">
          <Table data={data.relatedAnimes} className="w-full" />
          </div>
        </div>
      )}
      {data.mostPopularAnimes && (
        <div className="flex flex-col gap-2 p-[10px]  border border-zinc-500/50  rounded-lg">
          <h1 className="text-[30px] font-semibold">Most Popular</h1>
          <div className={`flex flex-col gap-2 ${height} overflow-y-scroll ScrollWidth`}>
          <Table data={data.mostPopularAnimes} className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
};
