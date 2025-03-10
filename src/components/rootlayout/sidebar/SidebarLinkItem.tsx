"use client";

import { SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { LINKS } from "@/constants/header";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const SidebarLinkItem = ({ to }: { to: keyof typeof LINKS }) => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <Link
        href={LINKS[to]}
        className={cn(
          `${manrope.className} text-[#333333] text-[14px] font-bold`,
          {
            "text-primary":
              (to !== "/" && pathname.startsWith(to)) ||
              (to === "/" && pathname === to),
          }
        )}
        onClick={() => setOpenMobile(false)}
      >
        {to === "/" ? "HOME" : to.slice(1).toUpperCase()}
      </Link>
    </SidebarMenuItem>
  );
};

export default SidebarLinkItem;
