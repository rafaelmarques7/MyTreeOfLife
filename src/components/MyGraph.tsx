import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { GraphData, GraphElement } from "../interfaces";

interface PropsNetworkGraph {
  data: GraphData;
  selectedElements: GraphElement[];
  onNodeClick?: (params) => void;
}

const MyGraph: React.FC<PropsNetworkGraph> = ({
  data,
  selectedElements,
  onNodeClick = () => {},
}) => {
  console.log("inside my graph", { data, selectedElements });
  const container = useRef(null);

  const { nodes, edges } = data;
  const options = {};

  useEffect(() => {
    console.log("inside use effect", { data, selectedElements });

    let network;
    if (container.current) {
      // @ts-ignore
      network = new Network(container.current, { nodes, edges }, options);
    }

    network?.on("click", function (params) {
      onNodeClick(params);
    });
  }, [data, selectedElements]);

  return <div ref={container} style={{ height: "93vh", width: "100vh" }} />;
};

export const NetworkGraph = React.memo(MyGraph);
