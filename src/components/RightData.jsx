"use client";

import React from "react";
import { Table } from "./table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export const RightData = ({ data ,height}) => {
  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-full gap-5  h-[100%]">
      {data.relatedAnimes && (
        <div className="flex flex-col gap-2 p-[10px] border border-zinc-500/50 rounded-lg ">
          <div className="flex gap-3 items-center text-[30px] max-md:text-[25px] font-semibold">
            <FontAwesomeIcon icon={faLayerGroup}/>
          <h1>Related Anime</h1>
          </div>
          <div className="overflow-y-scroll ScrollWidth max-h-[400px] flex flex-col gap-2">
          <Table data={data.relatedAnimes} width={'w-[180px] text-[12px]'} />
          </div>
        </div>
      )}
      {data.mostPopularAnimes.length > 0 && (
        <div className="flex flex-col gap-2 p-[10px]  border border-zinc-500/50  rounded-lg">
          <div className="flex gap-3 items-center text-[30px] font-semibold max-md:text-[25px]">
            <FontAwesomeIcon icon={faFire}/>
          <h1>Most Popular</h1>
          </div>
          <div className={`flex flex-col gap-2 ${height} overflow-y-scroll ScrollWidth`}>
          <Table data={data.mostPopularAnimes} width={'w-[180px] text-[12px]'}/>
          </div>
        </div>
      )}
    </div>
  );
};
