import Introduction from "@/components/main/top/Introduction";
import NetworkGraph from "@/components/main/top/NetworkGraph";

const Top = () => {
  return (
    // 임시로 모바일에서는 안보이게
    <section
      id="top_wrapper"
      className="w-screen h-screen relative max-md:hidden"
    >
      <NetworkGraph />
      <Introduction />
    </section>
  );
};

export default Top;
