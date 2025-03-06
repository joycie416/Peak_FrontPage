import PriceCard from "./PriceCard";

const Price = () => {
  return (
    <div className="w-full flex flex-col mt-[30px] mb-[30px] md:mt-[100px] md:mb-[77px]">
      <p className="text-[12px]/[1.5] md:text-[16px] md:leading-[32px]">
        PRICING
      </p>
      <p className="tracking-[-3px] text-[30px]/[1.4] mb-[20px] md:text-[50px]/[1.4] md:mb-[80px]">
        <span className="font-normal">Subscribe to</span>
        <br />
        <span className="font-semibold">PEAK Service</span>
      </p>
      <div className="w-full font-pretendard grid grid-rows-[repeat(3,_1fr)] gap-6 md:flex md:flex-col md:gap-[50px] md:justify-between">
        {["B2B", "B2G", "B2W"].map((name) => (
          <PriceCard name={name} key={name} />
        ))}
      </div>
    </div>
  );
};

export default Price;
