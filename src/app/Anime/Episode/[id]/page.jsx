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
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import StreamAnimeInfo from "@/components/StreamAnimeInfo";
import { RightData } from "@/components/RightData";

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
    <div className="flex flex-col w-full p-[10px] gap-2 bg-zinc-800/50">
      <div className="flex  w-full gap-4">
        <div className="flex w-[70%]  flex-col gap-5">
          <div className="flex w-full h-[600px] ">
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
          <div className="w-full h-[150px] flex flex-col gap-3">
            <div className="w-full h-full bg-zinc-800/50 flex rounded-xl border border-zinc-500/50">
              <div className="h-full w-[45%] py-[10px] bg-cyan-600 rounded-l-xl rounded-bl-xl flex flex-col justify-center items-center gap-1">
                <p>You are watching</p>
                <p className="font-semibold">Episode {EpisodeNumber}</p>
                <p className="w-[80%] text-center">
                  If current server is not working please switch to other
                  servers
                </p>
              </div>
              <div className="w-full h-full flex flex-col items-center">
                <div className="w-full h-[50%] flex gap-8 border-b border-dotted border-zinc-500/50 px-[20px]">
                  <div className="flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faClosedCaptioning} />
                    <p>SUB:</p>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    {Servers.map((item) => (
                      <div
                        key={id}
                        className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${
                          Category === "sub" && Server === item.server
                            ? "bg-cyan-600"
                            : "bg-zinc-700"
                        }`}
                        onClick={() =>
                          Category === "sub" && Server === item.server
                            ? null
                            : handleServer(item.server, "sub")
                        }
                      >
                        {item.server.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[50%] flex gap-8 px-[20px] ">
                  <div className="flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faMicrophone} />
                    <p>DUB:</p>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    {DubData ? (
                      <>
                        {Servers.map((item) => (
                          <div
                            key={id}
                            className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${
                              Category === "dub" && Server === item.server
                                ? "bg-cyan-600"
                                : "bg-zinc-700"
                            }`}
                            onClick={() =>
                              Category === "dub" && Server === item.server
                                ? null
                                : handleServer(item.server, "dub")
                            }
                          >
                            {item.server.toUpperCase()}
                          </div>
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
        <div className="flex w-[30%]">
          <div className="w-full  h-[770px] flex flex-col gap-8 p-[20px] bg-zinc-800/50 border border-zinc-500/50 rounded-lg">
            <h1 className="text-[35px] font-semibold">Episodes</h1>
            <div className="flex flex-col gap-2 overflow-y-auto ScrollWidth">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`flex w-full h-[120px]  border border-zinc-500/50 gap-5 rounded-lg relative Transition ${
                    item.episodeId === CurrentEpisode
                      ? "border border-white bg-cyan-600"
                      : "bg-zinc-800/50"
                  }`}
                  onClick={() =>
                    handleEpisode(item.episodeId, item.title, item.number)
                  }
                >
                  <h2 className="absolute bg-cyan-600 px-[5px] rounded-tl rounded-br">
                    Ep {item.number}
                  </h2>
                  <img
                    src={AnimeData.anime.info.poster}
                    alt=""
                    className="h-full w-[250px] rounded-bl-[0.5rem] object-cover rounded-l-[0.5rem]"
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
      <div className="flex w-full">
        <div className="w-[70%] flex flex-col gap-4 p-[10px]">
          <StreamAnimeInfo data={AnimeData.anime} />
          <div className="p-[20px] text-center border border-zinc-500/50 bg-zinc-800/50 rounded-lg">
            {AnimeData.anime.info.description}
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-8 p-[10px]">
          <RightData data={AnimeData} height={"h-[300px]"} />
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
