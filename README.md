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

# Vis-netowrk

- nodes

  - `group` control coloring`
  - `value` control size

- edges
  - `value` controls width of edge

it is possible to fix nodes and edges, see:
http://127.0.0.1:58253/examples/network/edgeStyles/arrowAlignment

edge coloring and hiding (visibility toggle):
http://127.0.0.1:58253/examples/network/data/dynamicFiltering

node color and shapes:
http://127.0.0.1:58253/examples/network/edgeStyles/colors

its possible to react to click and drag events:
http://127.0.0.1:58253/examples/network/events/interactionEvents

html, including images, inside nodes
http://127.0.0.1:58253/examples/network/labels/multilineText
http://127.0.0.1:58253/examples/network/labels/labelMultifont
http://127.0.0.1:58253/examples/network/nodeStyles/circularImages

it event supports clusters of cluster, relevant for visualizing large networks:
http://127.0.0.1:58253/examples/network/other/clusteringByZoom

keyboard controls:
http://127.0.0.1:58253/examples/network/other/navigation

```
        var options = {
          interaction: {
            navigationButtons: false,
            keyboard: {
              speed: {x: 0.7, y:0.7}
            },
          },
        };
```

## ToDo's

Error handling and user warnings
