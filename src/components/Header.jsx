"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AniWatcSearch, MangaSearch } from "./hooks/UseApiFetch";
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
import MangaSearchResults from "./Manga/MangaSearchResults";
import { usePathname } from "next/navigation";

const Header = () => {
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [SearchToggle, setSearchToggle] = useState(false);
  const [isManga, setIsManga] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const Location = usePathname();

  useEffect(() => {
    const Path = () => {
      if (Location.includes("Manga")) {
        setIsManga(true);
      } else {
        setIsManga(false);
        setIsShown(true);
      }

      if (Location.includes("Read")) {
        setIsShown(false);
      } else {
        setIsShown(true);
      }
    };
    Path();
  }, [Location, isManga, isShown]);

  useEffect(() => {
    const SearchFetching = async () => {
      if (isManga) {
        const response = await MangaSearch(name);
        if (response) {
          setResult(response);
        }
      } else {
        const response = await AniWatcSearch(name);
        if (response) {
          setResult(response);
        }
      }
    };
    SearchFetching();
  }, [name]);

  const handleText = (e) => {
    setName(e.target.value);
  };

  const OnFocused = (show) => {
    if (show) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  };

  if (!isShown) return <div></div>;
  return (
    <div className="flex  items-center w-[100vw] h-[65px] max-md:justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-[20px] border-b border-zinc-500/50 fixed z-20 backdrop-blur-[10px]">
      <div className="w-[18%] text-center max-md:w-min">
        <p className="text-[25px] font-semibold max-md:text-[20px]">
          <span className="text-[40px] max-md:text-[35px] font-bold text-cyan-600 px-1">
            A
          </span>
          nifusion
        </p>
      </div>
      
      <div className="flex justify-end items-end  w-[600px] transition duration-1000 ease max-md:hidden">
        <div
          className={`flex justify-between items-center w-[400px] h-[35px] px-[10px] bg-zinc-800/30 border ${
            focused ? "border-white" : "border-zinc-500/50"
          } rounded-[10px] relative`}
        >
          <SearchStack
            OnFocused={OnFocused}
            focused={focused}
            isManga={isManga}
            handleText={handleText}
          />
        
            <div className={`SearchContainer bg-zinc-900/80 border border-zinc-500/50 ${focused ? 'scale-100' : 'scale-0'}`}>
              {isManga ? (
                <MangaSearchResults result={result} setFocused={setFocused}/>
              ) : (
                <SearchResults result={result} width={"w-[250px]"} setFocused={setFocused} />
              )}
            </div>
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
        
        <div
          className={`absolute  flex-col justify-center items-center Transition ${
            SearchToggle ? "scale-100" : "scale-0"
          } gap-4 top-full w-[100%] left-0 p-[10px] bg-zinc-900`}
        >
          <div
            className={`w-full bg-zinc-800/50 p-[10px]  border ${
              focused ? "border-white" : "border-zinc-500/50"
            } rounded-[10px]`}
          >
            <SearchStack
              OnFocused={OnFocused}
              focused={focused}
              isManga={isManga}
              handleText={handleText}
            />
          </div>
          {focused && result && (
            <div className="w-full max-h-[300px] bg-zinc-800 rounded-lg overflow-y-scroll ScrollWidth text-[15px]">
              {isManga ? (
                <MangaSearchResults result={result} setFocused={setSearchToggle} />
              ) : (
                <SearchResults result={result} width={"w-[200px]"} setFocused={setSearchToggle} />
              )}
            </div>
          )}
        </div>
        <Button size={"icon"} variant={"outline"}>
          <FontAwesomeIcon icon={faShuffle} />
        </Button>
        <Toggle />
      </div>
    </div>
  );
};
export default Header;
