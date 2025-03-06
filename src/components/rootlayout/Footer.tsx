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
  const footerTextStyle =
    "text-medium text-manrope text-[10px]/[2] md:text-[16px]/[2.5]";
  const iconStyle = "w-[16px] md:w-[34px]";

  return (
    <div className="w-full xl:min-w-desktop-width flex flex-col justify-between bg-gray-900 h-[350px] pt-[20px] md:h-[644px] md:pt-[100px]">
      <div className="w-full xl:max-w-desktop-width mx-auto flex-grow relative px-[20px] md:px-0">
        <div className={`${manrope.className}`}>
          <div className="flex gap-2 items-center mb-[20px] md:mb-[30px]">
            <Image src={Peak} alt="PEAK 아이콘" />
            <p className="text-white text-[20px]/[1.5] font-bold">
              더선한 주식회사
            </p>
          </div>
          <div className="grid text-gray-200 grid-cols-[repeat(2,_1fr)] md:grid-cols-[248px_335px_auto]">
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
            <div className="h-fit flex items-center gap-[15px] max-md:hidden">
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
        <div className="h-fit flex items-center gap-2 mt-[20px] md:gap-[15px] md:hidden">
          <Link href={"#"} onClick={() => alert("인스타그램")}>
            <Image
              src={Instagram}
              alt="인스타그램 아이콘"
              className={iconStyle}
            />
          </Link>
          <Link href={"#"} onClick={() => alert("네이버")}>
            <Image src={Naver} alt="네이버 아이콘" className={iconStyle} />
          </Link>
          <Link href={"#"} onClick={() => alert("유튜브")}>
            <Image src={Youtube} alt="유튜브 아이콘" className={iconStyle} />
          </Link>
        </div>
        <Image
          src={PeakLogo}
          alt="PEAK 로고"
          className="absolute bottom-0 right-0 w-[200px] md:bottom-0 md:right-0 md:w-[585px]"
        />
      </div>
      <div className="w-full border-1 border-t border-white text-white font-pretendard h-[30px] md:h-[65px]">
        <div className="w-full xl:max-w-desktop-width h-full mx-auto flex justify-between items-center px-[20px] text-[8px]/[1.5] md:px-[30px] md:text-[14px] md:leading-[24px]">
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
