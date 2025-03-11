import Introduction from "@/components/main/top/Introduction";
import BubbleGraph from "@/components/main/top/BubbleGraph";
import AToAGraph from "./top/AToAGraph";
import GraphContextProvider from "@/store/GraphContext";

const Top = () => {
  return (
    <GraphContextProvider>
      <section id="top_wrapper" className="w-screen h-screen relative">
        <BubbleGraph />
        <AToAGraph />
        <Introduction />
      </section>
    </GraphContextProvider>
  );
};

export default Top;
