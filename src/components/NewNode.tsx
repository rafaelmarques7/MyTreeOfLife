import {
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FormCustom } from "./FormCustom";
import { DropdownWithFreeText } from "./DropdownWithFreeText";
import { Node, Relationship } from "neo4j-driver";

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
      <Text>Create new Node</Text>

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
