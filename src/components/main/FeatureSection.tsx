import FeatureContent from "./feature/FeatureContent";

const FeatureSection = () => {
  return (
    <section id="feature-wrapper" className="w-full xl:min-w-desktop-width">
      {/* <div className="w-full xl:w-desktop-width mx-auto"> */}
      <FeatureContent />
      {/* </div> */}
    </section>
  );
};

export default FeatureSection;
