export interface Node extends d3.SimulationNodeDatum {
  id: number;
  company: string;
  key_executive: string;
  industry: string;
  address: string;
  homepage: string;
  email: string;
  phone_number: string;
  sales: string;
  total_funding: string;
  logo_url?: string;
  isNew?: boolean;
}

export interface Link {
  source: Node;
  target: Node;
}

export type DragEvent = d3.D3DragEvent<SVGGElement, Node, Node>;
