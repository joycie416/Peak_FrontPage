import Image from "next/image";
import GoalContent from "./goal/GoalContent";
import GoalGraphic from "@public/main/figures/goal-graphic.svg";

const GoalSection = () => {
  return (
    <section
      id="goal-wrapper"
      className="min-w-main-width h-[390px] bg-primary relative"
    >
      <Image
        src={GoalGraphic}
        alt="goal-graphic"
        className="absolute top-0 bottom-0 right-0"
      />
      <div className="w-main-width mx-auto">
        <GoalContent />
      </div>
    </section>
  );
};

export default GoalSection;
