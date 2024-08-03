import { faDiscord, faGithub, faLinkedin, faReddit, faTwitter, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faCopyright,
  faFaceSmileWink,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full flex flex-col gap-2 bg-zinc-800/50 relative">
      <div className="FooterGradient"></div>
      <div className="flex w-full justify-between border-b border-zinc-500/50 p-[20px]">
        <div className="flex gap-10 items-center justify-center">
          <h1 className="text-white text-center text-[35px] font-semibold pl-10">
            <span className="text-cyan-600 text-[70px]">A</span>nifusion
          </h1>
          <div className="flex flex-col justify-center pt-4 font-light">
            <p>This site does not store any files on our server,we are linked to the media</p> 
              <p>which is hosted 3rd party services</p>
          </div>
        </div>
        <div className="grid grid-cols-2 w-[30%] font-medium z-20">
          <p>This Season</p>
          <p>Upcoming Season</p>
          <p>Read Manga</p>
          <p>About</p>
          <p>Chanelog</p>
          <p>DMCA</p>
          <p>Donate</p>
        </div>
      </div>
      <div className="flex w-full justify-between py-[10px] px-[20px] z-20">
        <div className="flex gap-2 ">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCopyright} />
            <h1>2024 Anifusion</h1>
          </div>
          <div className="flex items-center gap-1">
            <h1>| Made by Rey Yuuki </h1>
            <FontAwesomeIcon icon={faFaceSmileWink} />
          </div>
        </div>
        <div className="flex gap-2 items-center text-[20px]">
          <FontAwesomeIcon icon={faXTwitter}/>
          <FontAwesomeIcon icon={faReddit}/>
          <FontAwesomeIcon icon={faGithub}/>
          <FontAwesomeIcon icon={faDiscord}/>
          <FontAwesomeIcon icon={faYoutube}/>
          <FontAwesomeIcon icon={faLinkedin}/>
        </div>
      </div>
    </div>
  );
};
