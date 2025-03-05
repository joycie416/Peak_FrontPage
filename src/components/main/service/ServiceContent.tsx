import CaseStudy from "./CaseStudy";
import Price from "./Price";
import ServiceBottom from "./ServiceBottom";

const ServiceContent = () => {
  return (
    <div className="flex flex-col items-center text-white">
      <CaseStudy />
      <Price />
    </div>
  );
};

export default ServiceContent;
