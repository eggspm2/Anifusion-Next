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
import { faClosedCaptioning, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

const StreamPage = () => {
  const { id } = useParams();
  const [data, setdata] = useState("");
  const [EpisodeImage, setEpisodeImage] = useState("");
  const [CurrentEpisode, setCurrentEpisode] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [EpisodeData, setEpisodeData] = useState("");

  useEffect(() => {
    const fetching = async () => {
      const response = await AniWatchEpisode(id);
      if (response) {
        console.log(response);
        setdata(response.episodes);
        setCurrentEpisode(response.episodes[0].episodeId);
        setCurrentTitle(response.episodes[0].title);
      }
    };
    fetching();
  }, [id]);

  useEffect(() => {
    const EpisodeImageFetching = async () => {
      const result = await AniWatchAnimeId(id);
      if (result) {
        console.log(result);
        const AnilistData = await FetchById(result.anime.info.anilistId);
        if (AnilistData) {
          console.log(AnilistData);
          setEpisodeImage(AnilistData.image);
        }
        if (CurrentEpisode) {
          const Stream = await AniWatchServer(
            CurrentEpisode,
            "vidstreaming",
            "sub"
          );
          if (Stream) {
            console.log(Stream);
            setEpisodeData(Stream);
          }
        }
      }
    };
    EpisodeImageFetching();
  }, [CurrentEpisode, currentTitle]);

  const handleEpisode = (episodeId, title) => {
    setCurrentEpisode(episodeId);
    setCurrentTitle(title);
  };

  if (!data || !EpisodeData) return <div>Loading ...</div>;
  return (
    <div className="flex w-full relative top-[65px] p-[10px] gap-2">
      <div className="flex w-[70%] flex-col">
        <div className="flex w-full h-[450px] ">
          <MediaPlayer
            title={currentTitle}
            src={EpisodeData && EpisodeData.sources[0].url}
          >
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
              icons={defaultLayoutIcons}
            />
            {EpisodeData.tracks.map((item) => (
              <Track
                key={item}
                src={item.file}
                kind={item.kind}
                label={item.label}
                default
              />
            ))}
          </MediaPlayer>
        </div>
        <div className="w-full h-[300px] p-[10px] flex flex-col gap-3">
          <div className="w-full h-[150px] bg-zinc-800/50 flex rounded-xl border border-zinc-500/50">
            <div className="h-full w-[45%] py-[10px] bg-cyan-600 rounded-l-xl rounded-bl-xl flex flex-col justify-center items-center gap-1">
              <p>You are watching</p>
              <p className="font-semibold">Episode</p>
              <p className="w-[70%] text-center">If current server dosen't work please try others servers beside.</p>
            </div>
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full h-[50%] flex gap-8 border-b border-dotted border-zinc-500/50 px-[20px]">
                <div className="flex justify-center items-center gap-2">
                <FontAwesomeIcon icon={faClosedCaptioning} />
                  <p>SUB:</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <div className="h-[35px] bg-zinc-700 p-[10px] rounded-xl flex justify-center items-center">Vidstream</div>
                  <div className="h-[35px] bg-zinc-700 p-[10px] rounded-xl flex justify-center items-center">MegaCloud</div>
                  <div className="h-[35px] bg-zinc-700 p-[10px] rounded-xl flex justify-center items-center">StreamSb</div>
                </div>
              </div>
              <div className="w-full h-[50%] flex gap-8 px-[20px] ">
              <div className="flex justify-center items-center gap-2">
              <FontAwesomeIcon icon={faMicrophone} />
                  <p>DUB:</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <div className="h-[35px] bg-zinc-700 p-[10px] rounded-xl flex justify-center items-center">Vidstream</div>
                  <div className="h-[35px] bg-zinc-700 p-[10px] rounded-xl flex justify-center items-center">MegaCloud</div>
                  <div className="h-[35px] bg-zinc-700 p-[10px] rounded-xl flex justify-center items-center">StreamSb</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[150px] bg-zinc-800/50 rounded-xl border border-zinc-500/50">
          </div>
        </div>
      </div>
      <div className="w-[30%] flex flex-col">
        <h1 className="text-[30px] font-semibold">Episodes</h1>
        <div className="flex flex-col h-[450px] gap-2 overflow-y-auto ScrollWidth">
          {data.map((item) => (
            <div
              key={item.number}
              className={`flex w-full h-[120px] bg-zinc-800/50 border border-zinc-500/50 gap-5 rounded-xl ${
                item.episodeId === CurrentEpisode ? "border border-white" : ""
              }`}
              onClick={() => handleEpisode(item.episodeId, item.title)}
            >
              <img
                src={EpisodeImage}
                alt=""
                className="h-full w-[150px] rounded-xl"
              />
              <h1 className="w-full h-full flex items-center">{item.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
