import { cn } from "@/lib/utils";
import B2B from "@public/main/services/B2B.svg";
import B2G from "@public/main/services/B2G.svg";
import B2W from "@public/main/services/B2W.svg";
import Image from "next/image";

const serviceContents: {
  [key: string]: { tag: string; img: string; gif: string; contents: string[] };
} = {
  B2B: {
    tag: "기업",
    img: B2B,
    gif: "asdf",
    contents: [
      "AI 모델 1회 사용",
      "에이전트 배정(AI챗봇)",
      "온라인 웨비나 참여",
      "오프라인 커피챗 참여",
    ],
  },
  B2G: {
    tag: "정부",
    img: B2G,
    gif: "asdf",
    contents: [
      "AI 모델 20회 사용",
      "전담 매니저 배정",
      "메일 RPA 제공",
      "온+오프라인 행사 초대",
      "유망 리드 1회 미팅 성사",
    ],
  },
  B2W: {
    tag: "글로벌",
    img: B2W,
    gif: "asdf",
    contents: [
      "AI 모델 100회 사용",
      "전담 셰르파 배정 (자문급)",
      "메일 + 공문 RPA 제공",
      "온+오프라인 행사 특별 참여",
      "유망 리드 5회 미팅 성사",
    ],
  },
};

const PriceCard = ({ name }: { name: string }) => {
  return (
    <div className="w-full flex text-white overflow-hidden group flex-col h-[335px] rounded-[15px] md:flex-row md:h-[335px] md:rounded-[30px]">
      <div className="bg-gray-800 relative transition-colors w-full h-1/2 p-[20px] md:w-1/2 md:h-full md:px-[50px] md:py-[60px] group-hover:bg-primary">
        <p className="font-bold font-chakra text-[30px]/[1] mb-[4px] md:text-[40px]/[1] md:mb-[10px]">
          {name}
        </p>
        <p className="tracking-[-0.48px] text-[14px]/[1.5] md:text-[16px]/[1.5]">
          {serviceContents[name].tag}
        </p>
        <Image
          src={serviceContents[name].img}
          alt={`${name}_img`}
          className="w-[140px] aspect-[378/183] absolute bottom-[20px] right-[20px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] md:w-[378px] md:bottom-[30px] md:right-[30px] md:drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
        />
      </div>
      <div
        className={cn(
          "bg-gray-700 w-full h-1/2 pl-[20px] pt-[20px] md:w-1/2 md:h-full md:pl-[50px] md:pt-[55px]",
          {
            "md:pt-[70px]": serviceContents[name].contents.length === 4,
          }
        )}
      >
        <ul className="list-disc list-inside">
          {serviceContents[name].contents.map((content) => (
            <li
              key={content}
              className={cn("text-[16px]/[1.6] md:text-[25px]/[2]", {
                "text-[16px]/[2]": serviceContents[name].contents.length === 4,
              })}
            >
              {content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PriceCard;
