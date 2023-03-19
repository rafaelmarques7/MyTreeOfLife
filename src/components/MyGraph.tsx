import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { GraphData } from "../interfaces";

interface PropsNetworkGraph {
  data: GraphData;
  onNodeClick?: (params) => void;
}

const MyGraph: React.FC<PropsNetworkGraph> = ({
  data,
  onNodeClick = () => {},
}) => {
  const container = useRef(null);

  const { nodes, edges } = data;
  const options = {};

  useEffect(() => {
    let network;
    if (container.current) {
      network = new Network(container.current, { nodes, edges }, options);
    }

    network?.on("click", function (params) {
      onNodeClick(params);
    });
    // the line below makes the network re-render only when array sizes change
  }, [nodes.length, edges.length]);

  return <div ref={container} style={{ height: "93vh", width: "100vh" }} />;
};

export const NetworkGraph = React.memo(MyGraph);
