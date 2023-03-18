import React, { useState, useEffect } from "react";
import neo4j, { Node, Relationship } from "neo4j-driver";
import { Box, Flex } from "@chakra-ui/react";
// import { mockPersonList, mockRelationshipList } from "./__mocks__/neo4j";
import { env } from "./env";
import { PersonList } from "./components/PeopleList";
import {
  createPerson,
  createRelationship,
  getPersonList,
  getRelationshipList,
} from "./utils/dbFunctions";
import { Header } from "./components/Header";
import { GraphCustom } from "./components/GraphCustom";
import { FormCustom } from "./components/FormCustom";
import { convertNeoToVis } from "./utils/graphLib";
import { NewRelationshipForm } from "./components/NewRelationshipForm";

const driver = neo4j.driver(
  env.REACT_APP_NEO_CONN_STRING,
  neo4j.auth.basic("neo4j", env.REACT_APP_NEO_PASSWORD)
);

function App() {
  const [personList, setPersonList] = useState<Node[]>([]);
  const [relationshipList, setRelationShipList] = useState<Relationship[]>([]);
  const [newPersonName, setNewPersonName] = useState("");

  const dataGraph = convertNeoToVis(personList, relationshipList);

  console.log("rendering app", { personList, relationshipList, dataGraph });

  useEffect(() => {
    async function loadInitialData() {
      setPersonList(await getPersonList(driver));
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

  const handleButtonClick = async () => {
    console.log("create person was clicked", newPersonName);

    await createPerson(driver, newPersonName);
    setNewPersonName("");
    setPersonList(await getPersonList(driver));
  };

  const onCreateNewRelationship = async (from, to, relationship) => {
    console.log("new relationship button was clicked", newPersonName);

    await createRelationship(driver, from, to, relationship);
    setRelationShipList(await getRelationshipList(driver));
  };

  return (
    <Flex direction={"column"}>
      <Header />
      <GraphCustom data={dataGraph} />
      <FormCustom
        label="Create new person"
        value={newPersonName}
        setValue={setNewPersonName}
        onSubmit={handleButtonClick}
      />

      <NewRelationshipForm
        nodes={personList}
        relationshipList={relationshipList}
        onSubmit={(from, to, relationship) =>
          onCreateNewRelationship(from, to, relationship)
        }
      />

      <Box mt="10">{/* <PersonList data={personList} /> */}</Box>
    </Flex>
  );
}

export default App;
