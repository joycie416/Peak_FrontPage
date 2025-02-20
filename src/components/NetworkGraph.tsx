'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: number;
  group: number;
}

interface Link {
  source: Node;
  target: Node;
}

const NetworkGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 800;

    const nodes: Node[] = [
      { id: 1, group: 1 },
      { id: 2, group: 2 },
      { id: 3, group: 2 },
      { id: 4, group: 2 },
      { id: 5, group: 2 },
      { id: 6, group: 2 },
      { id: 7, group: 2 },
      { id: 8, group: 2 },
      { id: 9, group: 2 },
      { id: 10, group: 2 },
      { id: 11, group: 2 },
      { id: 12, group: 2 },
      { id: 13, group: 2 },
      { id: 14, group: 2 },
      { id: 15, group: 2 },
    ];

    const links: Link[] = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[0], target: nodes[2] },
      { source: nodes[0], target: nodes[3] },
      { source: nodes[0], target: nodes[4] },
      { source: nodes[0], target: nodes[5] },
      { source: nodes[0], target: nodes[6] },
      { source: nodes[0], target: nodes[7] },
      { source: nodes[0], target: nodes[8] },
      { source: nodes[0], target: nodes[9] },
      { source: nodes[0], target: nodes[10] },
      { source: nodes[0], target: nodes[11] },
      { source: nodes[0], target: nodes[12] },
      { source: nodes[0], target: nodes[13] },
      { source: nodes[0], target: nodes[14] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[2], target: nodes[3] },
      { source: nodes[3], target: nodes[4] },
      { source: nodes[4], target: nodes[5] },
      { source: nodes[5], target: nodes[6] },
      { source: nodes[6], target: nodes[7] },
      { source: nodes[7], target: nodes[8] },
      { source: nodes[8], target: nodes[9] },
      { source: nodes[9], target: nodes[10] },
      { source: nodes[10], target: nodes[11] },
      { source: nodes[11], target: nodes[12] },
      { source: nodes[12], target: nodes[13] },
      { source: nodes[13], target: nodes[14] },
    ];

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid #340b60');

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: d3.SimulationNodeDatum) => (d as Node).id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', '#cfa7fa')
      .attr('stroke-width', 1);

    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 10)
      .attr('fill', (d) => (d.group === 1 ? '#420c7c' : '#a24bff'))
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on('start', dragstart)
          .on('drag', dragged)
          .on('end', dragend)
      );

    function dragstart(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragend(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // 노드와 링크에 대한 업데이트
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source && d.source.x != null ? d.source.x : 0)) // 기본값 0 설정
        .attr('y1', (d) => (d.source && d.source.y != null ? d.source.y : 0)) // 기본값 0 설정
        .attr('x2', (d) => (d.target && d.target.x != null ? d.target.x : 0)) // 기본값 0 설정
        .attr('y2', (d) => (d.target && d.target.y != null ? d.target.y : 0)); // 기본값 0 설정

      node
        .attr('cx', (d) => (d.x != null ? d.x : 0)) // null이 아닌 경우 값 사용, 기본값 0
        .attr('cy', (d) => (d.y != null ? d.y : 0)); // null이 아닌 경우 값 사용, 기본값 0
    });
  });

  return (
    <>
      <svg ref={svgRef}></svg>
      <p>- network graph -</p>
    </>
  );
};

export default NetworkGraph;
