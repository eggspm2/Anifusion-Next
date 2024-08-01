"use client";

import { MangaList } from "@/components/hooks/UseApiFetch";
import MangaSlider from "@/components/Manga/MangaSlider";
import { MangaStack } from "@/components/Manga/MangaStack";
import { MangaTableContainer } from "@/components/Manga/MangaTableContainer";
import React, { useEffect, useState } from "react";

export default function Manga() {
  const [result, setResult] = useState([]); // Changed to empty array
  const [List1, setList1] = useState([]); // Changed to empty array
  const [List2, setList2] = useState([]); // Changed to empty array
  const [Table1, setTable1] = useState([]); // Changed to empty array
  const [Table2, setTable2] = useState([]); // Changed to empty array

  useEffect(() => {
    const Fetching = async () => {
      try {
        const data = await MangaList(1);
        if (data) {
          setResult(data.mangaList || []); // Default to empty array
        }
        const response1 = await MangaList(2);
        if (response1) {
          setList1(response1.mangaList || []); // Default to empty array
        }
        const response2 = await MangaList(3);
        if (response2) {
          setList2(response2.mangaList || []); // Default to empty array
        }
        const response3 = await MangaList(4);
        if (response3) {
          console.log(response3);
          const Slice1 = response3.mangaList.slice(0, 11);
          const Slice2 = response3.mangaList.slice(12, 23);
          setTable1(Slice1);
          setTable2(Slice2);
        }
      } catch (error) {
        console.error(error);
      }
    };
    Fetching();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col w-full bg-zinc-800/50">
      <MangaSlider data={result} />
      <MangaStack trending={List1} topUpcoming={List2} />
      <MangaTableContainer Airing1={Table1} Airing2={Table2} />
    </div>
  );
}
