import React from "react";
import CaseStudyCard from "./CaseStudyCard";

const CaseStudy = () => {
  return (
    <div className="w-full flex flex-col mt-[100px]">
      <p className="text-[16px] leading-[28px] text-primary">CASE STUDY</p>
      <p className="text-[45px]/[1.4] tracking-[-2px] mb-[50px]">
        <span className="font-normal">Sales Science</span>
        <br />
        <span className="font-semibold">Playbook & Coffee Chat</span>
      </p>
      <div className="w-full flex justify-between font-pretendard">
        {["Doaz", "FluentT"].map((name) => (
          <CaseStudyCard name={name} key={`case_study_${name}`} />
        ))}
      </div>
    </div>
  );
};

export default CaseStudy;
