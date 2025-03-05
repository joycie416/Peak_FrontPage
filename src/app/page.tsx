import ServiceSection from "@/components/main/ServiceSection";
import DataSection from "@/components/main/DataSection";
import FeatureSection from "@/components/main/FeatureSection";
import GoalSection from "@/components/main/GoalSection";
import Top from "@/components/main/TopSection";
import VisionSection from "@/components/main/VisionSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Top />
      <DataSection />
      <GoalSection />
      <FeatureSection />
      <ServiceSection />
      <VisionSection />
    </div>
  );
}
