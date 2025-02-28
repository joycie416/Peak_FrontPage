"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Introduction = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 2000);

    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full h-full flex justify-center items-center absolute top-0 bg-black",
        {
          "animate-top_fadeout": !isHidden,
          hidden: isHidden,
        }
      )}
    >
      <h1 className={"text-[30px] text-white self-center "}>Sales Agent AI</h1>
    </div>
  );
};

export default Introduction;
