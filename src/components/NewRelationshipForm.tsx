import { Button, Container, Select, Text } from "@chakra-ui/react";
import { Node, Relationship } from "neo4j-driver";
import { useState } from "react";
import { DropdownWithFreeText } from "./DropdownWithFreeText";

interface Props {
  nodes: Node[];
  relationshipList: Relationship[];
  onSubmit: (from, to, relationship) => void;
}

export const NewRelationshipForm: React.FC<Props> = ({
  nodes,
  relationshipList,
  onSubmit,
}) => {
  const [from, setFrom] = useState<Node>();
  const [to, setTo] = useState<Node>();
  const [relationship, setRelationship] = useState<string>("");

  const labels = relationshipList.map((r) => r.type);
  const uniqueLabels = new Set(labels);

  const handleFromSubmit = (event) => {
    const elementId = event.target.value;
    const node = nodes.filter((n) => n.elementId === elementId)[0];
    console.log(elementId, node);

    setFrom(node);
  };

  const handleToSubmit = (event) => {
    const elementId = event.target.value;
    const node = nodes.filter((n) => n.elementId === elementId)[0];
    setTo(node);
  };

  return (
    <Container maxW="xl">
      <Text fontWeight={"bold"}>Create a new Relationship:</Text>
      <DropdownNodes
        label={from ? from?.properties?.name : "From"}
        nodes={nodes}
        value={from?.properties?.name}
        onChange={(e) => handleFromSubmit(e)}
      />
      <DropdownNodes
        label={to ? to?.properties?.name : "To"}
        nodes={nodes}
        value={to?.properties?.name}
        onChange={handleToSubmit}
      />
      <DropdownWithFreeText
        label="Relationship Type"
        labelArray={uniqueLabels}
        setValue={(s) => setRelationship(s)}
      />
      {from && to && relationship ? (
        <Button onClick={() => onSubmit(from, to, relationship)}>
          Create!
        </Button>
      ) : null}
    </Container>
  );
};

const DropdownNodes = ({ label, nodes, value, onChange }) => {
  return (
    <Select
      maxW={"500px"}
      placeholder={label}
      value={value}
      onChange={onChange}
    >
      {nodes.map((node) => {
        const label = node.properties?.name;
        return (
          <option key={`dropdown-${label}`} value={node.elementId}>
            {label}
          </option>
        );
      })}
    </Select>
  );
};
