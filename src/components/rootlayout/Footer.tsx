"use client"; // 추후 링크 연결시 삭제

import { Manrope } from "next/font/google";
import React from "react";
import Peak from "@public/icons/PEAK-small-icon.svg";
import Instagram from "@public/icons/instagram-icon.svg";
import Naver from "@public/icons/naver-icon.svg";
import Youtube from "@public/icons/youtube-icon.svg";
import PeakLogo from "@public/PEAK-simple-logo.svg";
import Image from "next/image";
import Link from "next/link";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  // weight: ["300", "400", "500", "600", "700"],
});

const Footer = () => {
  const footerTextStyle = "text-[16px]/[2.5] text-medium text-manrope";

  return (
    <div className="w-full h-[644px] min-w-desktop-width pt-[100px] flex flex-col justify-between bg-gray-900">
      <div className="w-full max-w-desktop-width mx-auto flex-grow relative">
        <div className={`${manrope.className}`}>
          <div className="flex gap-2 items-center mb-[30px]">
            <Image src={Peak} alt="PEAK 아이콘" />
            <p className="text-white text-[20px]/[1.5] font-bold">
              더선한 주식회사
            </p>
          </div>
          <div className="grid grid-cols-[248px_335px_auto] text-gray-200">
            <div className="grid grid-rows-5">
              <p className={footerTextStyle}>대표이사 | 권태욱</p>
              <p className={footerTextStyle}>문 의 | david@goodai.kr</p>
            </div>
            <div className="grid grid-rows-5">
              <p className={footerTextStyle}>
                HQ | 경상남도 진주시 비봉로33번길14
              </p>
              <p className={footerTextStyle}>
                LAB | 서울특별시 서초구 효령로 391
              </p>
              <p className={footerTextStyle}>사업자등록번호 | 858-81-98083</p>
              <p className={footerTextStyle}>
                통신판매업번호 | 2019-경남진주-0253
              </p>
              <p className={footerTextStyle}>소프트웨어사업자 | B32-208587</p>
            </div>
            <div className="h-fit flex items-center gap-[15px]">
              <Link href={"#"} onClick={() => alert("인스타그램")}>
                <Image src={Instagram} alt="인스타그램 아이콘" />
              </Link>
              <Link href={"#"} onClick={() => alert("네이버")}>
                <Image src={Naver} alt="네이버 아이콘" />
              </Link>
              <Link href={"#"} onClick={() => alert("유튜브")}>
                <Image src={Youtube} alt="유튜브 아이콘" />
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={PeakLogo}
          alt="PEAK 로고"
          className="absolute bottom-0 right-0"
        />
      </div>
      <div className="w-full h-[65px] border-1 border-t border-white text-white font-pretendard">
        <div className="w-full max-w-desktop-width h-full px-[30px] mx-auto flex justify-between items-center text-[14px] leading-[24px]">
          <p className="font-medium">
            ©TheSunhan{" "}
            {new Date().getFullYear().toLocaleString("ko-KR").replace(",", "")}.
            All rights reserved.
          </p>
          <p className="font-normal">Terms of use Privacy Don’t Sell My Info</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
