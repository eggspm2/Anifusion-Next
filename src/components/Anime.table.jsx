"use client";

import React from "react";
import { Table } from "./table";

export const Animetable = ({Airing1, Airing2}) => {

  if (!Airing1 || !Airing2) return <div>Loading ...</div>;

  return (
    <div className="flex justify-between items-center w-[95%] py-[40px]">
      <Table data={Airing1} name={"Latest"}/>
      <Table data={Airing2} name={"Favourite"}/>
    </div>
  );
};
