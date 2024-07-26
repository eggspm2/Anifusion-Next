"use client";

import React, { useEffect, useState } from "react";

const SideDetails = ({ result }) => {

  const [Start, setStartDate] = useState("");
  const [End, setEndDate] = useState("");

  useEffect(() => {
    const getMonthName = (monthNumber) => {
      const months = [
        "Invalid month number",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[monthNumber] || "N/A";
    };
    if (result) {
      const startMonth = getMonthName(result.startDate.month);
      const endMonth = getMonthName(result.endDate.month);

      const EndDay = result.endDate.day;
      const EndYear = result.endDate.year;
      setEndDate(`${EndDay} ${endMonth}, ${EndYear}`);

      const Startday = result.startDate.day;
      const Startyear = result.startDate.year;
      setStartDate(`${Startday} ${startMonth}, ${Startyear}`);
    }
  }, []);


  if (!result) return <div>Loading ...</div>;
  return (
    <div className="w-[25%] h-full bg-gray-500/40 backdrop-blur-[20px] flex flex-col justify-center text-[0.9rem] p-[20px]">
      <div className="flex gap-2">
        <p className="font-semibold">Japanese: </p>
        <p className="font-light">{result.title && result.title.native}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Aired: </p>
        <p className="font-light">{Start} to {End}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Preimeired:</p>
        <div className="flex font-light gap-1">
        <p>{result.season}</p>
        <p>{result.releaseDate}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Duration: </p>
        <p className="font-light">{result.duration}m</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Status: </p>
        <p className="font-light">{result.status}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Popularity: </p>
        <p className="font-light">{result.popularity}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Rating: </p>
        <p className="font-light">{result.rating/10}</p>
      </div>

      <div className=" border-t border-b border-white/20 ">
      <div className="py-[20px] flex flex-wrap gap-2 ">
          <p>Genres: </p>
          { result.genres &&
            result.genres.map((item) => (
              <div key={item} className="h-[20px] border border-white/20 rounded-3xl flex justify-center items-center p-[10px]">{item}</div>
            ))
          }
          </div>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Studios: </p>
        <p className="font-light">{result.studios}</p>
      </div>
    </div>
  );
};

export default SideDetails;
