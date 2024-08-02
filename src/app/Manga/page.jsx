"use client";

import { MangaTableData } from "@/components/hooks/UseApiFetch";
import MangaSlider from "@/components/Manga/MangaSlider";
import { MangaStack } from "@/components/Manga/MangaStack";
import { MangaTableContainer } from "@/components/Manga/MangaTableContainer";
import React, { useEffect, useState } from "react";

export default function Manga() {
  const [result, setResult] = useState("");
  const [List1, setList1] = useState("");
  const [List2, setList2] = useState("");

  useEffect(() => {
    const Fetching = async () => {
      try {
        const data = await MangaTableData("1");
        if (data) {
          setResult(data.mangaList);
        }
        const response1 = await MangaTableData("2");
        if (response1) {
          setList1(response1.mangaList);
        }
        const response2 = await MangaTableData("3");
        if (response1) {
          setList2(response2.mangaList);
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
      <MangaTableContainer />
    </div>
  );
}
