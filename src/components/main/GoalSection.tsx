import Image from "next/image";
import GoalContent from "./goal/GoalContent";
import GoalGraphic from "@public/main/figures/goal-graphic.svg";

const GoalSection = () => {
  return (
    <section
      id="goal-wrapper"
      className="w-full xl:min-w-desktop-width md:h-[390px] bg-primary relative"
    >
      <Image
        src={GoalGraphic}
        alt="goal-graphic"
        className="absolute top-0 bottom-0 right-0 pointer-events-none max-md:hidden" // 모바일에서는 안보이게
      />
      {/* <div className="w-full xl:w-desktop-width mx-auto"> */}
      <GoalContent />
      {/* </div> */}
    </section>
  );
};

export default GoalSection;
