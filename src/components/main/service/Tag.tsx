import React from "react";

const Tag = ({ text }: { text: string }) => {
  return (
    <div className="px-2 py-[3px] rounded-full bg-primary text-[12px]/[1.5] font-normal font-pretendard">
      {text}
    </div>
  );
};

export default Tag;
