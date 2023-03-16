# React App for Graph DB with CRUD and visualizations

This app uses a Neo4j Graph database, and allows the user to manipulate the database using commands input through the UI, built in React.

<img src="./public/ui.png" alt="alt text" width="600"/>

## Description

- `Neo4j` for graph database
- `React` with `ChakraUI`
- `TypeScript`
- `react-graph-vis` for graph visualization

## Connection to neo4j

- Connection to Neo4j requires the `.env` variables to be set (see [env.ts](./src/env.ts) file)
- This app can run without a connection to Neo4j. In this case, it uses some dummy data.
