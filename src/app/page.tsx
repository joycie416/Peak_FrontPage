import DataSection from "@/components/main/DataSection";
import GoalSection from "@/components/main/GoalSection";
import Top from "@/components/main/TopSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Top />
      <DataSection />
      <GoalSection />
    </div>
  );
}
