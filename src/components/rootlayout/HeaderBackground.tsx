"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";

const HeaderBackground = ({ children }: PropsWithChildren) => {
  // 스크롤 시 라운딩
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn("w-full h-20 px-[30px] fixed top-0 z-[10] transition-all", {
        "px-0": isScrolled,
      })}
    >
      <div
        id="header_background"
        className={cn(
          "w-full h-full px-[30px] bg-white bg-white rounded-b-[25px] transition-all",
          {
            "px-[60px] rounded-none": isScrolled,
          }
        )}
      >
        {children}
      </div>
    </header>
  );
};

export default HeaderBackground;
