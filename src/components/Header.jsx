"use client";

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FetchByData, MangaDetail } from "./hooks/UseApiFetch";
import Toggle from "./toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFilm, faMagnifyingGlass, faShuffle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";

const Header = () => {
  const [focused, setFocused] = useState(false);
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');

  useEffect(() => {
    const fetching = async () => {
      const data = await FetchByData(16498);
      if (data) {
        setData1(data);
      }

      const response = await MangaDetail(105398);
      if(response){
        setData2(response);
      }
    };
    fetching();
  }, []);

  const OnFocused = () => {
    setFocused(true);
  };

  const Unfocused = () => {
    setFocused(false);
  };

  if(!data1 || !data2 || !data1.title || !data2.title) return <div>Hello</div>;
  return (
    <div className="flex  items-center w-full h-[65px] bg-zinc-800/30 px-[20px]">
      <div className="w-[18%] text-center">
        <p className="text-[25px]">
          <span className="text-[40px] font-bold text-gray-600">A</span>nifusion
        </p>
      </div>
      <div className=" flex justify-center items-start w-[400px]">
        <NavigationMenu>
          <NavigationMenuList className="gap-[10px]">
            <NavigationMenuItem >
              <NavigationMenuTrigger className="w-[150px] flex gap-[10px] text-[16px] font-semibold border border-zinc-500/50">
              <FontAwesomeIcon icon={faFilm}/>
                <p>Anime</p>
                </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <div className="flex w-[500px] h-[300px] p-[10px] bg-zinc-800/30">
                    <img
                      src={data1.image}
                      alt="Name"
                      className=" w-[200px] h-[100%] rounded-xl"
                    />
                    <div className="flex flex-col">
                    <h1 className="text-[20px]">{data1.title && data1.title.english || data1.title.romaji || data1.title.native }</h1>
                    </div>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-[150px]  flex gap-[10px] text-[16px] font-semibold border border-zinc-500/50">
              <FontAwesomeIcon icon={faBook} />
              <p>Manga</p>
                </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <div className="flex w-[500px] h-[300px] p-[10px] bg-zinc-800/30">
                    <img
                      src={data2.image}
                      alt="Name"
                      className=" w-[200px] h-[100%] rounded-xl"
                    />
                     <div className="">
                    <h1>{data2.title && data2.title.english || data2.title.romaji}</h1>
                    </div>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex justify-end items-end w-[600px] transition duration-1000 ease">
        <div className={`flex  justify-between items-center w-[400px] h-[35px] px-[10px] bg-zinc-800/30 border ${focused ? "border-white" : "border-zinc-500/50"} rounded-[10px]`}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`text-[15px]  ${focused ? "opacity-100" : "opacity-0"} `}
          />
          <input
            placeholder="Search Anime"
            onClick={() => OnFocused()}
            className={`w-[300px] outline-none bg-transparent absolute transition duration-1000 ease ${
              focused ? `translate-x-[30px]` : `translate-x-0`
            }`}
          />
          <div className="flex relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`text-[15px] transition duration-1000 ease ${focused ? "scale-0" : "scale-x-100"}`}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className={`text-[15px] transition duration-1000 ease absolute ${focused ? "scale-100" : "scale-x-0"}`}
            onClick={() => Unfocused()}
          />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-[10px] text-xl h-[35px] w-[400px]">
        <Button size={"icon"} variant={"outline"}><FontAwesomeIcon icon={faShuffle}/></Button>
        <Toggle />
      </div>
    </div>
  );
};
export default Header;
