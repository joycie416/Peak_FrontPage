import Introduction from "@/components/main/top/Introduction";
import GraphContextProvider from "@/store/GraphContext";
import GraphView from "./top/GraphView";

const Top = () => {
  return (
    <GraphContextProvider>
      <section id="top_wrapper" className="w-screen h-screen relative">
        <GraphView />
        <Introduction />
      </section>
    </GraphContextProvider>
  );
};

export default Top;
