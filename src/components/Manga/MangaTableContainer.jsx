"use client";

import React, { useEffect, useState } from "react";
import { MangaTable } from "./MangaTable";
import { MangaTableData } from "../hooks/UseApiFetch";
import { Skeleton } from "../ui/skeleton";

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
  const skeletonArray = Array.from({ length: 6 });

  if (!Table1 || !Table2)
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

  return (
    <div className="flex max-md:flex-col justify-between items-center w-[95%] py-[40px]">
      <div className="w-[49%] max-md:w-full flex flex-col border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-5 max-md:p-[10px] p-[20px]">
        <MangaTable data={Table1} name={"Latest"} />
      </div>
      <div className="w-[49%] max-md:w-full flex flex-col border border-zinc-500/50 bg-zinc-800/30 rounded-xl gap-5 max-md:p-[10px] p-[20px]">
        <MangaTable data={Table2} name={"Favourite"} />
      </div>
    </div>
  );
};
