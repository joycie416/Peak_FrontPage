"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CompanyProfileForm from "./CompanyProfileForm";
import { totalData } from "@/constants/totalData";
import { useIsMobile } from "@/hooks/use-mobile";
// import PEAK from '@public/PEAK-simple-logo.svg'

interface Node extends d3.SimulationNodeDatum {
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

interface Link {
  source: Node;
  target: Node;
}

const INITIAL_LINKS: Link[] = totalData.map((node) => ({
  source: totalData[0],
  target: node,
}));

type Size = { width: number; height: number };

type DragEventType = d3.D3DragEvent<SVGGElement, Node, Node>;

const NetworkGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<Node, Link>>(null);
  const isMobile = useIsMobile();

  const [nodes, setNodes] = useState<Node[]>(() => totalData);
  const [links, setLinks] = useState<Link[]>(() => INITIAL_LINKS);

  const convertingNodeSize = (d: Node, number: number): number => {
    const total_funding = Number(d.total_funding.split("억")[0]);

    const mobileRatio = 0.6;
    const peakSize = isMobile ? 50 : 70;
    const newSize = isMobile ? 30 : 50;
    let defaultSize = !isNaN(total_funding)
      ? Math.sqrt(total_funding) * 1.1 + number
      : number;

    if (defaultSize > peakSize) {
      defaultSize = peakSize - 3;
    }

    if (d.id == 1) return peakSize;
    if (!!d.isNew) return newSize;

    return isMobile ? defaultSize * mobileRatio : defaultSize;

    // if (!isMobile) {
    //   if (d.id == 1 || !!d.isNew) {
    //     return 50;
    //   }

    //   return !isNaN(total_funding)
    //     ? Math.sqrt(total_funding) * 1.1 + number
    //     : number;
    // }
    // // 모바일인 경우 노드 지름 절반으로
    // // if (isMobile) {
    // else {
    //   if (d.id == 1) return 40;
    //   if (!!d.isNew) return 30;

    //   return !isNaN(total_funding)
    //     ? (Math.sqrt(total_funding) * 1.1 + number) * mobileRatio
    //     : number * mobileRatio;
    // }
  };

