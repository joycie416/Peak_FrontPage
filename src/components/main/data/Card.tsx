import React, { ReactNode } from "react";
import Search from "@public/main/figures/search.svg";
import Meeting from "@public/main/figures/meeting.svg";
import Deal from "@public/main/figures/deal.svg";
import Image from "next/image";

type CardProps = {
  title: string; // "Search" | "Meeting" | "Deal";
};

const figureMap: { [key: string]: string } = {
  Search,
  Meeting,
  Deal,
};

const dataContentFontStyle =
  "text-[#3B3B3B]/80 font-normal font-pretendard text-[14px]/[1.5] md:text-[14px]/[1.5] lg:text-[16px]/[1.5]";

const contentMap: { [key: string]: ReactNode } = {
  Search: (
    <p className={dataContentFontStyle}>
      공공+대중견+TIPS선정사 등 우리회사에
      <br />딱 맞는 잠재고객사를 AI봇이
      <br />
      24/7 쉬지 않고 찾습니다.
    </p>
  ),
  Meeting: (
    <p className={dataContentFontStyle}>
      Agent끼리 사전 거래 가능성을 조율하고
      <br />
      가능성을 예측합니다.
    </p>
  ),
  Deal: (
    <p className={dataContentFontStyle}>
      51~99%수준의 가능성을 분석하여
      <br />
      의사 결정권자에게 의미있는
      <br />딜 미팅을 제안드립니다.
    </p>
  ),
};

const Card = ({ title }: CardProps) => {
  return (
    <div className="bg-gray-70 w-full h-full p-[20px] flex flex-row-reverse justify-between rounded-[20px] md:block md:max-w-[380px] md: md:p-[30px] md:rounded-[25px] md:max-w-[380px] lg:p-[50px] lg:rounded-[25px]">
      <Image
        src={figureMap[title]}
        alt={title}
        width={103}
        className="aspect-square w-[50px] mb-auto md:w-[80px] md:mb-[30px] lg:w-[103px] lg:mb-[50px]"
      />
      <div>
        <p className="font-bold text-[28px] leading-[30px] mb-[15px] md:text-[24px] md:leading-[28px] md:mb-[10px] lg:text-[28px] lg:leading-[30px] lg:mb-[15px]">
          {title}
        </p>
        {contentMap[title]}
      </div>
    </div>
  );
};

export default Card;
