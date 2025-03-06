"use client"; // 링크 연결되면 삭제

import Link from "next/link";
import React from "react";
// import Background2 from "../../../public/main/vision-background-crop.svg";

const VisionSection = () => {
  return (
    <section
      id="vision-wrapper"
      className="w-full xl:min-w-desktop-width p-[20px] md:p-[50px]"
    >
      <div
        className={
          "w-full bg-[url('/main/vision-background-crop.png')] bg-center bg-cover bg-no-repeat text-white overflow-hidden p-[20px] rounded-[10px] md:px-[50px] md:py-[150px] md:rounded-[30px]"
        }
      >
        <div className="w-full xl:max-w-desktop-width mx-auto flex justify-between items-center">
          <div className="shrink-0">
            <p className="tracking-[-1.25px] font-bold font-pretendard text-[20px]/[0.7] mb-[15px] md:text-[50px]/[0.7] md:mb-[30px]">
              협력하여 선을 이루고자 합니다.
            </p>
            <p className="tracking-[-1.25px] font-normal text-[16px]/[1] mb-[25px] md:text-[40px] md:leading-[35px] md:mb-[50px]">
              Works for the Good!
            </p>
            <p className="font-bold font-pretendard text-[12px]/[1] md:text-[22px] md:leading-[30px]">
              Romans 8:28
            </p>
          </div>
          <Link
            href={"#"}
            onClick={() => alert("문의하기")}
            className="rounded-full font-semibold text-center font-pretendard bg-primary w-fit px-3 py-2 text-[12px]/[1.5] max-md:mt-auto md:w-[180px] md:px-10 md:py-[15px] md:text-[16px] md:leading-[27px]"
          >
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
