import { Button, Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FormCustom } from "./FormCustom";
import { DropdownWithFreeText } from "./DropdownWithFreeText";
import { Node } from "neo4j-driver";

interface Props {
  onSubmit: (name: string, label: string) => void;
  nodes: Node[];
}

export const NewNode: React.FC<Props> = ({ onSubmit, nodes }) => {
  const [nodeName, setNodeName] = useState("");
  const [nodeLabel, setNodeLabel] = useState("");

  const labels = nodes.map((node) => node.labels[0]);
  const uniqueLabels = new Set(labels);

  return (
    <Container maxW="xl">
      <Text fontWeight={"bold"}>Create a new Node:</Text>

      <FormCustom
        label="Node name"
        value={nodeName}
        setValue={setNodeName}
        onSubmit={() => {}}
      />

      <DropdownWithFreeText
        label="Node label (Person, Movie, Company, etc.)"
        labelArray={uniqueLabels}
        setValue={(s) => setNodeLabel(s)}
      />

      {nodeName && nodeLabel ? (
        <Button onClick={() => onSubmit(nodeName, nodeLabel)}>Create!</Button>
      ) : null}
    </Container>
  );
};
