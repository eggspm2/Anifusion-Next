"use client";

import { MangaChapter } from "@/components/hooks/UseApiFetch";
import {
  faBook,
  faChevronLeft,
  faChevronRight,
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
import { Skeleton } from "@/components/ui/skeleton";

const Page = ({ params }) => {
  const [Data, setData] = useState("");
  const [Chapter, setChapter] = useState(params.id[1]);
  const [Prev, setPrev] = useState(true);
  const [Next, setNext] = useState(true);

  useEffect(() => {
    const Fetching = async () => {
      if (Chapter) {
        const response = await MangaChapter(params.id[0] + "/" + Chapter);
        if (response) {
          console.log(response);
          setData(response);
  
          // Update next/prev status after fetching data
          const index = response.chapterListIds.findIndex(
            (item) => item.name === response.currentChapter
          );
          
          setNext(index > 0);  // Disable next if it's the first chapter
          setPrev(index < response.chapterListIds.length - 1);  // Disable prev if it's the last chapter
        }
      }
    };
    Fetching();
  }, [Chapter]);  // Only depend on Chapter to avoid unnecessary re-renders
  
  const handleChapter = (nextbtn) => {
    const index = Data.chapterListIds.findIndex(
      (item) => item.name === Data.currentChapter
    );
  
    if (nextbtn && Next) {
      const newIndex = index - 1;
      if (newIndex >= 0) {
        setChapter(Data.chapterListIds[newIndex].id);  // Move to the next chapter
      }
    } else if (!nextbtn && Prev) {
      const newIndex = index + 1;
      if (newIndex < Data.chapterListIds.length) {
        setChapter(Data.chapterListIds[newIndex].id);  // Move to the previous chapter
      }
    }
  };
  
  const SelectChapter = (chapterId) => {
    setChapter(chapterId);
  };
  

  if (!Data || !Data.images[5]?.image) return <div className="flex w-full p-[10px] justify-center pt-10 items-center">
    <Skeleton className="w-[70%] max-md:w-full h-[700px]" />
  </div>;
  return (
    <div className="flex flex-col items-center w-full gap-3 pt-4 py-[10px]">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-[30px] max-md:text-[20px]">{Data.title}</h1>
        <h2 className="text-[20px] max-md:text-[14px] text-gray-500">{Data.currentChapter}</h2>
      </div>
      <div className="flex w-[70%] max-md:w-full max-md:p-[10px] justify-between items-center gap-2">
        <Button
          variant="outline"
          className={` p-[10px] ${
            Prev ? "" : "bg-white text-gray-500/50 hover:bg-white"
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
                <DrawerTitle>Pilih Chapter</DrawerTitle>
                <DrawerDescription>
                  c
                </DrawerDescription>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex flex-col items-center w-full gap-2 h-[300px] overflow-y-scroll ScrollWidth p-[20px]">
                    {Data.chapterListIds.map((item) => (
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
            Next ? "" : "bg-white text-gray-500/50 hover:bg-white"
          }`}
          onClick={() => handleChapter(true)}
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-[20px]" />
        </Button>
      </div>
      <div className="flex flex-col w-full justify-center items-center py-[20px]">
        {Data.images.map((item, index) => (
          <img
            src={item.image}
            alt=""
            key={index}
            className="object-cover w-[70%] max-md:w-full"
          />
        ))}
      </div>
      <div className="flex w-[70%] max-md:w-full max-md:p-[10px] justify-between items-center gap-2">
        <Button
          variant="outline"
          className={` p-[10px] ${
            Prev ? "" : "bg-white text-gray-500/50 hover:bg-white"
          }`}
          onClick={() => handleChapter(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-[20px]" />
        </Button>
        <Drawer>
          <DrawerTrigger>
            <Button variant="outline" className="px-[40px]">
              <FontAwesomeIcon icon={faBook} className="pr-5" />
               List Chapter
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="flex flex-col text-center gap-1 pt-3">
                <DrawerTitle>Pilih Chapter</DrawerTitle>
                <DrawerDescription>
                  Telusuri lebih banyak manga lainnya!
                </DrawerDescription>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex flex-col items-center w-full gap-2 h-[300px] overflow-y-scroll ScrollWidth p-[20px]">
                    {Data.chapterListIds.map((item) => (
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
            Next ? "" : "bg-white text-gray-500/50 hover:bg-white"
          }`}
          onClick={() => handleChapter(true)}
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-[20px]" />
        </Button>
      </div>
    </div>
  );
};

export default Page;
