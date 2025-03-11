"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DragEvent, Link, Node } from "@/types/graph";
import CompanyProfileForm from "./CompanyProfileForm";
import { useGraphContext } from "@/store/GraphContext";

type Size = { width: number; height: number };

const AToAGraph = () => {
  const svgRef = useRef(null);
  const simulationRef = useRef<d3.Simulation<Node, Link>>(null);

  const {
    currentAToANodes: nodes,
    currentAToALinks: links,
    aToACenterNodes: centerNodes,
    addNewNode,
    reset,
  } = useGraphContext((store) => store);

  // 그래프뷰 폭 조절
  const [{ width, height }, setSize] = useState<Size>(() => {
    if (typeof window === "undefined") return { width: 1920, height: 1080 };
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(function handleWindowResize() {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize(() => ({ width, height }));
      createGraph({ width, height });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const createGraph = ({ width, height }: Size) => {
    // 기존 simulation이 있을 경우 중지하고 다시 실행
    d3.select(svgRef.current).selectAll("*").remove();

    // simulation이 있으면 중지
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const nodeSize = 20;
    const nodeSpacing = 25;
    const columns = 4;
    const rows = 2;
    const spacingX = width / 4 > 350 ? 350 : width / 4;
    const spacingY = height / 2.5;
    const startX = (width - (columns - 1) * spacingX) / 2; // 중앙 정렬 시작 X
    const startY = (height - (rows - 1) * spacingY) / 2; // 중앙 정렬 시작 Y

    // 2열 4행으로 배치
    centerNodes.forEach((node, idx) => {
      node.fx = startX + (idx % columns) * spacingX;
      node.fy = startY + Math.floor(idx / columns) * spacingY;
    });

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => (d as Node).id)
          .distance(80)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "x",
        d3.forceX((d) =>
          centerNodes.includes(d as Node) ? d.fx ?? width / 2 : width / 2
        )
      )
      .force(
        "y",
        d3.forceY((d) =>
          centerNodes.includes(d as Node) ? d.fy ?? height / 2 : height / 2
        )
      )

      .force("collid", d3.forceCollide(nodeSpacing));

    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "var(--peak-200)")
      .attr("stroke-width", 1);

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, Node, Node>()
          .on("start", dragstart)
          .on("drag", dragged)
          .on("end", dragend)
      )
      .on("click", (_, d) => {
        let homepage = d.homepage;

        if (!homepage.startsWith("https://")) {
          if (homepage.startsWith("www")) {
            homepage = `https://${homepage}`;
          } else {
            homepage = `https://www.${homepage}`;
          }
        }
        console.log(homepage);
        window.open(homepage, "_blank");
      });

    // 원 추가
    node
      .append("circle")
      .attr("class", "node")
      .attr("r", nodeSize)
      .attr("stroke", (d) => {
        if (d.isNew) return "#a24bff";
        return centerNodes.includes(d) ? "var(--peak-700)" : "var(--peak-200)";
      })
      .attr("stroke-width", (d) => (centerNodes.includes(d) ? 2 : 1))
      .attr("fill", (d) => {
        if (d.isNew) return "#a24bff";
        return "#fff";
      });

    // new 노드에 텍스트 추가
    node
      .filter((d) => !!d.isNew)
      .append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .attr("fill", "#FFF")
      .attr("font-size", "10px")
      .text((d) => d.company);

    // 로고 추가
    const clipPath = svg
      .append("defs")
      .selectAll("clipPath")
      .data(nodes)
      .enter()
      .append("clipPath")
      .attr("id", (d) => `clip-${d.id}`);

    clipPath
      .append("circle")
      .attr("r", nodeSpacing)
      .attr("cx", 0)
      .attr("cy", 0);

    node
      .append("image")
      .attr("xlink:href", (d) => d.logo_url || "")
      .attr("width", nodeSpacing)
      .attr("height", nodeSpacing)
      .attr("x", () => {
        const size = nodeSpacing;
        return -size / 2;
      })
      .attr("y", () => {
        const size = nodeSpacing;
        return -size / 2;
      })
      .attr("clip-path", (d) => `url(#clip-${d.id})`);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: Link) => d.source.x as number)
        .attr("y1", (d: Link) => d.source.y as number)
        .attr("x2", (d: Link) => d.target.x as number)
        .attr("y2", (d: Link) => d.target.y as number);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function dragstart(event: DragEvent, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: Node, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragend(event: DragEvent, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // 기존 simulation이 있을 경우 중지하고 다시 실행
    d3.select(svgRef.current).selectAll("*").remove();

    createGraph({ width, height });
  }, [nodes, width, height]);

  const handleNode = (
    mode: "new" | "reset",
    company?: string,
    executive?: string,
    email?: string
  ) => {
    if (mode === "new") {
      if (nodes.length >= 302) {
        alert("기존 데이터를 삭제해주세요.");
        return;
      }

      if (company && executive && email) {
        const newNode: Node = {
          id: 302,
          company,
          key_executive: executive,
          industry: "",
          address: "",
          homepage: "",
          email,
          phone_number: "정보 없음",
          sales: "정보 없음",
          total_funding: "정보 없음",
          isNew: true,
        };

        addNewNode(newNode);
      }
    }
    if (mode === "reset") {
      reset();
    }
  };

  return (
    <div className="w-screen h-screen bg-black relative max-lg:hidden">
      <svg ref={svgRef}></svg>
      <CompanyProfileForm handleNode={handleNode} />
    </div>
  );
};

export default AToAGraph;
