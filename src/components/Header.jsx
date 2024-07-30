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
import { FetchBySearch, MangaSearch } from "./hooks/UseApiFetch";
import Toggle from "./toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFilm,
  faMagnifyingGlass,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";
import SearchStack from "./SearchStack";
import SearchResults from "./SearchResults";

const Header = () => {
  const [focused, setFocused] = useState(false);
  const [isManga, setIsManga] = useState(false);
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [SearchToggle, setSearchToggle] = useState(false);

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
      if(name){
        setFocused(true);
      }
      else{
        setFocused(false);
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

  if (!result) return <div>Hello</div>;
  return (
    <div className="flex  items-center w-full h-[65px] max-md:justify-between bg-zinc-800/30 px-[20px] border-b border-zinc-500/50 fixed z-20 backdrop-blur-[10px]">
      <div className="w-[18%] text-center max-md:w-min">
        <p className="text-[25px] font-semibold max-md:text-[20px]">
          <span className="text-[40px] max-md:text-[35px] font-bold text-cyan-600 px-1">
            A
          </span>
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
                      src=""
                      alt="Name"
                      className=" w-[200px] h-[100%] rounded-xl"
                    />
                    <div className="flex flex-col"></div>
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
                      src=""
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
      <div className="flex justify-end items-end  w-[600px] transition duration-1000 ease max-md:hidden">
        <div
          className={`flex justify-between items-center w-[400px] h-[35px] px-[10px] bg-zinc-800/30 border ${
            focused ? "border-white" : "border-zinc-500/50"
          } rounded-[10px] relative`}
        >
          <SearchStack
            Unfocused={Unfocused}
            OnFocused={OnFocused}
            focused={focused}
            isManga={isManga}
            handleText={handleText}
          />
          {focused && result && (
            <div className="SearchContainer bg-zinc-900/80 border border-zinc-500/50">
              <SearchResults result={result} />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center gap-[10px] text-xl h-[35px] w-[25%] max-md:w-[40%]">
        <Button
          size={"icon"}
          variant={"outline"}
          className="hidden max-md:flex"
          onClick={() => setSearchToggle(!SearchToggle)}
        >
           <FontAwesomeIcon icon={faMagnifyingGlass} />
           </Button>
          {SearchToggle && (
            <div className="absolute flex flex-col justify-center items-center gap-4 top-full w-[100%] left-0 p-[10px] bg-zinc-900">
              <div
                className={`w-full bg-zinc-800/50 p-[10px]  border ${
                  focused ? "border-white" : "border-zinc-500/50"
                } rounded-[10px]`}
              >
                <SearchStack
                  Unfocused={Unfocused}
                  OnFocused={OnFocused}
                  focused={focused}
                  isManga={isManga}
                  handleText={handleText}
                />
              </div>
              {focused && result && (
                <div className="w-full max-h-[300px] bg-zinc-800 rounded-lg overflow-y-scroll ScrollWidth text-[15px]">
                  <SearchResults result={result} />
                </div>
              )}
            </div>
          )}
        <Button size={"icon"} variant={"outline"}>
          <FontAwesomeIcon icon={faShuffle} />
        </Button>
        <Toggle />
      </div>
    </div>
  );
};
export default Header;
