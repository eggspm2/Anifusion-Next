"use client";

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const SearchStack = ({OnFocused, Unfocused, focused, isManga, handleText}) => {
  return (
    <div className="flex justify-between items-center w-full text-[15px]">
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
          </div>
  )
}

export default SearchStack;
