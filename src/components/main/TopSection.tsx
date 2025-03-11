import Introduction from "@/components/main/top/Introduction";
import NetworkGraph from "@/components/main/top/NetworkGraph";
import AToAGraph from "./top/AToAGraph";
import GraphContextProvider from "@/store/GraphContext";

const Top = () => {
  return (
    <GraphContextProvider>
      <section id="top_wrapper" className="w-screen h-screen relative">
        <NetworkGraph />
        <AToAGraph />
        <Introduction />
      </section>
    </GraphContextProvider>
  );
};

export default Top;
