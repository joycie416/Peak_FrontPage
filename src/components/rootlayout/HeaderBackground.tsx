"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const HeaderBackground = ({ children }: PropsWithChildren) => {
  // 스크롤 시 라운딩 제거
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

  // 모바일 사이드바 설정
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile]);

  return (
    <header
      className={cn(
        "w-full h-20 px-[30px] fixed top-0 z-[10] transition-all max-lg:hidden",
        {
          "px-0": isScrolled,
        }
      )}
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
