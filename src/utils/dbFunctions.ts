import { Driver } from "neo4j-driver-core";

export const getPersonList = async (driver) => {
  const session = driver.session();

  const query = "MATCH (person:Person) RETURN person";
  try {
    console.log("making query to db: ", query);
    const res = await session.run(query);
    return res;
  } catch (error) {
    console.error("Error executing query", error);
  } finally {
    session.close();
  }
};

export const createPerson = async (driver: Driver, personName: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "CREATE (p:Person {name: $name}) RETURN p",
      { name: personName }
    );
    const createdNode = result.records[0].get("p").properties;
    console.log("person was created: ", createdNode); // the created node with its properties
  } catch (error) {
    console.error("Error creating node", error);
  } finally {
    session.close();
  }
};
