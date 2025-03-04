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

const fontClassName =
  "text-[16px] leading-[150%] font-normal text-[#3B3B3B]/80 font-pretendard";

const contentMap: { [key: string]: ReactNode } = {
  Search: (
    <p className={fontClassName}>
      공공+대중견+TIPS선정사 등 우리회사에
      <br />딱 맞는 잠재고객사를 AI봇이
      <br />
      24/7 쉬지 않고 찾습니다.
    </p>
  ),
  Meeting: (
    <p className={fontClassName}>
      Agent끼리 사전 거래 가능성을 조율하고
      <br />
      가능성을 예측합니다.
    </p>
  ),
  Deal: (
    <p className={fontClassName}>
      51~99%수준의 가능성을 분석하여
      <br />
      의사 결정권자에게 의미있는
      <br />딜 미팅을 제안드립니다.
    </p>
  ),
};

const Card = ({ title }: CardProps) => {
  return (
    <div className="w-[380px] h-[365px] p-[50px] rounded-[25px] bg-gray-70">
      <Image
        src={figureMap[title]}
        alt={title}
        width={103}
        className="aspect-square mb-[50px]"
      />
      <p className="text-[28px] font-bold leading-[30px] mb-[15px]">{title}</p>
      {contentMap[title]}
    </div>
  );
};

export default Card;
