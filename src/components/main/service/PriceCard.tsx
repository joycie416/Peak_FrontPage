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
    <div className="w-full h-[335px] flex rounded-[30px] text-white overflow-hidden group">
      <div className="w-1/2 px-[50px] py-[60px] bg-gray-800 relative transition-colors group-hover:bg-primary">
        <p className="text-[40px]/[1] font-bold font-chakra mb-[10px]">
          {name}
        </p>
        <p className="text-[16px]/[1.5] tracking-[-0.48px]">
          {serviceContents[name].tag}
        </p>
        <Image
          src={serviceContents[name].img}
          alt={`${name}_img`}
          className="absolute bottom-0 right-0"
        />
      </div>
      <div
        // onMouseOver={() => alert("마우스 오버")}
        className={cn("w-1/2 pl-[50px] pt-[55px] bg-gray-700", {
          "pt-[70px]": serviceContents[name].contents.length === 4,
        })}
      >
        <ul className="list-disc list-inside">
          {serviceContents[name].contents.map((content) => (
            <li key={content} className="text-[25px]/[2]">
              {content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PriceCard;
