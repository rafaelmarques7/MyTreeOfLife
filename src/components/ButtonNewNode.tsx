import { useState } from "react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FormCustom } from "./FormCustom";
import { DropdownWithFreeText } from "./DropdownWithFreeText";
import { Node } from "neo4j-driver";
import { sortList } from "../utils/graphLib";
import { ListWithDelete } from "./ListWithDelete";

interface Props {
  nodes: Node[];
  onSubmit?: (nodeNames: string[], label) => void;
  buttonLabel?: string;
  modalTitle?: string;
}

export const ButtonNewNode: React.FC<Props> = ({
  nodes,
  onSubmit = () => {},
  buttonLabel = "New node",
  modalTitle = "Create new node(s)",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const onCreateNodes = (nodeNames: string[], label: string) => {
    console.log("handleNodeCreate", nodeNames, label);

    onSubmit(nodeNames, label);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        bg="gray.500"
        textColor="white"
        fontWeight="bold"
      >
        {buttonLabel}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormNewNode
              nodes={nodes}
              onSubmit={(nodeNames, label) => onCreateNodes(nodeNames, label)}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

interface PropsFormNewNode {
  nodes: Node[];
  onSubmit: (nodeNames: string[], label: string) => void;
  onClose: () => void;
}

export const FormNewNode: React.FC<PropsFormNewNode> = ({
  nodes,
  onSubmit,
  onClose,
}) => {
  const [nodeNames, setNodesNames] = useState<string[]>([]);
  const [label, setLabel] = useState("");

  const allLabels = nodes.map((node) => node.labels[0]);
  const uniqueLabels = new Set(allLabels);
  const labels = sortList(Array.from(uniqueLabels));

  const onAddNode = (name) => {
    console.log("onAddNode", name);
    setNodesNames([...nodeNames, name]);
  };

  const onNodeDelete = (index) => {
    console.log("onDelete", index);
    setNodesNames(nodeNames.filter((_, i) => i !== index));
  };

  const onSetLabel = (label: string) => {
    console.log("onSetLabel", label);
    setLabel(label);
  };

  console.log(nodeNames, label);

  return (
    <>
      <FormSingleNode onSubmit={onAddNode} />

      {nodeNames.map((name, index) => {
        return (
          <Flex
            alignItems={"center"}
            key={index}
            justifyContent="space-between"
            p={"1em 1em 0 1em"}
          >
            <Text>{name}</Text>
            <SmallCloseIcon onClick={() => onNodeDelete(index)} />
          </Flex>
        );
      })}

      {nodeNames.length > 0 ? (
        <Flex direction={"column"} pt={10} pl={1}>
          <DropdownWithFreeText
            label="Label"
            labelArray={labels}
            setValue={(s) => onSetLabel(s)}
          />
        </Flex>
      ) : null}

      <ModalFooter>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          colorScheme="green"
          ml={3}
          onClick={() => onSubmit(nodeNames, label)}
        >
          Create
        </Button>
      </ModalFooter>
    </>
  );
};

interface PropsFormSingleNode {
  onSubmit: (name: string) => void;
}

export const FormSingleNode: React.FC<PropsFormSingleNode> = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (name: string) => {
    console.log("handleSubmit", name);

    onSubmit(name);
    setName("");
  };

  return (
    <>
      <FormCustom
        label="Name"
        value={name}
        setValue={setName}
        onSubmit={() => handleSubmit(name)}
      />
    </>
  );
};
