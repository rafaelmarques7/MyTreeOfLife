import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
// import { mockPersonList, mockRelationshipList } from "./__mocks__/neo4j";
import { env } from "./env";
import { deleteNode, deleteRelationship } from "./utils/dbFunctions";
import { Header } from "./components/Header";
import { getNodeLabel, getRelationshionLabel } from "./utils/graphLib";
import { NetworkGraph } from "./components/MyGraph";
import { DeleteButtonWithModal } from "./components/DeleteButtonWithModal";
import { ButtonNewNode } from "./components/ButtonNewNode";
import { LabelInfo } from "./interfaces";
import { useSelector } from "react-redux";
import { RootState, StateApp } from "./state/reducers";
import {
  addNode,
  getAllElements,
  handleDeleteSelection,
  handleGraphClick,
} from "./state/actions";
import { useAppDispatch } from "./hooks";
import { SelectionList } from "./components/SelectionList";

function App() {
  const dispatch = useAppDispatch();

  const { nodeList, relationshipList, dataGraph, selectedElements } =
    useSelector((state: StateApp) => state);

  console.log("rendering app", {
    nodeList,
    relationshipList,
    dataGraph,
  });

  useEffect(() => {
    async function loadInitialData() {
      dispatch(getAllElements());
    }

    if (env.REACT_APP_USE_NEO_DB) {
      loadInitialData();
    } else {
      console.log("initialising graph with mock data");
    }
  }, []);

  return (
    <Flex direction={"column"}>
      <Header />
      <Flex bg="gray.200">
        <NetworkGraph
          data={dataGraph}
          onNodeClick={(event) => dispatch(handleGraphClick(event))}
        />

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
          <ButtonNewNode
            nodes={nodeList}
            onSubmit={(names, label) => dispatch(addNode(names, label))}
          />
          <SelectionList selectedElements={selectedElements} />

          {selectedElements.length > 0 ? (
            <Button
              colorScheme="red"
              onClick={() => dispatch(handleDeleteSelection())}
            >
              Delete
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
