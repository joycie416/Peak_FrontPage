import Introduction from "./Introduction";
import NetworkGraph from "./NetworkGraph";

const Top = () => {
  return (
    <section id="top_wrapper" className="w-screen h-screen relative">
      <NetworkGraph />
      <Introduction />
    </section>
  );
};

export default Top;
