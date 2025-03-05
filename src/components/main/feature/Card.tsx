import { ReactNode } from "react";
import Client from "@public/main/features/client.svg";
import Agentic from "@public/main/features/agentic.svg";
import Dashboard from "@public/main/features/dashboard.svg";
import Image from "next/image";

type CardProps = { idx: string };

const featureContentClassName = "text-[20px]/[1.5] text-[#3B3B3B] font-normal";

const featureContent: {
  [key: string]: { title: string; content: ReactNode; src: string };
} = {
  1: {
    title: "잠재고객 추천",
    content: (
      <p className={featureContentClassName}>
        PEAK.CEO 웹사이트에 솔루션을 통해 <br />
        회사소개서만 업로드 하면 <br />
        유망고객 30개 추천 후 <br />
        10개를 고객이 선택합니다.
      </p>
    ),
    src: Client,
  },
  2: {
    title: "에이전틱 AI",
    content: (
      <p className={featureContentClassName}>
        에이전틱AI 기반 <br />
        영업 가상 환경을 제공하여 <br />
        세일즈 전-중-후 데이터를 통합하여 <br />
        지속적인 고객 접점을 강화합니다.
      </p>
    ),
    src: Agentic,
  },
  3: {
    title: "대시보드",
    content: (
      <p className={featureContentClassName}>
        대시보드를 통한 <br />
        고객 데이터 플랫폼 제공으로 <br />
        매출 성과를 높이고 <br />
        지속적인 고객 관계를 관리합니다.
      </p>
    ),
    src: Dashboard,
  },
  4: {
    title: "세일즈 루트",
    content: (
      <p className={featureContentClassName}>
        최선의 세일즈 미팅 <br />
        동선을 찾는 맵 서비스입니다.
      </p>
    ),
    src: Client,
  },
};

const Card = ({ idx }: CardProps) => {
  return (
    <div className="h-[400px] flex even:flex-row-reverse font-pretendard">
      <div className="w-[580px] h-full rounded-[30px] bg-gray-100 overflow-hidden relative">
        <Image
          src={featureContent[idx].src}
          alt={featureContent[idx].title}
          className={`absolute bottom-1 ${
            Number(idx) % 2 === 0 ? "right-20" : "left-20"
          }`}
        />
      </div>
      <div className="flex-grow h-full pl-[150px] pt-[91px]">
        <p className="text-[14px] font-semibold text-primary mb-[5px]">
          STEP {idx}
        </p>
        <p className="text-[35px]/[1.5] font-bold mb-5">
          {featureContent[idx].title}
        </p>
        {featureContent[idx].content}
      </div>
    </div>
  );
};

export default Card;
