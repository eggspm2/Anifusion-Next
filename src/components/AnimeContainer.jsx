"use client";

import { useEffect, useState } from "react";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryFetch } from "./hooks/UseApiFetch";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AnimeContainer = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [Animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      const response = await CategoryFetch(page);
      if (response) {
        setData(response.slice(0,32));
        console.log(response);
      }
    };
    fetching();
  }, [page]);
  const names = [
    { id: 1, name: "Trending" },
    { id: 2, name: "Popular" },
    { id: 3, name: "Favorite" },
    { id: 4, name: "Latest" },
  ];

  const handleButtonClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const getPage = (number) => {
    setPage(number);
    setData([]);
    handleButtonClick();
  };

  const skeletonArray = Array.from({ length: 18 });

  return (
    <div className="flex flex-col w-[95%] gap-[50px] Animation">
      <div className="flex justify-center  gap-10 max-md:gap-3 w-full">
      <Tabs defaultValue="Trending" className="w-full">
      <TabsList className="flex justify-between gap-2  px-1">
        {names.map((item) => (
            <TabsTrigger value={item.name} key={item.id} className="w-[25%] md:text-[14px] text-[12px]" onClick={() => getPage(item.id)}>{item.name}</TabsTrigger>
        ))}
         </TabsList>
         </Tabs>
      </div>
      {(!data || !data[30]?.poster) ? (
      <div className="flex flex-wrap gap-5 w-full items-center p-[10px] max-md:justify-center">
        {skeletonArray.map((_, index) => (
          <Skeleton key={index} className="w-[190px] h-[300px] max-md:w-[45%] max-md:h[250px]" />
        ))}
      </div>
    ):  (
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
                alt={item.name}
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
      </div>)}
    </div>
  );
};
