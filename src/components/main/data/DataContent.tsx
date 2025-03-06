import { Manrope, Sora } from "next/font/google";
import React from "react";
import Logos from "./Logos";
import Card from "./Card";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const DataContent = () => {
  return (
    <div className="w-full xl:w-desktop-width mx-auto">
      <div className="w-full px-[20px] py-[30px] md:px-0 md:py-[100px]">
        <div className="w-full flex justify-between flex-col md:items-center md:flex-row">
          <p>
            <span className="font-semibold text-[35px] md:text-[70px]">
              B2B Data
            </span>{" "}
            <br />
            <span className="text-[35px] md:text-[70px]">
              integration for
            </span>{" "}
            <br />
            <span className="font-bold text-primary text-[40px] md:text-[80px] leading-[130%]">
              330K
            </span>
          </p>
          <div className="flex flex-col justify-between bg-black text-white w-full h-[120] p-[14px] mt-[10px] rounded-[12px] md:w-[420px] md:h-[335px] md:p-[51px] md:mt-0 md:rounded-[25px] ">
            <p
              className={`${sora.className} font-semibold text-[35px] md:text-[80px]`}
            >
              8,979명
            </p>
            <p
              className={`${manrope.className} font-semibold text-[14px] md:text-[20px]`}
            >
              CEO Level
            </p>
          </div>
        </div>
        <Logos />
        <div className="grid grid-rows-[repeat(3,_1fr)] gap-5 mt-[20px] md:mt-[113px] md:grid-cols-[repeat(3,_1fr)] md:grid-rows-1 items-center">
          {["Search", "Meeting", "Deal"].map((title) => (
            <Card title={title} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataContent;
