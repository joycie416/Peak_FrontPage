import React from "react";
import Doaz from "@public/main/Doaz.svg";
import FluentT from "@public/main/FluentT.svg";
import Image from "next/image";
import Tag from "./Tag";
import Link from "next/link";
import { cn } from "@/lib/utils";

const caseStudyContents: {
  [key: string]: {
    name: string;
    tags: string[];
    challenge: string;
    solution: string;
    results: string;
    src: string;
  };
} = {
  Doaz: {
    name: "주식회사 두아즈",
    tags: ["PEAK", "Solutions"],
    challenge: "[중대재해처벌법 관련 웨비나]",
    solution: "온라인 세미나 (신청자 줌링크 초대)",
    results: "사전 신청 381명 / 실참여 : 120명",
    src: Doaz,
  },
  FluentT: {
    name: "주식회사 플루언트",
    tags: ["Urban", "Solutions"],
    challenge: "[AGI Webinar] '인공지능으로 가는 길'",
    solution: "온라인 세미나",
    results: "사전 신청 509명 / 실참여 : 238명",
    src: FluentT,
  },
};

const CaseStudyCard = ({ name }: { name: string }) => {
  return (
    <div className="w-[580px] h-[584px] p-[30px] flex flex-col rounded-[30px] bg-gray-700">
      <div className="w-full h-[313px] rounded-[30px] mb-[30px] overflow-hidden relative group">
        <Image
          src={caseStudyContents[name].src}
          alt={name}
          className={cn("w-full h-full object-cover object-top", {
            "scale-[100.3%]": name === "Doaz", // 이미지 오른쪽 하얀색 선 안보이게 하기 위함
          })}
        />
        {name === "Doaz" && (
          <div className="w-full h-full bg-black/60 absolute top-0 hidden group-hover:flex">
            <Link
              href={"https://www.peak.ceo/"}
              target="_blank"
              className="w-fit h-fit px-10 py-[15px] m-auto bg-primary rounded-full text-[16px] leading-[27px] font-semibold font-pretendard"
            >
              더 보러가기
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-[10px] mb-[10px]">
        {caseStudyContents[name].tags.map((tag) => (
          <Tag text={tag} key={`${name}_tag_${tag}`} />
        ))}
      </div>
      <p className="text-[30px] font-bold mb-[15px]">
        {caseStudyContents[name].name}
      </p>
      <ul className="list-disc list-inside font-normal pl-[5px] case_study_marker">
        <li className="text-[18px] leading-[32.4px]">
          Challenge: {caseStudyContents[name].challenge}
        </li>
        <li className="text-[18px] leading-[32.4px]">
          Solution: {caseStudyContents[name].solution}
        </li>
        <li className="text-[18px] leading-[32.4px]">
          Results: {caseStudyContents[name].results}
        </li>
      </ul>
    </div>
  );
};

export default CaseStudyCard;
