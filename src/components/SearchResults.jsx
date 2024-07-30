"use client";

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFolderOpen,
  faStar,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const SearchResults = ({result}) => {
  return (
    <div className="flex flex-col gap-3 h-full w-full p-[10px]  overflow-y-scroll ScrollWidth">
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
  )
}

export default SearchResults;