"use client";

import { usePathname } from "next/navigation";

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // 회원가입/로그인 페이지에서는 header 안보이게
  const isHidden =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  if (isHidden) {
    return;
  }

  return <header>{children}</header>;
};

export default HeaderWrapper;
