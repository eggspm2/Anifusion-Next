"use client";

import React from "react";

const SideDetails = ({ Aniwatch, style}) => {

 
  if (!Aniwatch) return <div>Loading ...</div>;
  return (
    <div className={`w-full h-full  flex flex-col justify-center text-[0.8rem] ${style} gap-2`}>
      <div className="flex gap-2">
        <p className="font-semibold">Jepang: </p>
        <p className="font-light">{Aniwatch.japanese}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Rilis: </p>
        <p className="font-light">{Aniwatch.aired}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Premier:</p>
        <p className="font-light">{Aniwatch.premiered}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Durasi: </p>
        <p className="font-light">{Aniwatch.duration}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Status: </p>
        <p className="font-light">{Aniwatch.status}</p>
      </div>
      <div className="flex gap-2 pb-1">
        <p className="font-semibold">Score: </p>
        <p className="font-light">{Aniwatch.malscore}</p>
      </div>
      
      <div className=" border-t border-b border-white/20 ">
      <div className="py-[20px] flex flex-wrap gap-2 ">
          <p>Genres: </p>
          {Aniwatch.genres &&
            Aniwatch.genres.map((item) => (
              <div key={item} className="h-[20px] border border-white/20 rounded-3xl flex justify-center items-center p-[10px]">{item}</div>
            ))
          }
          </div>
      </div>
      <div className="flex gap-2 pt-1">
        <p className="font-semibold">Studio: </p>
        <p className="font-light">{Aniwatch.studios}</p>
      </div>

      <div className="flex gap-2">
        <p className="font-semibold">Produser: </p>
        <p className="font-light">{Aniwatch.producers}</p>
      </div>
    </div>
  );
};

export default SideDetails;
