import { Node, Relationship } from "neo4j-driver";
import {
  EdgeGraphData,
  GraphData,
  GraphElement,
  LabelInfo,
  NodeGraphData,
} from "../interfaces";

export const convertNeoToVis = (
  nodesNeo: Node[],
  edgesNeo: Relationship[],
  selectedElements: GraphElement[] = []
): GraphData => {
  const nodes: NodeGraphData[] = nodesNeo.map((n) => ({
    id: n.elementId,
    label: n.properties?.name,
    title: n.properties?.name,
    color: selectedElements.filter((e) => e.elementId === n.elementId)[0]
      ? "orange"
      : "white",
    group: n.properties?.name?.match(/r/i) ? 1 : 1,
  }));

  const edges: EdgeGraphData[] = edgesNeo.map((r) => ({
    from: r.startNodeElementId,
    to: r.endNodeElementId,
    label: r.type,
  }));

  const graph: GraphData = {
    nodes,
    edges,
  };

  return graph;
};

export const nodeToString = (node: Node) => {
  return `(${node.labels[0]}): ${node.properties?.name}`;
};

export function getNodeLabel(node: Node): LabelInfo {
  return {
    label: nodeToString(node),
    elementId: node.elementId,
  };
}

export function getNodesLabels(nodes: Node[], sort = true): LabelInfo[] {
  const labels = nodes.map((n) => getNodeLabel(n));
  if (sort) {
    return labels.sort((a, b) => a.label.localeCompare(b.label));
  }
  return labels;
}

export function getRelationshionLabel(
  rel: Relationship,
  nodes: Node[]
): LabelInfo {
  const type = rel.type;
  let [from, to] = ["", ""];
  nodes.forEach((n) => {
    if (n.elementId === rel.startNodeElementId) {
      from = n.properties?.name;
    }

    if (n.elementId === rel.endNodeElementId) {
      to = n.properties?.name;
    }
  });

  return {
    label: `${from} -> [${type}] -> ${to}`,
    elementId: rel.elementId,
  };
}

export const getRelationshionLabels = (
  relList: Relationship[],
  nodes: Node[],
  sort = true
): LabelInfo[] => {
  const relInfo = relList.map((rel) => getRelationshionLabel(rel, nodes));
  if (sort) {
    return relInfo.sort((a, b) => a.label.localeCompare(b.label));
  }
  return relInfo;
};

export const sortList = (list: string[]) =>
  list.sort((a, b) => a.localeCompare(b));
