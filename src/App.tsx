import React, { useState, useEffect } from "react";
import neo4j, { Node, Relationship } from "neo4j-driver";
import { Box, Container, Flex } from "@chakra-ui/react";
// import { mockPersonList, mockRelationshipList } from "./__mocks__/neo4j";
import { env } from "./env";
import {
  createNode,
  createRelationship,
  deleteNode,
  getNodeList,
  getRelationshipList,
} from "./utils/dbFunctions";
import { Header } from "./components/Header";
import { convertNeoToVis, nodesToString } from "./utils/graphLib";
import { NewRelationshipForm } from "./components/NewRelationshipForm";
import { NewNode } from "./components/NewNode";
import { NetworkGraph } from "./components/MyGraph";
import { ListWithDelete } from "./components/ListWithDelete";

const driver = neo4j.driver(
  env.REACT_APP_NEO_CONN_STRING,
  neo4j.auth.basic("neo4j", env.REACT_APP_NEO_PASSWORD)
);

function App() {
  const [personList, setPersonList] = useState<Node[]>([]);
  const [relationshipList, setRelationShipList] = useState<Relationship[]>([]);

  const dataGraph = convertNeoToVis(personList, relationshipList);

  console.log("rendering app", { personList, relationshipList, dataGraph });

  useEffect(() => {
    async function loadInitialData() {
      setPersonList(await getNodeList(driver));
      setRelationShipList(await getRelationshipList(driver));
    }

    if (env.REACT_APP_USE_NEO_DB) {
      loadInitialData();
    } else {
      console.log("initialising graph with mock data");
      // setPersonList(mockPersonList);
      // setRelationShipList(mockRelationshipList);
    }
  }, []);

  const onCreateNewNode = async (nodeName, nodeLabel) => {
    console.log("create node was clicked", nodeName, nodeName);

    await createNode(driver, nodeName, nodeLabel);
    setPersonList(await getNodeList(driver)); // force refresh
  };

  const onCreateNewRelationship = async (from, to, relationship) => {
    console.log("new relationship button was clicked", from, to, relationship);

    await createRelationship(driver, from, to, relationship);
    setRelationShipList(await getRelationshipList(driver)); // force refresh
  };

  const onDeleteNode = async (index) => {
    console.log("delete", index);
    const node = personList[index];

    await deleteNode(driver, node);

    setPersonList(await getNodeList(driver)); // force refresh
  };

  return (
    <Flex direction={"column"}>
      <Header />

      <NetworkGraph data={dataGraph} />

      <NewNode
        onSubmit={onCreateNewNode}
        //@ts-ignore
        nodes={personList}
      />

      <Box m={2}></Box>

      <NewRelationshipForm
        nodes={personList}
        relationshipList={relationshipList}
        onSubmit={(from, to, relationship) =>
          onCreateNewRelationship(from, to, relationship)
        }
      />

      <Box mt="10">
        <ListWithDelete
          listLabels={nodesToString(personList)}
          onDelete={onDeleteNode}
        />
        {/* <ListWithDelete data={relationshipList} onDelete={onDeleteNode} /> */}
      </Box>
    </Flex>
  );
}

export default App;
