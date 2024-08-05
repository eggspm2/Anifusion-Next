"use client";

import { useEffect, useState } from "react";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryFetch } from "./hooks/UseApiFetch";
import Link from "next/link";

export const AnimeContainer = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState("");
  const [Animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      const response = await CategoryFetch(page);
      if (response) {
        setData(response.slice(0,32));
      }
    };
    fetching();
  }, [page]);
  const names = [
    { id: 1, name: "Trending" },
    { id: 2, name: "Popular" },
    { id: 3, name: "Favorite" },
    { id: 4, name: "Completed" },
  ];

  const handleButtonClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const getPage = (number) => {
    setPage(number);
    handleButtonClick();
  };

  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-[95%]  gap-[50px] Animation">
      <div className="flex justify-center  gap-10 max-md:gap-3 w-full">
        {names.map((item) => (
          <p
            className={`py-[8px] w-[150px] max-md:w-[25%] max-md:text-[12px] text-center text-[18px] font-semibold border border-zinc-500/50 rounded-lg Transition hover:bg-white hover:text-black ${item.id === page ? "bg-white text-black" : "bg-black/40"}`}
            key={item.id}
            onClick={() => getPage(item.id)}
          >
            {item.name}
          </p>
        ))}
      </div>
      <div className={`flex flex-wrap gap-5 max-md:justify-center ${Animate ? "Animation" : ''}`}>
        {data.map((item, index) => (
          <Link
            href={`/Anime/home/${item.id}`}
            className="flex flex-col w-[15%] max-md:w-[45%] h-[350px] gap-2 font-medium"
            key={index}
          >
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
              <img
                src={item.poster}
                alt="Image"
                className="w-full h-full object-cover rounded-xl Box_Shadow"
              />
              <div className="ImageGradient hover:opacity-100">
                <FontAwesomeIcon icon={faPlay} className="text-[40px]" />
              </div>
            </div>
            <div className="w-full h-[50px] text-[0.9rem] max-md:text-[10px]">
              <h1 className="font-medium">
                {item.name.length > 25
                  ? item.name.substring(0, 21) + "..."
                  : item.name}
              </h1>
              <div className="flex  items-center gap-4 font-extralight text-gray-300">
                <p>{item.type}</p>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-[4px] text-gray-500"
                />
                <p>{item.duration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
