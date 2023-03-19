import { Button, Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FormCustom } from "./FormCustom";
import { DropdownWithFreeText } from "./DropdownWithFreeText";
import { Node } from "neo4j-driver";
import { sortList } from "../utils/graphLib";

interface Props {
  onSubmit: (name: string, label: string) => void;
  nodes: Node[];
}

export const NewNode: React.FC<Props> = ({ onSubmit, nodes }) => {
  const [nodeName, setNodeName] = useState("");
  const [nodeLabel, setNodeLabel] = useState("");

  const allLabels = nodes.map((node) => node.labels[0]);
  const uniqueLabels = new Set(allLabels);
  const labels = sortList(Array.from(uniqueLabels));

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
        labelArray={labels}
        setValue={(s) => setNodeLabel(s)}
      />

      {nodeName && nodeLabel ? (
        <Button onClick={() => onSubmit(nodeName, nodeLabel)}>Create!</Button>
      ) : null}
    </Container>
  );
};
