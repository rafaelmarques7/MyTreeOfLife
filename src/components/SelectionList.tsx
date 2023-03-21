import React from "react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Text, Flex, Container } from "@chakra-ui/react";
import { GraphElement } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../hooks";
import { handleRemoveFromSelection } from "../state/actions";
import { StateApp } from "../state/reducers";
import { selectActionTitle } from "../state/helpers";

interface Props {
  // selectedElements: GraphElement[];
}

export const SelectionList: React.FC<Props> = ({}) => {
  // const dispatch = useAppDispatch();

  const { currentAction, selectedElements } = useAppSelector(
    (state: StateApp) => state
  );

  const title = selectActionTitle(currentAction);

  return (
    <Flex alignItems={"center"} direction="column" pt={3}>
      <Container>
        <Text textAlign={"center"}>{title}</Text>
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
