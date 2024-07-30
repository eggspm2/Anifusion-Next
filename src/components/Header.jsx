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
import {
  FetchByData,
  FetchBySearch,
  MangaDetail,
  MangaSearch,
} from "./hooks/UseApiFetch";
import Toggle from "./toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFilm,
  faMagnifyingGlass,
  faShuffle,
  faXmark,
  faCalendarDays,
  faFolderOpen,
  faStar,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  const [focused, setFocused] = useState(false);
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [isManga, setIsManga] = useState(false);
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);

  

  useEffect(() => {
    const SearchFetching = async () => {
      if (isManga) {
        const response = await MangaSearch(name);
        if (response) {
          console.log(response);
        }
      } else {
        const response = await FetchBySearch(name);
        if (response) {
          console.log(response);
          setResult(response);
        }
      }
    };
    SearchFetching();
  }, [name]);

  const handleText = (e) => {
    setName(e.target.value);
  };

  const OnFocused = () => {
    setFocused(true);
  };

  const Unfocused = () => {
    setFocused(false);
  };

  if (!result)
    return <div>Hello</div>;
  return (
    <div className="flex  items-center w-full h-[65px] max-md:justify-between bg-zinc-800/30 px-[20px] border-b border-zinc-500/50 fixed z-20 backdrop-blur-[10px] overflow-hidden">
      <div className="w-[18%] text-center max-md:w-min">
        <p className="text-[25px] font-semibold max-md:text-[20px]">
          <span className="text-[40px] max-md:text-[35px] font-bold text-cyan-600 px-1">A</span>
          nifusion
        </p>
      </div>
      <div className=" flex justify-center items-start w-[400px] max-md:hidden">
        <NavigationMenu>
          <NavigationMenuList className="gap-[10px]">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-[150px] flex gap-[10px] text-[16px] font-semibold border border-zinc-500/50">
                <FontAwesomeIcon icon={faFilm} />
                <p>Anime</p>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <div className="flex w-[500px] h-[300px] p-[10px] bg-zinc-800/30">
                    <img
                      src=''
                      alt="Name"
                      className=" w-[200px] h-[100%] rounded-xl"
                    />
                    <div className="flex flex-col">
                      
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
                      src=''
                      alt="Name"
                      className=" w-[200px] h-[100%] rounded-xl"
                    />
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex justify-end items-end w-[600px] transition duration-1000 ease max-md:hidden">
        <div
          className={`flex  justify-between items-center w-[400px] h-[35px] px-[10px] bg-zinc-800/30 border ${
            focused ? "border-white" : "border-zinc-500/50"
          } rounded-[10px] relative`}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`text-[15px]  ${focused ? "opacity-100" : "opacity-0"} `}
          />
          <input
            placeholder={isManga ? "Search Manga" : "Search Anime"}
            onClick={() => OnFocused()}
            className={`w-[300px] outline-none bg-transparent absolute transition duration-1000 ease ${
              focused ? `translate-x-[30px]` : `translate-x-0`
            }`}
            onChange={handleText}
          />
          <div className="flex relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`text-[15px] transition duration-1000 ease ${
                focused ? "scale-0" : "scale-x-100"
              }`}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className={`text-[15px] transition duration-1000 ease absolute ${
                focused ? "scale-100" : "scale-x-0"
              }`}
              onClick={() => Unfocused()}
            />
          </div>
          <div className={`SearchContainer ${focused ? "flex" : "hidden"}`}>
            <div className="flex flex-col gap-3 h-full w-full p-[10px] bg-zinc-900/80 border border-zinc-500/50 overflow-y-scroll ScrollWidth">
              <h1>Search Results</h1>
              {result &&
                result.map((item) => (
                  <Link
                    href={`/home/${item.id}`}
                    key={item.id}
                    className="flex  w-full h-[100px] bg-zinc-700/50 border border-zinc-500/50 rounded-xl p-[10px]"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-[60px] h-full object-cover rounded-xl border border-zinc-500/50"
                    />
                    <div className="flex flex-col justify-center items-center w-full gap-4">
                      {item.title.english && (
                        <h1 className="text-[18px] font-semibold">
                          {item.title.english.length > 20
                            ? item.title.english.substring(0, 18) + "..."
                            : item.title.english || item.title.romaji}
                        </h1>
                      )}
                      <div className="flex justify-evenly items-center w-full text-gray-500 ">
                        <div className="flex justify-center items-center gap-1">
                          <FontAwesomeIcon icon={faTv} />
                          <p>{item.type || "??"}</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <FontAwesomeIcon icon={faCalendarDays} />
                          <p>{item.releaseDate || "??"}</p>
                        </div>

                        <div className="flex justify-center items-center gap-1">
                          <FontAwesomeIcon icon={faFolderOpen} />
                          <p>{item.totalEpisodes || "??"}</p>
                        </div>

                        <div className="flex justify-center items-center gap-1">
                          <FontAwesomeIcon icon={faStar} />
                          <p>{item.rating / 10 || "??"}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-[10px] text-xl h-[35px] w-[400px] max-md:hidden">
        <Button size={"icon"} variant={"outline"}>
          <FontAwesomeIcon icon={faShuffle} />
        </Button>
        <Toggle />
      </div>
    </div>
  );
};
export default Header;
