import { totalData } from "@/constants/totalData";
import { getA2ARandomLinks } from "@/lib/aToARandomLinks";
import { Link, Node } from "@/types/graph";
import { create } from "zustand";

type GraphStateType = {
  bubbleInitialNodes: Node[];
  bubbleInitialLinks: Link[];
  aToAInitialNodes: Node[];
  aToAInitialLinks: Link[];
  aToACenterNodes: Node[];
  currentBubbleNodes: Node[];
  currentBubbleLinks: Link[];
  currentAToANodes: Node[];
  currentAToALinks: Link[];
  newNode: null | Node;
  isFormOpen: boolean;
  isSubmitted: boolean;
  // file: null | File;
};

type GraphActionType = {
  addNewNode: (newNode: Node) => void;
  reset: () => void;
  setIsFormOpen: (open: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
};

export type GraphState = GraphStateType & GraphActionType;

export type GraphStore = ReturnType<typeof createGraphStore>;

const createGraphStore = () => {
  const bubbleInitialNodes = totalData.map((node) => ({ ...node }));
  const bubbleInitialLinks = bubbleInitialNodes
    .slice(1)
    .map((node) => ({ source: bubbleInitialNodes[0], target: node }));
  const {
    nodes: aToAInitialNodes,
    centerNodes: aToACenterNodes,
    links: aToAInitialLinks,
  } = getA2ARandomLinks();
  return create<GraphState>((set, get) => ({
    bubbleInitialNodes,
    bubbleInitialLinks,
    aToAInitialNodes,
    aToAInitialLinks,
    aToACenterNodes,
    currentBubbleNodes: bubbleInitialNodes,
    currentBubbleLinks: bubbleInitialLinks,
    currentAToANodes: aToAInitialNodes,
    currentAToALinks: aToAInitialLinks,
    newNode: null,
    isFormOpen: false,
    isSubmitted: false,

    // file: null,
    addNewNode: (newNode: Node) => {
      set(() => {
        const currentBubbleNodes = [...get().currentBubbleNodes];
        currentBubbleNodes.push(newNode);
        const currentBubbleLinks = [
          ...get().currentBubbleLinks,
          { source: currentBubbleNodes[0], target: newNode },
        ];

        const currentAToANodes = [...get().currentAToANodes];
        currentAToANodes.push(newNode);
        const currentAToALinks = [
          ...get().currentAToALinks,
          { source: get().aToACenterNodes[0], target: newNode },
          { source: get().aToACenterNodes[1], target: newNode },
          { source: get().aToACenterNodes[5], target: newNode },
        ];

        return {
          currentBubbleNodes,
          currentBubbleLinks,
          currentAToANodes,
          currentAToALinks,
          newNode,
          isFormOpen: true,
          // file,
        };
      });
    },
    reset: () =>
      set(() => {
        return {
          currentBubbleNodes: get().bubbleInitialNodes,
          currentBubbleLinks: get().bubbleInitialLinks,
          currentAToANodes: get().aToAInitialNodes,
          currentAToALinks: get().aToAInitialLinks,
          newNode: null,
          isFormOpen: true,
          // file: null,
        };
      }),
    setIsFormOpen: (open: boolean) => set(() => ({ isFormOpen: open })),
    setIsSubmitted: (isSubmitted: boolean) => set(() => ({ isSubmitted })),
  }));
};

export default createGraphStore;
