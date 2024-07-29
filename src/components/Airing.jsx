"use client";

import React, { useEffect, useState } from "react";
import { AniWatchSchedule } from "./hooks/UseApiFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Airing = () => {
  const [today, setToday] = useState(new Date());
  const [Schedule, setSchedule] = useState("");
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    function formatDate(d) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    const ScheduleFetch = async () => {
      const ScheduleDay = await AniWatchSchedule(formatDate(today));
      if (ScheduleDay) {
        console.log(ScheduleDay);
        setSchedule(ScheduleDay.scheduledAnimes);
      }
    };
    ScheduleFetch();
  }, [today]);

  const Week = [
    { id: 6, name: "Sun", day: "Sunday" },
    { id: 0, name: "Mon", day: "Monday" },
    { id: 1, name: "Tue", day: "Tuesday" },
    { id: 2, name: "Wed", day: "Wednesday" },
    { id: 3, name: "Thu", day: "Thursday" },
    { id: 4, name: "Fri", day: "Friday" },
    { id: 5, name: "Sat", day: "Saturday" },
  ];

  const handleButtonClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
   console.log("done");
  };
  const day = (number) => {
    const day = new Date();
    day.setDate(day.getDate() + number);
    console.log(day);
    setToday(day);
    handleButtonClick();
  };

  
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="flex justify-evenly items-center w-[70%] gap-4">
        {Week.map((item) => (
          <div
            key={item.id}
            className={` py-[10px] px-[20px] rounded-lg border border-zinc-500/50 Transition hover:bg-cyan-600 ${
              today.toString().includes(item.name)
                ? "bg-cyan-600"
                : "bg-zinc-800/50"
            }`}
            onClick={() => day(item.id)}
          >
            {item.day}
          </div>
        ))}
      </div>
      {Schedule && (
        <div className="flex justify-center items-center flex-col gap-3 w-full p-[10px] ">
          {Schedule.map((item, index) => (
            <Link 
              href={`/home/${item.id}`}
              key={index}
              className={`flex justify-between gap-2 bg-zinc-800/50 w-[70%] p-[20px] border border-zinc-500/50 rounded-lg Transition ${animate ? "Animation" : "" } hover:bg-zinc-500/50`}
            >
              <div className="flex gap-2 justify-center items-center bg-white text-black px-[10px] rounded-2xl">
                <FontAwesomeIcon icon={faPlay} />
                <p>{item.episode}</p>
              </div>
              <h1 className="w-full px-[10px]">{item.name}</h1>
              <div className="flex gap-2 justify-center items-center bg-white text-black px-[10px] rounded-2xl">
                <p>{item.time}</p>
                <FontAwesomeIcon icon={faClock}/>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Airing;
