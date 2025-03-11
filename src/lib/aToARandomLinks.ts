import { totalData } from "@/constants/totalData";
import { Link } from "@/types/graph";

export const getA2ARandomLinks = () => {
  const nodes = [...totalData].splice(5);
  const centerNodes = nodes.slice(0, 8); // 상위 8개 노드를 중심으로 지정
  const otherNodes = nodes.slice(8); // 나머지 노드들

  // otherNodes를 36개씩 묶어서 그룹화
  const groupedOtherNodes = [];
  for (let i = 0; i < otherNodes.length; i += 36) {
    groupedOtherNodes.push(otherNodes.slice(i, i + 36));
  }

  const links: Link[] = [];
  groupedOtherNodes.forEach((group, idx) => {
    const centerNode = centerNodes[idx % centerNodes.length];

    group.forEach((node) => {
      links.push({ source: centerNode, target: node });
    });
  });

  for (let i = 0; i < 250; i++) {
    const RandomOtherNodes =
      groupedOtherNodes[Math.floor(Math.random() * groupedOtherNodes.length)]; // 그룹 노드에서 랜덤 노드들 선택
    const sourceNode =
      RandomOtherNodes[Math.floor(Math.random() * RandomOtherNodes.length)]; // 랜덤 노드들에서 노드 선택
    const centerNodeIdx = groupedOtherNodes.indexOf(RandomOtherNodes); // 현재 center 노드 idx

    const adjacentIndices: number[] = [];

    // 좌우 인접
    if (centerNodeIdx % 4 !== 0) adjacentIndices.push(centerNodeIdx - 1); // 왼쪽
    if (centerNodeIdx % 4 !== 3) adjacentIndices.push(centerNodeIdx + 1); // 오른쪽

    // 상하 인접
    if (centerNodeIdx - 4 >= 0) adjacentIndices.push(centerNodeIdx - 4); // 위쪽
    if (centerNodeIdx + 4 < centerNodes.length)
      adjacentIndices.push(centerNodeIdx + 4); // 아래쪽

    // 인접한 centerNode 중 랜덤 선택
    const targetNodeIdx =
      adjacentIndices[Math.floor(Math.random() * adjacentIndices.length)];
    const targetNode = centerNodes[targetNodeIdx];

    links.push({ source: sourceNode, target: targetNode });
  }

  return { nodes, centerNodes, links };
};
