import PriceCard from "./PriceCard";

const Price = () => {
  return (
    <div className="w-full flex flex-col mt-[100px] mb-[77px]">
      <p className="text-[16px] leading-[32px]">PRICING</p>
      <p className="text-[50px] leading-[70px] tracking-[-3px] mb-[80px]">
        <span className="font-normal leading-[70px]">Subscribe to</span>
        <br />
        <span className="font-semibold leading-[70px]">PEAK Service</span>
      </p>
      <div className="w-full flex flex-col gap-[50px] justify-between font-pretendard">
        {["B2B", "B2G", "B2W"].map((name) => (
          <PriceCard name={name} key={name} />
        ))}
      </div>
    </div>
  );
};

export default Price;
