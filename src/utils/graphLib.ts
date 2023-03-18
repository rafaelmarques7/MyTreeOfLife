import { Node, Relationship } from "neo4j-driver";

export const convertNeoToVis = (nodesNeo: Node[], edgesNeo: Relationship[]) => {
  const nodes = nodesNeo.map((n) => ({
    id: n.elementId,
    label: n.properties?.name,
    title: n.properties?.name,
    // group: n.properties?.name?.match(/r /i) ? 1 : 2,
  }));

  const edges = edgesNeo.map((r) => ({
    from: r.startNodeElementId,
    to: r.endNodeElementId,
    label: r.type,
  }));

  const graph = {
    nodes,
    edges,
  };

  return graph;
};
