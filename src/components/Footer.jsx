import { faDiscord, faGithub, faLinkedin, faReddit, faTwitter, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFaceSmileWink,faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full flex flex-col gap-2 bg-zinc-800/50 relative">
      <div className="FooterGradient"></div>
      <div className="flex w-full max-md:flex-col justify-between max-md:gap-8 border-b border-zinc-500/50 p-[20px]">
        <div className="flex gap-10 items-center max-md:flex-col max-md:items-start max-md:gap-1 justify-center z-20">
          <h1 className="text-white text-center text-[35px] font-semibold pl-10 max-md:pl-0">
            <span className="text-cyan-600 text-[70px]">A</span>nifusion
          </h1>
          <div className="flex flex-col justify-center pt-4 font-medium max-md:text-[12px]">
            <p>This site does not store any files on our server,we are linked to the media</p> 
              <p>which is hosted 3rd party services</p>
          </div>
        </div>
        <div className="grid grid-cols-2 w-[30%] max-md:w-max max-md:text-[14px] font-semibold z-20">
          <p>This Season</p>
          <p>Upcoming Season</p>
          <p>Read Manga</p>
          <p>About</p>
          <p>Chanelog</p>
          <p>DMCA</p>
          <p>Donate</p>
        </div>
      </div>
      <div className="flex w-full justify-between max-md:flex-col py-[10px] px-[60px] max-md:px-[20px] max-md:gap-5">
        <div className="flex gap-2 w-full max-md:text-[10px] max-md:z-20">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCopyright} className="text-[10px]" />
            <h1>2024 Anifusion</h1>
          </div>
          <div className="flex items-center gap-1">
            <h1>| Made by Rey Yuuki </h1>
            <FontAwesomeIcon icon={faFaceSmileWink} className="text-[12px] max-md:text-[8px]"/>
          </div>
        </div>
        <div className="flex gap-2 items-center text-[20px] z-20">
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
