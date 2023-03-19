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
    console.log("res: ", res);
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


export const createNewNodes = async (driver: Driver, nodeNames: string[], label: string) => {
  const nodes = nodeNames.map(name => `(:${label} {name: '${name}'})`);
  const query = `CREATE ${nodes.join(', ')}`;
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
  console.log(node);
  const query = `Match (p:${node.labels[0]} {name: '${node.properties.name}'}) Detach Delete p`;
  dbQuery(driver, query);
};

export const deleteRelationship = async (
  driver: Driver,
  relationship: Relationship,
  nodeFrom: Node,
  nodeTo: Node
) => {
  const query = `
    MATCH (p {name: '${nodeFrom.properties?.name}'})-[r:${relationship.type}]->(s {name: '${nodeTo.properties?.name}'})
    DELETE r`;
  dbQuery(driver, query);
};
