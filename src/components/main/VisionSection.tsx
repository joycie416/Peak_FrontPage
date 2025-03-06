"use client"; // 링크 연결되면 삭제

import Link from "next/link";
import React from "react";
// import Background2 from "../../../public/main/vision-background-crop.svg";

const VisionSection = () => {
  return (
    <section
      id="vision-wrapper"
      className="w-full min-w-desktop-width p-[50px]"
    >
      <div
        className={
          "w-full py-[150px] rounded-[30px] bg-[url('/main/vision-background-crop.png')] bg-center bg-cover bg-no-repeat text-white overflow-hidden"
        }
      >
        <div className="w-full max-w-desktop-width px-[50px] mx-auto flex justify-between items-center">
          <div className="shrink-0">
            <p className="text-[50px]/[0.7] tracking-[-1.25px] font-bold font-pretendard mb-[30px]">
              협력하여 선을 이루고자 합니다.
            </p>
            <p className="text-[40px] leading-[35px] tracking-[-1.25px] font-normal mb-[50px]">
              Works for the Good!
            </p>
            <p className="text-[22px] leading-[30px] font-bold font-pretendard">
              Romans 8:28
            </p>
          </div>
          <Link
            href={"#"}
            onClick={() => alert("문의하기")}
            className="w-[180px] px-10 py-[15px] rounded-full text-[16px] leading-[27px] font-semibold text-center font-pretendard bg-primary"
          >
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
