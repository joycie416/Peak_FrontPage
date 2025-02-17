'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }: { data: number[] }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 200;
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'aqua')
      .style('overflow', 'visible');

    const xScale = d3
      .scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, width])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([height, 0]);

    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (_, i) => xScale(i.toString())!) // ! 이 값은 절대 null/undefined 가 아님을 ts 에게 알려줌
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d))
      .attr('fill', 'pink');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
