import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";
import { Box, Flex } from "@chakra-ui/react";
import { mockNodeArray } from "./__mocks__/neo4j";
import { env } from "./env";
import { PersonList } from "./components/PeopleList";
import { createPerson, getPersonList } from "./utils/dbFunctions";
import { Header } from "./components/Header";
import { GraphCustom } from "./components/GraphCustom";
import { NewPersonForm } from "./components/NewPersonForm";
import { convertNeoToVis } from "./utils/graphLib";

const driver = neo4j.driver(
  env.REACT_APP_NEO_CONN_STRING,
  neo4j.auth.basic("neo4j", env.REACT_APP_NEO_PASSWORD)
);

function App() {
  console.log("rendering app");

  const [personList, setPersonList] = useState<any>([]);
  const [newPersonName, setNewPersonName] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      const result = await getPersonList(driver);
      if (result) {
        setPersonList(result.records.map((r) => r.get("person")?.properties));
      }
    }

    if (env.REACT_APP_USE_NEO_DB) {
      loadInitialData();
    } else {
      console.log("initialising graph with mock data");
      setPersonList(mockNodeArray);
    }
  }, []);

  const handleButtonClick = async () => {
    console.log("create person was clicked", newPersonName);

    await createPerson(driver, newPersonName);
    setNewPersonName("");
    const result = await getPersonList(driver);
    if (result) {
      setPersonList(result.records.map((r) => r?.get("person")?.properties));
    }
  };

  const dataGraph = convertNeoToVis(personList);

  return (
    <Flex direction={"column"}>
      <Header />
      <GraphCustom data={dataGraph} />
      <NewPersonForm
        newPersonName={newPersonName}
        setNewPersonName={setNewPersonName}
        handleButtonClick={handleButtonClick}
      />

      <Box mt="10">
        <PersonList data={personList} />
      </Box>
    </Flex>
  );
}

export default App;
