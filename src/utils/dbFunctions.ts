import { Driver, Node, Relationship } from "neo4j-driver-core";

export const getPersonList = async (driver) => {
  const query = "MATCH (n) RETURN n";
  const result = await dbQuery(driver, query);
  const data: Node[] = result?.records.map((r) => r.get("n")) || [];
  return data;
};

export const getRelationshipList = async (driver: Driver) => {
  const query = "MATCH ()-[r]->() RETURN r";
  const result = await dbQuery(driver, query);
  const data: Relationship[] = result?.records.map((r) => r.get("r")) || [];
  return data;
};

const dbQuery = async (driver: Driver, query) => {
  const session = driver.session();

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

// @TODO: possible refactor
export const createPerson = async (driver: Driver, personName: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "CREATE (p:Person {name: $name}) RETURN p",
      { name: personName }
    );
    const createdNode = result.records[0].get("p").properties;
    console.log("person was created: ", createdNode);
  } catch (error) {
    console.error("Error creating node", error);
  } finally {
    session.close();
  }
};

export const createRelationship = async (
  driver: Driver,
  from: Node,
  to: Node,
  relationship: string
) => {
  const session = driver.session();

  const vars = {
    labelFrom: from.labels[0],
    nameFrom: from.properties?.name,
    labelTo: to.labels[0],
    nameTo: to.properties?.name,
    relType: relationship,
  };

  const query = `MATCH (p:${vars.labelFrom} {name: '${vars.nameFrom}'}), (m:${vars.labelTo} {name: '${vars.nameTo}'}) CREATE (p)-[:${vars.relType}]->(m)`;

  try {
    console.log("running query, ", query);
    const result = await session.run(query);
    // const createdNode = result.records[0].get("p").properties;
    console.log("relationship created");
  } catch (error) {
    console.error("Error creating node", error);
  } finally {
    session.close();
  }
};
