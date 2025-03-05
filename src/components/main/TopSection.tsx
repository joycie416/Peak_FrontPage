import Introduction from "@/components/main/top/Introduction";
import NetworkGraph from "@/components/main/top/NetworkGraph";

const Top = () => {
  return (
    <section id="top_wrapper" className="w-screen h-screen relative">
      <NetworkGraph />
      <Introduction />
    </section>
  );
};

export default Top;
