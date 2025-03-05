import Card from "./Card";

const FeatureContent = () => {
  return (
    <div className="py-[100px] flex flex-col items-center">
      <p className="text-[14px]/[2] font-semibold text-primary">HOW IT WORKS</p>
      <p className="text-[45px] font-normal leading-[70px] mb-20">
        End-to-End <span className="font-semibold">Sales Tech Processing</span>
      </p>
      <div className="w-full flex flex-col gap-[100px]">
        {[1, 2, 3, 4].map((idx) => (
          <Card idx={idx.toString()} key={`feature_${idx}`} />
        ))}
      </div>
    </div>
  );
};

export default FeatureContent;
