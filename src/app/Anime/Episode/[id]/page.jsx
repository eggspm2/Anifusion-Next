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
        if (result.anime.info.stats.episodes.dub) {
          setDubData(true);
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
  }, [CurrentEpisode, currentTitle, Category, Server]);

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
  if (!data || !EpisodeData) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col w-full p-[10px] gap-2 bg-black/40 Animation">
      <div className="flex flex-row-reverse max-md:flex-col w-full gap-4">
        <div className="flex w-[70%] max-md:w-full flex-col gap-5">
          <div className="flex w-full max-md:h-[300px] h-[600px]">
            <MediaPlayer title={currentTitle} src={EpisodeData.sources[0].url}>
              <MediaProvider />
              <DefaultVideoLayout
                thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
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
                <p>You are watching</p>
                <p className="font-semibold">Episode {EpisodeNumber}</p>
                <p className="w-[80%] text-center">
                  If current server is not working please switch to other
                  servers
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
                      <p>Dub is not Available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[30%] max-md:w-full">
          <div className="w-full h-[770px] max-md:h-[450px] flex flex-col gap-8 p-[20px] bg-black/50 border border-zinc-500/50 rounded-lg">
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
                  className={`flex flex-row-reverse w-full h-[120px] p-[10px] gap-5 rounded-lg relative Transition ${
                    item.episodeId === CurrentEpisode
                      ? "border border-black bg-white/40 text-black"
                      : "bg-black/30 border border-zinc-500/50"
                  }`}
                  onClick={() =>
                    handleEpisode(item.episodeId, item.title, item.number)
                  }
                >
                  <h2 className={`absolute px-[5px] rounded-tl rounded-bl rounded-br ${item.episodeId === CurrentEpisode ? "bg-black/60 text-white" : "bg-white/60 text-black"}`}>
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
