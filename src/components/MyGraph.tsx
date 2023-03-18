import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

export const NetworkGraph = ({ data }) => {
  const container = useRef(null);

  const { nodes, edges } = data;
  const options = {};

  useEffect(() => {
    const network =
      container.current &&
      new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} style={{ height: "700px", width: "900px" }} />;
};
