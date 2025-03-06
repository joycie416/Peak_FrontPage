import CaseStudy from "./CaseStudy";
import Price from "./Price";

const ServiceContent = () => {
  return (
    <div className="w-full xl:w-desktop-width mx-auto">
      <div className="flex flex-col items-center text-white px-[20px] md:px-0">
        <CaseStudy />
        <Price />
      </div>
    </div>
  );
};

export default ServiceContent;
