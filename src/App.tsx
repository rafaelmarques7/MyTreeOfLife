import React, { useState, useEffect, useMemo } from "react";
import neo4j, { Node, Relationship } from "neo4j-driver";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
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
  getNodeLabel,
  getNodesLabels,
  getRelationshionLabel,
  getRelationshionLabels,
} from "./utils/graphLib";
import { NewRelationshipForm } from "./components/NewRelationshipForm";
import { NewNode } from "./components/NewNode";
import { NetworkGraph } from "./components/MyGraph";
import { ListWithDelete } from "./components/ListWithDelete";
import { DeleteButtonWithModal } from "./components/DeleteButtonWithModal";
import { ButtonNewNode } from "./components/ButtonNewNode";
import { LabelInfo } from "./interfaces";

const driver = neo4j.driver(
  env.REACT_APP_NEO_CONN_STRING,
  neo4j.auth.basic("neo4j", env.REACT_APP_NEO_PASSWORD)
);

function App() {
  const [nodeList, setNodeList] = useState<Node[]>([]);
  const [relationshipList, setRelationShipList] = useState<Relationship[]>([]);

  // set current selection of node or edge
  // takes an elementId
  const [selectionType, setSelectionType] = useState("");
  const [selectionLabel, setSelectionLabel] = useState<LabelInfo>();

  const dataGraph = convertNeoToVis(nodeList, relationshipList);

  // const dataGraph = useMemo(() => {
  //   const data = convertNeoToVis(nodeList, relationshipList);
  //   return data;
  // }, [nodeList, relationshipList]);

  console.log("rendering app", {
    nodeList,
    relationshipList,
    dataGraph,
    selectionType,
    selectionLabel,
  });

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

  const onCreateNodes = async (nodeNames: string[], nodeLabel: string) => {
    console.log("create nodes was clicked", nodeNames, nodeLabel);

    await createNewNodes(driver, nodeNames, nodeLabel);
    setNodeList(await getNodeList(driver)); // force refresh
  };

  const onGraphClick = (params) => {
    console.log("onGraphClick", params);

    const nodeId = params?.nodes[0];
    if (nodeId) {
      const node = nodeList.filter((n) => n.elementId === nodeId)[0];
      const label = getNodeLabel(node);

      setSelectionLabel(label);
      setSelectionType("node");
    }

    const edgeId = params?.edges[0];
    if (edgeId) {
      const edge = dataGraph.edges.filter((n) => n?.id === edgeId)[0];
      const relationship = relationshipList.filter(
        (r) =>
          r.startNodeElementId === edge.from &&
          r.endNodeElementId === edge.to &&
          r.type === edge.label
      )[0];
      const label = getRelationshionLabel(relationship, nodeList);

      setSelectionLabel(label);
      setSelectionType("edge");
    }
  };

  const onDeleteSelection = async () => {
    console.log("onDeleteSelection");

    if (selectionType === "node") {
      const node = nodeList.filter(
        (n) => n.elementId === selectionLabel?.elementId
      )[0];

      deleteNode(driver, node);
    }

    if (selectionType === "edge") {
      const relationship = relationshipList.filter(
        (n) => n?.elementId === selectionLabel?.elementId
      )[0];
      const nodeFrom = nodeList.filter(
        (n) => n.elementId === relationship.startNodeElementId
      )[0];
      const nodeTo = nodeList.filter(
        (n) => n.elementId === relationship.endNodeElementId
      )[0];

      deleteRelationship(driver, relationship, nodeFrom, nodeTo);
    }

    setNodeList(await getNodeList(driver)); // force refresh
    setRelationShipList(await getRelationshipList(driver)); // force refresh
  };

  return (
    <Flex direction={"column"}>
      <Header />
      <Flex bg="gray.200">
        <NetworkGraph data={dataGraph} onNodeClick={onGraphClick} />

        <Flex position="absolute" top={"7vh"} right={1} direction="column">
          <Flex alignItems={"center"}>
            <Text>{`Selection: ${selectionLabel?.label}`}</Text>
            <DeleteButtonWithModal
              onDelete={onDeleteSelection}
              modalBody={`Are you sure you want to delete ${selectionLabel?.label}? `}
            />
          </Flex>
          <ButtonNewNode nodes={nodeList} onSubmit={onCreateNodes} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
