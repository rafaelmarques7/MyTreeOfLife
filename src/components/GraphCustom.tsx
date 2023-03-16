import Graph from "react-graph-vis";

interface Props {
  data: any;
}

export const GraphCustom: React.FC<Props> = ({ data }) => {
  const hasData = data.nodes && data.nodes.length > 0;

  return hasData ? (
    <Graph graph={data} options={options} events={events} />
  ) : (
    <p>No data to render</p>
  );
};

const options = {
  layout: {
    hierarchical: true,
  },
  edges: {
    width: 1.5,
    color: "black",
  },
  height: "500px",
  nodes: {
    shape: "dot",
    size: 20,
    font: {
      size: 14,
      color: "#000000",
    },
    borderWidth: 1,
    color: {
      border: "#000000",
      background: "#FFFFFF",
    },
  },
};

const events = {};
