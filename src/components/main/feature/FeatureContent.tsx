import Card from "./Card";

const FeatureContent = () => {
  return (
    <div className="w-full xl:w-desktop-width mx-auto">
      <div className="flex flex-col items-center px-[20px] py-[30px] md:px-0 md:py-[100px]">
        <p className="font-semibold text-primary text-[10px]/[2] md:text-[14px]/[2]">
          HOW IT WORKS
        </p>
        <p className="font-normal text-[30px] leading-[40px] text-center mt-[10px] mb-5 md:text-[45px] md:leading-[70px] md:text-justify md:mt-0 md:mb-20">
          End-to-End <br className="md:hidden" />
          <span className="font-semibold">Sales Tech Processing</span>
        </p>
        <div className="w-full flex flex-col gap-[30px] md:gap-[100px]">
          {[1, 2, 3, 4].map((idx) => (
            <Card idx={idx.toString()} key={`feature_${idx}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureContent;
