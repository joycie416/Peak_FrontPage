import React from "react";
import PEAK from "@public/PEAK-simple-logo-black.svg";
import Image from "next/image";
import HeaderLink from "./HeaderLink";
import Link from "next/link";
import { Manrope } from "next/font/google";
import HeaderBackground from "./HeaderBackground";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const Header = () => {
  return (
    <>
      {/* 데스크탑 헤더 */}
      {/* <header className="w-full h-20 px-[30px] fixed top-0 z-[10]"> */}
      <HeaderBackground>
        <div className="w-full h-full grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="h-fit my-auto mr-auto space-x-[17px]">
            <HeaderLink to="/" />
            <HeaderLink to="/solution" />
            <HeaderLink to="/dashboard" />
          </div>
          <Image src={PEAK} alt="PEAK" height={35} className="self-center" />
          <div className="my-auto ml-auto space-x-[17px]">
            <HeaderLink to="/blog" />
            <HeaderLink to="/contacts" />
            <Link
              href={"/signin"}
              className={`px-[15px] py-[10px] ${manrope.className} rounded-full bg-primary text-[14px] font-bold text-[#F5F5F5]`}
            >
              가입/로그인
            </Link>
          </div>
        </div>
      </HeaderBackground>
      {/* </header> */}
      {/* 모바일 헤더 */}
      <div
        className={
          "w-full h-10 px-[20px] py-1 fixed top-0 z-[10] flex justify-between items-center bg-white md:hidden"
        }
      >
        {" "}
        {/* <SidebarProvider> */}
        <Link href={"/"}>
          <Image src={PEAK} alt="PEAK" height={30} className="" />
        </Link>
        <SidebarTrigger />
        {/* </SidebarProvider> */}
      </div>
    </>
  );
};

export default Header;
