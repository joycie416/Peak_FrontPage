import React from "react";
import CaseStudyCard from "./CaseStudyCard";

const CaseStudy = () => {
  return (
    <div className="w-full flex flex-col mt-[30px] md:mt-[100px]">
      <p className="text-primary text-[12px]/[1.5] md:text-[16px] md:leading-[28px]">
        CASE STUDY
      </p>
      <p className="tracking-[-2px] text-[30px]/[1.4] mb-[20px] md:text-[45px]/[1.4] md:mb-[50px]">
        <span className="font-normal">Sales Science</span>
        <br />
        <span className="font-semibold">Playbook & Coffee Chat</span>
      </p>
      <div className="w-full font-pretendard grid grid-rows-[repeat(2,_1fr)] gap-6 md:grid-rows-1 md:grid-cols-[repeat(2,_1fr)]">
        {["Doaz", "FluentT"].map((name) => (
          <CaseStudyCard name={name} key={`case_study_${name}`} />
        ))}
      </div>
    </div>
  );
};

export default CaseStudy;
