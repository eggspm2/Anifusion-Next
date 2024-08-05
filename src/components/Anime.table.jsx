"use client";

import React from "react";
import { Table } from "./table";

export const Animetable = ({Airing1, Airing2}) => {

  if (!Airing1 || !Airing2) return <div>Loading ...</div>;

  return (
    <div className="flex justify-between items-center w-[95%] max-md:flex-col max-md:gap-5 py-[40px]">
      <div className="w-[49%] max-md:w-full flex flex-col border border-zinc-500/50 bg-black/40 rounded-xl gap-5 max-md:p-[10px] p-[20px]">
      <Table data={Airing1} name={"Latest"} width={'w-[230px]'}/>
      </div>
      <div className="w-[49%] max-md:w-full flex flex-col border border-zinc-500/50 bg-black/40 rounded-xl max-md:p-[10px] gap-5 p-[20px]">
      <Table data={Airing2} name={"Favourite"} width={'w-[230px]'}/>
      </div>
    </div>
  );
};
