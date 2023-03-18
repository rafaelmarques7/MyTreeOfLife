import { Node } from "neo4j-driver";
import { Flex, Box, Text, List, ListItem, Container } from "@chakra-ui/react";
import { DeleteButtonWithModal } from "./DeleteButtonWithModal";

interface Props {
  listLabels: string[];
  onDelete: (index: number) => void;
}

export const ListWithDelete: React.FC<Props> = ({ listLabels, onDelete }) => {
  return (
    <Container>
      <Text borderBottom="1px solid black" fontWeight={"bold"}>
        Nodes
      </Text>

      <Box ml="3">
        <List spacing={1} alignItems="center">
          {listLabels.map((label, index) => (
            <Flex alignItems="center" justifyContent="center">
              <ListItem key={`list-item-${label}-${index}`}>{label} </ListItem>
              <Flex flexGrow={1} justifyContent="flex-end">
                <DeleteButtonWithModal
                  onDelete={() => onDelete(index)}
                  index={index}
                  modalTitle="Delete Node"
                  modalBody={`Are you sure you want to delete ${label}`}
                />
              </Flex>
            </Flex>
          ))}
        </List>
      </Box>
    </Container>
  );
};
