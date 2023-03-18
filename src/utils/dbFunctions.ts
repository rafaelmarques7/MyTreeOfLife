import { Driver, Node, Relationship } from "neo4j-driver-core";

export const getNodeList = async (driver) => {
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

export const createNode = async (driver: Driver, nodeName, nodeLabel) => {
  const query = `CREATE (n:${nodeLabel} {name: '${nodeName}'}) RETURN n`;
  dbQuery(driver, query);
};

export const createRelationship = async (
  driver: Driver,
  from: Node,
  to: Node,
  relationship: string
) => {
  const vars = {
    labelFrom: from.labels[0],
    nameFrom: from.properties?.name,
    labelTo: to.labels[0],
    nameTo: to.properties?.name,
    relType: relationship,
  };

  const query = `MATCH (p:${vars.labelFrom} {name: '${vars.nameFrom}'}), (m:${vars.labelTo} {name: '${vars.nameTo}'}) CREATE (p)-[:${vars.relType}]->(m)`;
  dbQuery(driver, query);
};

export const deleteNode = async (driver: Driver, node: Node) => {
  const query = `Match (p:${node.labels[0]} {name: '${node.properties.name}'}) Detach Delete p`;
  dbQuery(driver, query);
};
