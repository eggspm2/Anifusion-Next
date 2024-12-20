"use client";

import {
  AniWatchAnimeId,
  AniWatchEpisode,
  AniWatchServer,
  FetchById,
} from "@/components/hooks/UseApiFetch";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faBarsStaggered,
  faClosedCaptioning,
  faLayerGroup,
  faMicrophone,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import StreamAnimeInfo from "@/components/StreamAnimeInfo";
import { RightData } from "@/components/RightData";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const StreamPage = () => {
  const { id } = useParams();
  const [data, setdata] = useState("");
  const [AnimeData, setAnimeData] = useState("");
  const [CurrentEpisode, setCurrentEpisode] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [EpisodeData, setEpisodeData] = useState("");
  const [Category, setCategory] = useState("sub");
  const [Server, setServer] = useState("vidstreaming");
  const [DubData, setDubData] = useState(false);
  const [tracks, setTracks] = useState("");
  const [EpisodeNumber, setEpisodeNumber] = useState("");

  useEffect(() => {
    const fetching = async () => {
      const response = await AniWatchEpisode(id);
      if (response) {
        console.log(response);
        setdata(response.episodes);
        setCurrentEpisode(response.episodes[0].episodeId);
        setCurrentTitle(response.episodes[0].title);
        setEpisodeNumber(response.episodes[0].number);
      }
    };
    fetching();
  }, [id]);

  useEffect(() => {
    const EpisodeImageFetching = async () => {
      const result = await AniWatchAnimeId(id);
      if (result) {
        console.log(result);
        const AnilistData = await AniWatchAnimeId(id);
        if (AnilistData) {
          console.log(AnilistData);
          setAnimeData(AnilistData);
        }
        if (result.anime.info.stats.episodes.dub >= EpisodeNumber) {
          setDubData(true);
        }
        else{
          setDubData(false);
        }
        if (CurrentEpisode && Category && Server) {
          const caption = await AniWatchServer(
            CurrentEpisode,
            "vidstreaming",
            "sub"
          );
          const Stream = await AniWatchServer(CurrentEpisode, Server, Category);
          if (Stream && caption) {
            console.log(Stream);
            setEpisodeData(Stream);
            setTracks(caption.tracks);
          }
        }
      }
    };
    EpisodeImageFetching();
  }, [CurrentEpisode, currentTitle, Category, Server,EpisodeNumber]);

  const handleEpisode = (episodeId, title, number) => {
    setCurrentEpisode(episodeId);
    setCurrentTitle(title);
    setEpisodeNumber(number);
  };

  const handleServer = (server, category) => {
    setServer(server);
    setCategory(category);
  };

  const Servers = [
    { id: 1, server: "vidstreaming" },
    { id: 1, server: "megacloud" },
    { id: 1, server: "streamsb" },
  ];

  const skeletonArray = Array.from({ length: 5 });

  if (!data || !EpisodeData)
    return (
      <div className=" flex flex-col w-full p-[10px] items-center gap-2 bg-black/40 Animation ">
        <div className="flex flex-row-reverse max-md:flex-col w-[95%] gap-4 items-center">
          <Skeleton className=" w-[68%] max-md:w-[95%] h-[500px]"></Skeleton>
          <Skeleton className=" w-[30%] max-md:w-[95%] h-[500px] flex flex-col gap-2 p-[10px]">
            {skeletonArray.map((_, index) => (
              <Skeleton key={index} className="w-full h-[100px]" />
            ))}
          </Skeleton>
        </div>
        <div className="flex flex-col w-full items-center h-max p-[10px] gap-5">
            <Skeleton className="w-[95%] h-[400px]"/>
            <div className="flex flex-col w-[95%] gap-3">
            <Skeleton className="max-md:w-[80%] w-[50%] h-[30px] rounded-full"/>
            <Skeleton className="max-md:w-[70%] w-[40%] h-[30px] rounded-full"/>
            </div>
          </div>
      </div>
    );
  return (
    <div className="flex flex-col w-full p-[10px] gap-2 bg-black/40 Animation">
      <div className="flex flex-row-reverse max-md:flex-col w-full gap-4">
        <div className="flex w-[70%] max-md:w-full flex-col gap-5">
          <div className="w-full max-md:h-[190px] h-[500px]">
            <MediaPlayer title={currentTitle} src={EpisodeData.sources[0].url} className="w-full h-full">
              <MediaProvider />
              <DefaultVideoLayout
                icons={defaultLayoutIcons}
              />
              {tracks.map((item, index) => (
                <Track
                  key={index}
                  src={item.file}
                  kind={item.kind}
                  label={item.label}
                  default
                />
              ))}
            </MediaPlayer>
          </div>
          <div className="w-full h-[150px] max-md:h-min flex flex-col gap-3">
            <div className="w-full h-full bg-black/50 flex max-md:flex-col rounded-xl gap-2 border border-zinc-500/50">
              <div className="h-full w-[45%] max-md:w-full max-md:rounded-xl max-md:text-[12px] py-[10px] bg-white text-black rounded-l-xl rounded-bl-xl flex flex-col justify-center items-center gap-1">
                <p>Sedang Menonton</p>
                <p className="font-semibold">Episode {EpisodeNumber}</p>
                <p className="w-[80%] text-center">
                 Jika Server Tidak Berjalan Ganti Keserver lain
                </p>
              </div>
              <div className="w-full h-full flex flex-col items-center">
                <div className="w-full h-[50%] flex gap-8 max-md:gap-2 max-md:p-[10px] border-b border-dotted border-zinc-500/50 px-[20px]">
                  <div className="flex justify-center items-center gap-2 max-md:text-[14px]">
                    <FontAwesomeIcon icon={faClosedCaptioning} />
                    <p>SUB:</p>
                  </div>
                  <div className="flex justify-center items-center max-md:gap-2 gap-4">
                    {Servers.map((item) => (
                      <Button
                        key={id}
                        variant={`${
                          Category === "sub" && Server === item.server
                            ? ""
                            : "outline"
                        }`}
                        className={`h-[35px] p-[10px] max-md:p-[8px] max-md:text-[10px] max-md:h-[30px] rounded-xl flex justify-center items-center Transition `}
                        onClick={() =>
                          Category === "sub" && Server === item.server
                            ? null
                            : handleServer(item.server, "sub")
                        }
                      >
                        {item.server.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[50%] flex gap-9 max-md:gap-2 max-md:p-[10px] px-[20px] ">
                  <div className="flex justify-center items-center gap-2 max-md:text-[14px]">
                    <FontAwesomeIcon icon={faMicrophone} />
                    <p>DUB:</p>
                  </div>
                  <div className="flex justify-center items-center max-md:gap-2 gap-4">
                    {DubData ? (
                      <>
                        {Servers.map((item) => (
                          <Button
                            key={id}
                            variant={`${
                              Category === "dub" && Server === item.server
                                ? ""
                                : "outline"
                            }`}
                            className={`h-[35px] p-[10px] max-md:p-[8px] max-md:text-[10px] max-md:h-[30px] rounded-xl flex justify-center items-center Transition`}
                            onClick={() =>
                              Category === "dub" && Server === item.server
                                ? null
                                : handleServer(item.server, "dub")
                            }
                          >
                            {item.server.toUpperCase()}
                          </Button>
                        ))}
                      </>
                    ) : (
                      <p>Dubbing Tidak Tersedia</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[30%] max-md:w-full">
          <div className="w-full h-[670px] max-md:h-[450px] flex flex-col gap-8 p-[20px] bg-black/50 border border-zinc-500/50 rounded-lg">
            <div className="flex justify-between items-center text-[30px] font-semibold max-md:text-[25px]">
              <div className="flex gap-3 items-center">
                <h1>Episodes</h1>
                <FontAwesomeIcon icon={faArrowsRotate} />
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faLayerGroup} />
                <FontAwesomeIcon icon={faBarsStaggered} />
              </div>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto ScrollWidth">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-row-reverse border w-full h-[120px] p-[10px] gap-5 rounded-lg relative Transition hover:bg-white/40 hover:text-black hover:border-black ${
                    item.episodeId === CurrentEpisode
                      ? "border-black bg-white/40 text-black"
                      : "bg-black/30 border-zinc-500/50"
                  }`}
                  onClick={() =>
                    handleEpisode(item.episodeId, item.title, item.number)
                  }
                >
                  <h2
                    className={`absolute px-[5px] rounded-tl rounded-bl rounded-br ${
                      item.episodeId === CurrentEpisode
                        ? "bg-black/60 text-white"
                        : "bg-white/60 text-black"
                    }`}
                  >
                    Ep {item.number}
                  </h2>
                  <img
                    src={AnimeData.anime.info.poster}
                    alt=""
                    className="h-full w-[250px] rounded-bl-[0.5rem] object-cover rounded-lg"
                  />
                  <h1 className="w-full h-full flex items-center">
                    {item.title}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-md:flex-col w-full">
        <div className="w-[70%] max-md:w-full flex max-md:p-[0px] flex-col gap-4 p-[10px]">
          <StreamAnimeInfo data={AnimeData.anime} />
          <div className="p-[20px] text-center border border-zinc-500/50 bg-black/40 rounded-lg">
            {AnimeData.anime.info.description}
          </div>
        </div>
        <div className="w-[30%] max-md:w-full flex flex-col gap-8 p-[10px]">
          <RightData data={AnimeData} height={"h-[300px]"} />
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
