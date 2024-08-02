"use client";

import React, { useEffect, useState } from "react";
import { MangaTable } from "./MangaTable";
import { MangaTableData } from "../hooks/UseApiFetch";

export const MangaTableContainer = () => {
  
  const [Table1, setTable1] = useState("");
  const [Table2, setTable2] = useState("");

  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await MangaTableData("4");
        if (data) {
          const Slice1 = data.mangaList.slice(0, 11);
          const Slice2 = data.mangaList.slice(12, 23);
          setTable1(Slice1);
          setTable2(Slice2);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetching();
  }, []);

  if (!Table1 || !Table2) return <div>Loading ...</div>;

  return (
    <div className="flex justify-between items-center w-[95%] py-[40px]">
      <div className="w-[49%] flex flex-col border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-5 p-[20px]">
        <MangaTable data={Table1} name={"Latest"} />
      </div>
      <div className="w-[49%] flex flex-col border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-5 p-[20px]">
        <MangaTable data={Table2} name={"Favourite"} />
      </div>
    </div>
  );
};
