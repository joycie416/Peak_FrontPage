"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CompanyProfileForm from "./CompanyProfileForm";

interface Node extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  group: number;
  isNew?: boolean;
}

interface Link {
  source: Node;
  target: Node;
}

const INITIAL_NODES: Node[] = [
  { id: 1, name: "Peak", group: 1 },
  { id: 2, name: "Samsung", group: 2 },
  { id: 3, name: "TheSunHan", group: 2 },
  { id: 4, name: "LG", group: 2 },
  { id: 5, name: "Starbucks", group: 2 },
  { id: 6, name: "toss", group: 2 },
  { id: 7, name: "RIDI", group: 2 },
  { id: 8, name: "TMON", group: 2 },
  { id: 9, name: "yanolja", group: 2 },
  { id: 10, name: "Airbnb", group: 2 },
  { id: 11, name: "WATCHA", group: 2 },
  { id: 12, name: "NETPLIX", group: 2 },
  { id: 13, name: "CGV", group: 2 },
  { id: 14, name: "SANDBOX", group: 2 },
  { id: 15, name: "wadiz", group: 2 },
];

const INITIAL_LINKS: Link[] = [
  { source: INITIAL_NODES[0], target: INITIAL_NODES[1] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[2] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[3] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[4] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[5] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[6] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[7] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[8] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[9] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[10] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[11] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[12] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[13] },
  { source: INITIAL_NODES[0], target: INITIAL_NODES[14] },
  { source: INITIAL_NODES[1], target: INITIAL_NODES[2] },
  { source: INITIAL_NODES[2], target: INITIAL_NODES[3] },
  { source: INITIAL_NODES[3], target: INITIAL_NODES[4] },
  { source: INITIAL_NODES[4], target: INITIAL_NODES[5] },
  { source: INITIAL_NODES[5], target: INITIAL_NODES[6] },
  { source: INITIAL_NODES[6], target: INITIAL_NODES[7] },
  { source: INITIAL_NODES[7], target: INITIAL_NODES[8] },
  { source: INITIAL_NODES[8], target: INITIAL_NODES[9] },
  { source: INITIAL_NODES[9], target: INITIAL_NODES[10] },
  { source: INITIAL_NODES[10], target: INITIAL_NODES[11] },
  { source: INITIAL_NODES[11], target: INITIAL_NODES[12] },
  { source: INITIAL_NODES[12], target: INITIAL_NODES[13] },
  { source: INITIAL_NODES[13], target: INITIAL_NODES[14] },
];

const NetworkGraph = () => {
  const svgRef = useRef(null);

  const [nodes, setNodes] = useState<Node[]>(() => INITIAL_NODES);

  const [links, setLinks] = useState<Link[]>(() =>
    INITIAL_LINKS.map((link) => ({ source: link.source, target: link.target }))
  );

  useEffect(() => {
    if (!svgRef.current) return;

    // 기존 simulation이 있을 경우 중지하고 다시 실행
    d3.select(svgRef.current).selectAll("*").remove();

    // graph가 그려질 사이즈
    const width = 700;
    const height = 700;

    // svg 요소 설정
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid #340b60");

    // 물리 엔진 설정
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        // 링크된 노드 사이 거리 조정
        "link",
        d3
          .forceLink(links)
          .id((d) => (d as Node).id)
          .distance(250)
      )
      .force("charge", d3.forceManyBody().strength(-200)) // 노드 간 멀어지는 힘 (음수)
      .force("center", d3.forceCenter(width / 2, height / 2)); // 화면 중앙 정렬

    // 링크 설정
    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#cfa7fa")
      .attr("stroke-width", 1);

    // 노드 설정
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag<SVGGElement, Node, Node>() // 드래그 이벤트 추가
          .on("start", dragstart)
          .on("drag", dragged)
          .on("end", dragend)
      );

    // 노드 속성 설정
    node
      .append("circle")
      .attr("class", "node")
      .attr("r", 30)
      .attr("stroke", (d) => {
        if (d.isNew) return "#420c7c";
        return "efe0ff";
      })
      .attr("stroke-width", 1)
      .attr("fill", (d) => {
        if (d.isNew) return "#f0f0f0";
        return d.group === 1 ? "#420c7c" : "#a24bff";
      });

    // 노드에 텍스트 추가
    node
      .append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .attr("fill", (d) => {
        if (d.isNew) return "420c7c";
        return "white";
      })
      .attr("font-size", "10px")
      .text((d) => d.name);

    // 물리 법칙 적용시 매 프레임마다 실행되는 이벤트
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as any).x)
        .attr("y1", (d) => (d.source as any).y)
        .attr("x2", (d) => (d.target as any).x)
        .attr("y2", (d) => (d.target as any).y);
      // 노드 위치 설정 (d.x, d.y)로
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // 노드 드래그 이벤트 관련 함수들
    function dragstart(event: { active: any }, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart(); // 물리 엔진 활성화, 0.3: 업데이트 시간
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: Node, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragend(event: { active: any }, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [nodes, links]);

  const handleNode = (name: string) => {
    if (nodes.length >= 16) {
      console.log("이미 추가된 노드입니다.");
      return;
    }

    const newNode = { id: 16, name, group: 2, isNew: true };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];

      setLinks((prevLinks) => [
        ...prevLinks,
        { source: updatedNodes[0], target: newNode },
        { source: updatedNodes[14], target: newNode },
      ]);

      return updatedNodes;
    });

    console.log("노드를 추가했습니다.");
  };

  return (
    <>
      <div className="w-fit">
        <svg ref={svgRef}></svg>
        <p>- network graph -</p>
        <CompanyProfileForm handleNode={handleNode} />
      </div>
    </>
  );
};

export default NetworkGraph;
