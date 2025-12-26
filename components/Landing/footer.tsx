import React from "react";
import Instagram from "../Icons/Instagram";
import Youtube from "../Icons/Youtube";
import Tiktok from "../Icons/Tiktok";

const Footer = () => {
  return (
    <footer className="bg-[#333333] h-fit w-full lg:px-40 p-5">
      <div className="flex w-full justify-between">
        <div>
          <div className="flex gap-4">
            <img src="/img/logo.png" className="lg:w-24 w-16" alt="" />
            <img src="/img/smk-logo.png" className="lg:w-24 w-16" alt="" />
          </div>
          <p className="text-white mt-3 lg:text-base text-sm font-medium">
            &copy; {new Date().getFullYear().toString()} - MPK Letris Indonesia
            2
          </p>
        </div>
        <div className="self-center flex items-center gap-4">
          <Instagram />
          <Youtube />
          <Tiktok />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
