"use client";

import React, { useEffect, useState } from "react";
import { NewsetApi, PopularApi } from "./hooks/UseApiFetch";
import { Table } from "./table";

export const Animetable = () => {
  const [data, setData] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    const Fetching = async () => {
      const response = await NewsetApi();
      if (response){
        setData(response);
      }
      const response1 = await PopularApi();
      if(response1){
        setResult(response1);
      }
    };
    Fetching();
  }, []);

  if (!data || !result) return <div>Loading ...</div>;

  return (
    <div className="flex justify-between items-center w-[95%] py-[40px]">
      <Table data={data} name={"Completed"}/>
      <Table data={result} name={"Top-Airing"}/>
    </div>
  );
};
