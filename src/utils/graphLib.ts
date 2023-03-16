import { PersonNode } from "../interfaces";

export const convertNeoToVis = (personList: PersonNode[]) => {
  const nodes = personList.map((p, i) => ({
    id: i + 1,
    label: p["name"],
    title: p["name"],
  }));

  const edges = nodes.map((node, i) => ({
    from: 1,
    to: node.id,
    label: i % 2 ? "a" : "b",
  }));

  const graph = {
    nodes,
    edges,
  };

  return graph;
};
