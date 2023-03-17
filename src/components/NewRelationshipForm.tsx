import { Button, Container, Select, Text } from "@chakra-ui/react";
import { Node } from "neo4j-driver";
import { useState } from "react";
import { FormCustom } from "./FormCustom";

interface Props {
  nodes: Node[];
  onSubmit?: (node) => void;
}

export const NewRelationshipForm: React.FC<Props> = ({ nodes, onSubmit }) => {
  const [from, setFrom] = useState<Node>();
  const [to, setTo] = useState<Node>();
  const [relationship, setRelationship] = useState("");

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

  const onCreate = () => {
    console.log({ from, to, relationship });
  };

  return (
    <Container maxW="xl">
      <Text>Create new Relationship</Text>
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
      <FormCustom
        label="Relationship Type"
        value={relationship}
        setValue={setRelationship}
        onSubmit={() => {}}
      />
      <Button>Create!</Button>
    </Container>
  );
};

const DropdownNodes = ({ label, nodes, value, onChange }) => {
  return (
    <Select placeholder={label} value={value} onChange={onChange}>
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
