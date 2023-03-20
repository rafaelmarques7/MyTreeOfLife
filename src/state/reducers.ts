import { Driver, Node, Relationship } from "neo4j-driver";
import { GraphData, GraphElement } from "../interfaces";
import { instantiateNeoDriver } from "../utils/dbFunctions";
import { convertNeoToVis } from "../utils/graphLib";

export interface StateApp {
  nodeList: Node[];
  relationshipList: Relationship[];
  dataGraph: GraphData;
  driver: Driver;
  selectedElements: GraphElement[];
}

const initialState: StateApp = {
  nodeList: [],
  relationshipList: [],
  dataGraph: convertNeoToVis([], []),
  driver: instantiateNeoDriver(),
  selectedElements: [],
};

export default function rootReducer(state: StateApp = initialState, action) {
  switch (action.type) {
    case "SET_NODE_LIST":
      return { ...state, nodeList: action.payload };
    case "SET_RELATIONSHIP_LIST":
      return { ...state, relationshipList: action.payload };
    case "SET_DATA_GRAPH":
      return { ...state, dataGraph: action.payload };
    case "SET_SELECTED_ELEMENTS":
      return { ...state, selectedElements: action.payload };
    default:
      return state;
  }
}

export type RootState = ReturnType<typeof rootReducer>;
