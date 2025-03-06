import ServiceBottom from "./service/ServiceBottom";
import ServiceContent from "./service/ServiceContent";

const ServiceSection = () => {
  return (
    <section
      id="case-study-wrapper"
      className="min-w-desktop-width bg-gray-900"
    >
      <div className="w-desktop-width mx-auto">
        <ServiceContent />
      </div>
      <ServiceBottom />
    </section>
  );
};

export default ServiceSection;
