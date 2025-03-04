import DataSection from "@/components/main/DataSection";
import Top from "@/components/main/TopSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Top />
      <DataSection />
    </div>
  );
}
