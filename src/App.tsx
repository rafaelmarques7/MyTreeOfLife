import React, { useState, useEffect } from "react";
import neo4j, { Node, Relationship } from "neo4j-driver";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
// import { mockPersonList, mockRelationshipList } from "./__mocks__/neo4j";
import { env } from "./env";
import {
  createNewNodes,
  createNode,
  createRelationship,
  deleteNode,
  deleteRelationship,
  getNodeList,
  getRelationshipList,
} from "./utils/dbFunctions";
import { Header } from "./components/Header";
import {
  convertNeoToVis,
  getNodesLabels,
  getRelationshionLabels,
} from "./utils/graphLib";
import { NewRelationshipForm } from "./components/NewRelationshipForm";
import { NewNode } from "./components/NewNode";
import { NetworkGraph } from "./components/MyGraph";
import { ListWithDelete } from "./components/ListWithDelete";
import { DeleteButtonWithModal } from "./components/DeleteButtonWithModal";
import { ButtonNewNode } from "./components/ButtonNewNode";

const driver = neo4j.driver(
  env.REACT_APP_NEO_CONN_STRING,
  neo4j.auth.basic("neo4j", env.REACT_APP_NEO_PASSWORD)
);

function App() {
  const [nodeList, setNodeList] = useState<Node[]>([]);
  const [relationshipList, setRelationShipList] = useState<Relationship[]>([]);

  const dataGraph = convertNeoToVis(nodeList, relationshipList);

  console.log("rendering app", { nodeList, relationshipList, dataGraph });

  useEffect(() => {
    async function loadInitialData() {
      setNodeList(await getNodeList(driver));
      setRelationShipList(await getRelationshipList(driver));
    }

    if (env.REACT_APP_USE_NEO_DB) {
      loadInitialData();
    } else {
      console.log("initialising graph with mock data");
      // setNodeList(mockPersonList);
      // setRelationShipList(mockRelationshipList);
    }
  }, []);

  const onCreateNewNode = async (nodeName, nodeLabel) => {
    console.log("create node was clicked", nodeName, nodeName);

    await createNode(driver, nodeName, nodeLabel);
    setNodeList(await getNodeList(driver)); // force refresh
  };

  const onCreateNodes = async (nodeNames: string[], nodeLabel: string) => {
    console.log("create nodes was clicked", nodeNames, nodeLabel);

    await createNewNodes(driver, nodeNames, nodeLabel);
    setNodeList(await getNodeList(driver)); // force refresh
  };

  const onCreateNewRelationship = async (from, to, relationship) => {
    console.log("new relationship button was clicked", from, to, relationship);

    await createRelationship(driver, from, to, relationship);
    setRelationShipList(await getRelationshipList(driver)); // force refresh
  };

  const onDeleteNode = async (elementId: string) => {
    const matchingNodes = nodeList.filter((n) => n.elementId === elementId);
    await deleteNode(driver, matchingNodes[0]);

    setNodeList(await getNodeList(driver)); // force refresh
  };

  const onDeleteRelationship = async (elementId: string) => {
    console.log("delete relationship", elementId);
    const matchingRel = relationshipList.filter(
      (r) => r.elementId === elementId
    );
    const rel = matchingRel[0];
    const matchingFrom = nodeList.filter(
      (n) => n.elementId === rel.startNodeElementId
    );
    const matchingTo = nodeList.filter(
      (n) => n.elementId === rel.endNodeElementId
    );

    await deleteRelationship(driver, rel, matchingFrom[0], matchingTo[0]);
    setRelationShipList(await getRelationshipList(driver)); // force refresh
  };

  return (
    <Flex direction={"column"}>
      <Header />
      <Flex bg="gray.200">
        <NetworkGraph data={dataGraph} />
        <Flex position="absolute" top={"7vh"} right={1}>
          <ButtonNewNode nodes={nodeList} onSubmit={onCreateNodes} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
