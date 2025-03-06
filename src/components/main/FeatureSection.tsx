import FeatureContent from "./feature/FeatureContent";

const FeatureSection = () => {
  return (
    <section id="feature-wrapper" className="min-w-desktop-width">
      <div className="w-desktop-width mx-auto">
        <FeatureContent />
      </div>
    </section>
  );
};

export default FeatureSection;
