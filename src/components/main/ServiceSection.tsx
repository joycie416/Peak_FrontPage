import ServiceBottom from "./service/ServiceBottom";
import ServiceContent from "./service/ServiceContent";

const ServiceSection = () => {
  return (
    <section id="case-study-wrapper" className="min-w-main-width bg-gray-900">
      <div className="w-main-width mx-auto">
        <ServiceContent />
      </div>
      <ServiceBottom />
    </section>
  );
};

export default ServiceSection;
