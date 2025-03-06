import DataContent from "./data/DataContent";

const DataSection = () => {
  return (
    <section id="data-wrapper" className="w-full xl:min-w-desktop-width">
      {/* <div className="w-full xl:w-desktop-width mx-auto"> */}
      <DataContent />
      {/* </div> */}
    </section>
  );
};

export default DataSection;
