"use client";

import React from "react";
import Seasons from "./Seasons";

const LeftData = ({ result }) => {

    if(!result) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-[77%]">
      {result.seasons && <Seasons data={result.seasons} />}
    </div>
  );
};

export default LeftData;
