"use client";

import { useGraphContext } from "@/store/GraphContext";
import AToAGraph from "./AToAGraph";
import BubbleGraph from "./BubbleGraph";
import { useIsMobile } from "@/hooks/use-mobile";

const GraphView = () => {
  const { newNode } = useGraphContext((store) => store);
  const isMobile = useIsMobile();

  console.log(newNode);

  return (
    <div className="bg-black ">
      {!newNode && <BubbleGraph />}
      {newNode && !isMobile && <AToAGraph />}
      {newNode && isMobile && <BubbleGraph />}
    </div>
  );
};

export default GraphView;
