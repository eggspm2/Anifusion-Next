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

const StreamPage = () => {
  const { id } = useParams();
  const [data, setdata] = useState("");
  const [EpisodeImage, setEpisodeImage] = useState("");
  const [CurrentEpisode, setCurrentEpisode] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [EpisodeData, setEpisodeData] = useState("");
  const [Category, setCategory] = useState("sub");
  const [Server, setServer] = useState("vidstreaming");
  const [DubData, setDubData] = useState(false);
  const [tracks, setTracks] = useState('');
  const [EpisodeNumber, setEpisodeNumber] = useState('');

  useEffect(() => {
    const fetching = async () => {
      const response = await AniWatchEpisode(id);
      if (response) {
        console.log(response);
        setdata(response.episodes);
        setCurrentEpisode(response.episodes[0].episodeId);
        setCurrentTitle(response.episodes[0].title);
        setEpisodeNumber(response.episodes[0].number)
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
          setEpisodeImage(AnilistData.anime.info.poster);
        }
        if (result.anime.info.stats.episodes.dub) {
          setDubData(true);
        }
        if (CurrentEpisode && Category && Server) {
          const caption = await AniWatchServer(CurrentEpisode, "vidstreaming" , "sub");
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
  if (!data || !EpisodeData) return <div>Loading ...</div>;
  return (
    <div className="flex w-full relative top-[65px] p-[10px] gap-2">
      <div className="flex w-[70%] flex-col">
        <div className="flex w-full h-[450px] ">
          <MediaPlayer title={currentTitle} src={EpisodeData.sources[0].url}>
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
              icons={defaultLayoutIcons}
            />
            {tracks.map((item) => (
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
              
            </div>
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full h-[50%] flex gap-8 border-b border-dotted border-zinc-500/50 px-[20px]">
                <div className="flex justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faClosedCaptioning} />
                  <p>SUB:</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <div
                    className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${Category === "sub" && Server === "vidstreaming" ? "bg-cyan-600" : "bg-zinc-700" }`}
                    onClick={() => Category === "sub" && Server === "vidstreaming" ? null :  handleServer("vidstreaming", "sub")}
                  >
                    Vidstream
                  </div>
                  <div
                    className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${Category === "sub" && Server === "megacloud" ? "bg-cyan-600" : "bg-zinc-700" }`}
                    onClick={() => Category === "sub" && Server === "megacloud" ? null : handleServer("megacloud", "sub")}
                  >
                    MegaCloud
                  </div>
                  <div
                    className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${Category === "sub" && Server === "streamsb" ? "bg-cyan-600" : "bg-zinc-700" }`}
                    onClick={() => Category === "sub" && Server === "streamsb" ? null : handleServer("streamsb", "sub")}
                  >
                    StreamSb
                  </div>
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
                    <div
                    className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${Category === "dub" && Server === "vidstreaming" ? "bg-cyan-600" : "bg-zinc-700" }`}
                    onClick={() => Category === "dub" && Server === "vidstreaming" ? null :  handleServer("vidstreaming", "dub")}
                  >
                    Vidstream
                  </div>
                  <div
                    className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${Category === "dub" && Server === "megacloud" ? "bg-cyan-600" : "bg-zinc-700" }`}
                    onClick={() => Category === "dub" && Server === "megacloud" ? null : handleServer("megacloud", "dub")}
                  >
                    MegaCloud
                  </div>
                  <div
                    className={`h-[35px] p-[10px] rounded-xl flex justify-center items-center ${Category === "dub" && Server === "streamsb" ? "bg-cyan-600" : "bg-zinc-700" }`}
                    onClick={() => Category === "dub" && Server === "streamsb" ? null : handleServer("streamsb", "dub")}
                  >
                    StreamSb
                  </div>
                    </>
                     ) : (
                      <p>Dub is not Available</p>
                    )}
                  </div>
               
              </div>
            </div>
          </div>
          <div className="w-full h-[150px] bg-zinc-800/50 rounded-xl border border-zinc-500/50"></div>
        </div>
      </div>
      <div className="w-[30%] flex flex-col">
        <h1 className="text-[30px] font-semibold">Episodes</h1>
        <div className="flex flex-col h-[450px] gap-2 overflow-y-auto ScrollWidth">
          {data.map((item) => (
            <div
              key={item.number}
              className={`flex w-full h-[120px] bg-zinc-800/50 border border-zinc-500/50 gap-5 rounded-xl relative ${
                item.episodeId === CurrentEpisode ? "border border-white" : ""
              }`}
              onClick={() => handleEpisode(item.episodeId, item.title, item.number)}
            >
              <h2 className="absolute bg-cyan-600 px-[5px] rounded-tl rounded-br">Ep {item.number}</h2>
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
