"use client";

import { MangaChapter } from "@/components/hooks/UseApiFetch";
import {
  faBook,
  faChevronLeft,
  faChevronRight,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  const [data, setData] = useState("");
  const [chapter, setChapter] = useState(params.id[1]);
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(true);

  useEffect(() => {
    const Fetching = async () => {
      if (chapter) {
        const response = await MangaChapter(params.id[0] + "/" + chapter);
        if (response) {
          console.log(response);
          setData(response);
          const index = response.chapterListIds.findIndex(
            (item) => item.name === response.currentChapter
          );
          console.log(index);
          if (index === 0) {
            setNext(false);
          } else {
            setNext(true);
          }
          if (index === response.chapterListIds.length - 1) {
            setPrev(false);
          } else {
            setPrev(true);
          }
        }
      }
    };
    Fetching();
  }, [chapter, next, prev]);

  const handleChapter = (nextbtn) => {
    if (nextbtn) {
      if (next) {
        const index =
          data.chapterListIds.findIndex(
            (item) => item.name === data.currentChapter
          ) - 1;
        setChapter(data.chapterListIds[index].id);
        if (index === 0) {
          setNext(false);
        }
        console.log(chapter, index);
      }
    } else {
      if (prev) {
        const index =
          data.chapterListIds.findIndex(
            (item) => item.name === data.currentChapter
          ) + 1;
        setChapter(data.chapterListIds[index].id);
        if (index === data.chapterListIds.length - 1) {
          setPrev(false);
        } else {
          setPrev(true);
        }
        console.log(chapter, index);
      }
    }
  };

  const SelectChapter = (chapterId) => {
    setChapter(chapterId);
    
  };

  if (!data) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col items-center w-full gap-3 pt-4">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-[30px]">{data.title}</h1>
        <h2 className="text-[20px]">{data.currentChapter}</h2>
      </div>
      <div className="flex w-[70%] justify-between items-center gap-2">
        <Button
          variant="outline"
          className={` p-[10px] ${
            prev ? "" : "bg-white text-gray-500/50 hover:bg-white"
          }`}
          onClick={() => handleChapter(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-[20px]" />
        </Button>
        <Drawer>
          <DrawerTrigger>
            <Button variant="outline" className="px-[40px]">
              <FontAwesomeIcon icon={faBook} className="pr-5" />
              Chapters List
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="flex flex-col text-center gap-1 pt-3">
                <DrawerTitle>Choose Your Chapter</DrawerTitle>
                <DrawerDescription>
                  Browse through the chapters and dive into your next manga
                  adventure!
                </DrawerDescription>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex flex-col items-center w-full gap-2 h-[300px] overflow-y-scroll ScrollWidth p-[20px]">
                    {data.chapterListIds.map((item) => (
                      <Button
                        variant="outline"
                        key={item.id}
                        className="p-[10px] rounded-lg w-[80%]"
                        onClick={() => SelectChapter(item.id)}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" className="w-min">
                    Cancel
                  </Button>
                </div>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button
          variant="outline"
          className={` p-[10px] ${
            next ? "" : "bg-white text-gray-500/50 hover:bg-white"
          }`}
          onClick={() => handleChapter(true)}
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-[20px]" />
        </Button>
      </div>
      <div className="flex flex-col w-full justify-center items-center py-[20px]">
        {data.images.map((item, index) => (
          <img
            src={item.image}
            alt=""
            key={index}
            className="object-cover w-[70%]"
          />
        ))}
      </div>
    </div>
  );
};

export default page;
