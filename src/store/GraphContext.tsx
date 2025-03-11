"use client";

import React, { createContext, ReactNode, useContext, useRef } from "react";
import createGraphStore, { GraphState, GraphStore } from "./graphStore";
import { useStore } from "zustand";

export const GraphContext = createContext<GraphStore | null>(null);

type TSelector<T> = (state: GraphState) => T;

export function useGraphContext<T>(selector: TSelector<T>): T {
  const store = useContext(GraphContext);
  if (!store) throw Error("Missing GraphContext.Provider in the tree");
  return useStore(store, selector);
}

const GraphContextProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<GraphStore>(null);
  if (!storeRef.current) {
    storeRef.current = createGraphStore();
  }
  return (
    <GraphContext.Provider value={storeRef.current}>
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContextProvider;
