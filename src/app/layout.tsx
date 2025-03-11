import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import Footer from "@/components/rootlayout/Footer";
import Header from "@/components/rootlayout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/rootlayout/sidebar/AppSidebar";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PEAK",
  description:
    "Sales Agentic AI - 회사소개서만 올리면 AI 에어전트가 잠재고객을 찾고 만나고 추천해 드립니다.",
  keywords: [
    "피크",
    "더선한",
    "더선한 주식회사",
    "AI",
    "에이전트",
    "Sales Agentic AI",
    "리드",
  ],
  openGraph: {
    url: "https://peak-main-page.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${chakra.className} antialiased relative`}>
        <SidebarProvider defaultOpen={false} className="flex-col">
          <AppSidebar />
          <Header />
          {children}
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
