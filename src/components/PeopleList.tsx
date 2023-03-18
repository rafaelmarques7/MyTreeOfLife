import { Node } from "neo4j-driver";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Text,
  List,
  ListItem,
  Container,
} from "@chakra-ui/react";

interface Props {
  data: Node[];
  onDelete: (index: number) => void;
}

export const PersonList: React.FC<Props> = ({ data, onDelete }) => {
  return (
    <Container>
      <Text borderBottom="1px solid black" fontWeight={"bold"}>
        Nodes
      </Text>

      <Box ml="3">
        <List spacing={1} alignItems="center">
          {data.map((item, index) => (
            <Flex alignItems="center" justifyContent="center">
              <ListItem key={`list-item-${index}`}>
                {`${item.properties?.name} (${item.labels[0]})`}
              </ListItem>
              <Flex flexGrow={1} justifyContent="flex-end">
                <DeleteButtonWithModal
                  onDelete={() => onDelete(index)}
                  index={index}
                />
              </Flex>
            </Flex>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export function DeleteButtonWithModal({ onDelete, index }) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const onDeleteConfirmed = () => {
    onDelete(index);
    setIsOpen(false);
  };

  return (
    <>
      <SmallCloseIcon
        color="red.500"
        boxSize="5"
        onClick={() => setIsOpen(true)}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this item?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" ml={3} onClick={onDeleteConfirmed}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
