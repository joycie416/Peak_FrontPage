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
    <div className="w-full py-[100px]">
      <div className="flex justify-between items-center">
        <p>
          <span className="font-semibold text-[70px]">B2B Data</span> <br />
          <span className="text-[70px]">integration for</span> <br />
          <span className="font-bold text-primary text-[80px] leading-[130%]">
            330K
          </span>
        </p>
        <div className="w-[420px] h-[335px] p-[51px] flex flex-col justify-between rounded-[25px] bg-black text-white">
          <p
            className={`${sora.className} font-semibold text-[80px] drop-shadow`}
          >
            8,979명
          </p>
          <p className={`${manrope.className} font-semibold text-[20px]`}>
            CEO Level
          </p>
        </div>
      </div>
      <Logos />
      <div className="mt-[113px] flex justify-between items-center">
        {["Search", "Meeting", "Deal"].map((title) => (
          <Card title={title} key={title} />
        ))}
      </div>
    </div>
  );
};

export default DataContent;
