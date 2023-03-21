import { Button, Container, Flex, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { enumUserAction } from "../interfaces";
import {
  addNode,
  // getAllElements,
  // handleDeleteSelection,
  handleSetActionType,
} from "../state/actions";
import { StateApp } from "../state/reducers";
import { ButtonNewNode } from "./ButtonNewNode";
import { SelectionList } from "./SelectionList";

export const ActionContainer: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const { nodeList, currentAction } = useAppSelector(
    (state: StateApp) => state
  );

  const showButtonNewNode = currentAction === enumUserAction.none;
  const showButtonCancel = currentAction !== enumUserAction.none;
  const showButtonCreateRel =
    currentAction === enumUserAction.none ||
    currentAction === enumUserAction.createRelationships;
  const showButtonDelNodes =
    currentAction === enumUserAction.none ||
    currentAction === enumUserAction.deleteNodes;
  const showbuttonDelRel =
    currentAction === enumUserAction.none ||
    currentAction === enumUserAction.deleteRelationships;

  return (
    <Flex
      position="absolute"
      top={"5vh"}
      right={1}
      direction="column"
      width={"15vw"}
      bg="gray.100"
      boxShadow="md"
      padding="1em"
      borderRadius={"md"}
    >
      <VStack spacing={3}>
        {showButtonCancel && (
          <Button
            colorScheme="red"
            onClick={() => dispatch(handleSetActionType(enumUserAction.none))}
          >
            Cancel
          </Button>
        )}

        <SelectionList />

        {showButtonNewNode && (
          <ButtonNewNode
            nodes={nodeList}
            onSubmit={(names, label) => dispatch(addNode(names, label))}
          />
        )}
        {showButtonDelNodes && (
          <Button
            colorScheme="red"
            onClick={() =>
              dispatch(handleSetActionType(enumUserAction.deleteNodes))
            }
          >
            Delete nodes
          </Button>
        )}

        {showButtonCreateRel && (
          <Button
            colorScheme="green"
            onClick={() =>
              dispatch(handleSetActionType(enumUserAction.createRelationships))
            }
          >
            Create Relationships
          </Button>
        )}

        {showbuttonDelRel && (
          <Button
            colorScheme="red"
            onClick={() =>
              dispatch(handleSetActionType(enumUserAction.deleteRelationships))
            }
          >
            Delete Relationships
          </Button>
        )}
      </VStack>
    </Flex>
  );
};
