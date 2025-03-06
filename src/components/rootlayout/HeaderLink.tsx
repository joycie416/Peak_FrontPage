"use client";

import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const links = {
  "/": "/",
  "/solution": "/solution",
  "/dashboard": "https://peak-backoffice.vercel.app/",
  "/blog":
    "https://www.peak.ceo/is-artificial-intelligence-accessible-to-businesses-of-all-sizes/",
  "/contacts": "https://www.peak.ceo/contacts/",
};

const HeaderLink = ({ to }: { to: keyof typeof links }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Link
      href={links[to]}
      className={cn(
        `px-[15px] py-[10px] ${manrope.className} text-[#333333] text-[14px] font-bold rounded-full`,
        {
          "bg-black text-[#F5F5F5]":
            (to !== "/" && pathname.startsWith(to)) ||
            (to === "/" && pathname === to),
        }
      )}
    >
      {to === "/" ? "HOME" : to.slice(1).toUpperCase()}
    </Link>
  );
};

export default HeaderLink;
