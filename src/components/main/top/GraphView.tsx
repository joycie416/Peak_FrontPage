"use client";

import { useGraphContext } from "@/store/GraphContext";
import AToAGraph from "./AToAGraph";
import BubbleGraph from "./BubbleGraph";

const GraphView = () => {
  const { newNode } = useGraphContext((store) => store);

  console.log(newNode);

  return (
    <div className="bg-black ">
      {!newNode && <BubbleGraph />}
      {newNode && <AToAGraph />}
    </div>
  );
};

export default GraphView;
