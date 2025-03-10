import { ReactNode } from "react";
import Client from "@public/main/features/client.svg";
import Agentic from "@public/main/features/agentic.svg";
import Dashboard from "@public/main/features/dashboard.svg";
import Route from "@public/main/features/route.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardProps = { idx: string };

const featureContentClassName =
  "text-[#3B3B3B] font-normal text-[16px]/[1.5] md:text-[20px]/[1.5]";

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
    src: Route,
  },
};

const Card = ({ idx }: CardProps) => {
  return (
    <div className="flex flex-col font-pretendard md:h-[400px] md:flex-row md:even:flex-row-reverse">
      <div className="bg-gray-50 overflow-hidden relative w-full h-[240px] rounded-[15px] md:w-[580px] md:h-full md:rounded-[30px]">
        <Image
          src={featureContent[idx].src}
          alt={featureContent[idx].title}
          className={cn("absolute bottom-1 h-[200px] md:h-[337px]", {
            "left-12 md:left-20": Number(idx) % 2 !== 0,
            "right-12 md:right-20": Number(idx) % 2 === 0,
          })}
        />
      </div>
      <div className="flex-grow h-full pl-[15px] pt-[20px] md:pl-[150px] md:pt-[91px]">
        <p className="text-primary font-semibold text-[10px] mb-[5px] md:text-[14px] md:mb-[5px]">
          STEP {idx}
        </p>
        <p className="font-bold text-[20px]/[1.5] mb-3 md:text-[35px]/[1.5] md:mb-5">
          {featureContent[idx].title}
        </p>
        {featureContent[idx].content}
      </div>
    </div>
  );
};

export default Card;
