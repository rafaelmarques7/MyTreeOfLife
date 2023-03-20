import React from "react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Text, Flex, Container } from "@chakra-ui/react";
import { GraphElement } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../hooks";
import { handleRemoveFromSelection } from "../state/actions";

interface Props {
  selectedElements: GraphElement[];
}

export const SelectionList: React.FC<Props> = ({ selectedElements }) => {
  return (
    <Flex alignItems={"center"} direction="column" pt={3}>
      <Container borderBottom={"1px solid black"}>
        <Text textAlign={"center"}>Selected elements:</Text>
      </Container>
      {selectedElements.map((el) => (
        <SelectionListItem el={el} key={uuidv4()} />
      ))}
    </Flex>
  );
};

export const SelectionListItem: React.FC<{ el: GraphElement }> = ({ el }) => {
  const dispatch = useAppDispatch();

  return (
    <Flex w={"100%"} alignItems={"center"} justifyContent="space-between">
      <Text fontSize={"sm"} p="1">
        {el.label}
      </Text>
      <SmallCloseIcon onClick={() => dispatch(handleRemoveFromSelection(el))} />
    </Flex>
  );
};