  // 그래프뷰 폭 조절
  const [{ width, height }, setSize] = useState<Size>(() => {
    if (typeof window === "undefined") return { width: 1920, height: 1080 };
    console.log({ width: window.innerWidth, height: window.innerHeight });
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize(() => {
        console.log("모바일인가?", isMobile);

        return { width, height };
      });
      createGraph({ width, height });

      // setPeakCenter({ width, height });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 그래프뷰 생성

  const createGraph = ({ width, height }: Size) => {
    // 기존 simulation이 있을 경우 중지하고 다시 실행
    d3.select(svgRef.current).selectAll("*").remove();

    // simulation이 있으면 중지
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    // 노드 크기, 사이 여백
    const nodeSize = 10;
    const nodeSpacing = isMobile ? 10 : 12;
    const linkSpacing = isMobile ? 50 : 75;
    const chargeStrength = isMobile ? -70 : -250;

    // svg 요소 설정
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    // .style("border", "1px solid #340b60");

    // 물리 엔진 설정
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        // 링크된 노드 사이 거리 조정
        "link",
        d3
          .forceLink(links)
          .id((d) => (d as Node).id)
          .distance(linkSpacing)
        // .distance(isMobile ? 100 : 250)
      )
      .force("charge", d3.forceManyBody().strength(chargeStrength)) // 노드 간 멀어지는 힘 (음수)
      .force("center", d3.forceCenter(width / 2, height / 2)) // 화면 중앙 정렬
      .force(
        // 노드끼리 겹치지 않도록
        "collid",
        d3.forceCollide((d) => convertingNodeSize(d, nodeSpacing))
      );

    // simulation 저장 (resize 시 화면 중앙 정렬 위함)
    simulationRef.current = simulation;

    // 링크 설정
    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "var(--peak-900)") //"#cfa7fa"
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
      )
      .on("click", (_, d) => {
        // 홈페이지가 있으면 홈페이지로 연결
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

    // 노드 속성 설정
    node
      .append("circle")
      .attr("class", "node")
      .attr("r", (d) => convertingNodeSize(d, nodeSize))
      .attr("stroke", (d) => {
        if (d.isNew) return "#a24bff";
        return "var(--peak-200)";
      })
      .attr("stroke-width", 1)
      .attr("fill", (d) => {
        if (d.id === 1) return "var(--peak-900)"; //"var(--peak-900)";
        if (d.isNew) return "#a24bff";
        return "#FFF";
      })
      .style("cursor", "pointer");

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
      .attr("r", (d) => convertingNodeSize(d, nodeSpacing))
      .attr("cx", 0)
      .attr("cy", 0);

    node
      .append("image")
      .attr("xlink:href", (d) => d.logo_url || "")
      .attr("width", (d) => convertingNodeSize(d, nodeSpacing))
      .attr("height", (d) => convertingNodeSize(d, nodeSpacing))
      .attr("x", (d) => {
        const size = convertingNodeSize(d, nodeSpacing);
        return -size / 2;
      })
      .attr("y", (d) => {
        const size = convertingNodeSize(d, nodeSpacing);
        return -size / 2;
      })
      .attr("clip-path", (d) => `url(#clip-${d.id})`);

    // Peak 로고 추가
    node
      .filter((d) => d.id === 1)
      .append("image")
      .attr("href", "/PEAK-simple-logo.svg")
      .attr("width", (d) => convertingNodeSize(d, nodeSpacing))
      .attr("height", (d) => convertingNodeSize(d, nodeSpacing))
      .attr("x", (d) => {
        const size = convertingNodeSize(d, nodeSpacing);
        return -size / 2;
      })
      .attr("y", (d) => {
        const size = convertingNodeSize(d, nodeSpacing);
        return -size / 2;
      })
      .attr("clip-path", (d) => `url(#clip-${d.id})`);

    // 노드에 텍스트 추가 (Peak 또는 추가된 기업)
    node
      .filter((d) => !!d.isNew)
      .append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .attr("fill", () => {
        // if (d.isNew) return "#420c7c";
        // return "white";
        return "#FFF";
      })
      .attr("font-size", "10px")
      .text((d) => d.company);

    // 물리 법칙 적용시 매 프레임마다 실행되는 이벤트
    simulation.on("tick", () => {
      link
        .attr("x1", (d: Link) => d.source.x as number)
        .attr("y1", (d: Link) => d.source.y as number)
        .attr("x2", (d: Link) => d.target.x as number)
        .attr("y2", (d: Link) => d.target.y as number);
      // 노드 위치 설정 (d.x, d.y)로
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // // Peak를 중앙에 놓기
    // setPeakCenter({ width, height });

    // 노드 드래그 이벤트 관련 함수들
    function dragstart(event: DragEventType, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart(); // 물리 엔진 활성화, 0.3: 업데이트 시간
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: Node, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragend(event: DragEventType, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  // // Peak를 중앙에 놓기
  // const setPeakCenter = ({ width, height }: Size) => {
  //   if (simulationRef.current) {
  //     simulationRef.current.nodes().forEach((node) => {
  //       if (node.id === 1) {
  //         node.fx = width / 2;
  //         node.fy = height / 2;
  //       }
  //     });

  //     simulationRef.current
  //       .force("center", d3.forceCenter(width / 2, height / 2))
  //       .restart();
  //   }
  // };

  useEffect(() => {
    if (!svgRef.current) return;

    // 기존 simulation이 있을 경우 중지하고 다시 실행
    d3.select(svgRef.current).selectAll("*").remove();

    createGraph({ width, height });
  }, [nodes, width, height]);

  const handleNode = (mode: "new" | "reset", company?: string) => {
    if (mode === "new") {
      if (nodes.length >= 302) {
        alert("기존 데이터를 삭제해주세요.");
        return;
      }

      if (company) {
        const newNode: Node = {
          id: 302,
          company,
          key_executive: "",
          industry: "",
          address: "",
          homepage: "",
          email: "정보 없음",
          phone_number: "",
          sales: "정보 없음",
          total_funding: "정보 없음",
          isNew: true,
        };

        setNodes((prevNodes) => {
          const updatedNodes = [...prevNodes, newNode];

          setLinks((prevLinks) => [
            ...prevLinks,
            { source: updatedNodes[0], target: newNode },
          ]);

          return updatedNodes;
        });
        console.log("노드를 추가했습니다.");
      }
    }
    if (mode === "reset") {
      setNodes(totalData);
      setLinks(INITIAL_LINKS);
    }
  };

  return (
    <div className="w-screen h-screen bg-black relative">
      <svg ref={svgRef}></svg>
      <CompanyProfileForm handleNode={handleNode} />
    </div>
  );
};

export default NetworkGraph;
