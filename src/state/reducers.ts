import { Driver, Node, Relationship } from "neo4j-driver";
import { GraphData } from "../interfaces";
import {
  createNewNodes,
  getNodeList,
  instantiateNeoDriver,
  queryAllElements,
} from "../utils/dbFunctions";
import { convertNeoToVis } from "../utils/graphLib";

interface StateApp {
  nodeList: Node[];
  relationshipList: Relationship[];
  dataGraph: GraphData;
  driver: Driver | undefined;
}

const initialState: StateApp = {
  nodeList: [],
  relationshipList: [],
  dataGraph: convertNeoToVis([], []),
  driver: instantiateNeoDriver(),
};

export default function rootReducer(state: StateApp = initialState, action) {
  switch (action.type) {
    case "SET_NODE_LIST":
      return { ...state, nodeList: action.payload };
    case "SET_RELATIONSHIP_LIST":
      return { ...state, relationshipList: action.payload };
    case "SET_DATA_GRAPH":
      return { ...state, dataGraph: action.payload };
    default:
      return state;
  }
}

export type RootState = ReturnType<typeof rootReducer>;

export const addNode = (nodeNames: string[], label: string) => {
  return async (dispatch, getState) => {
    const driver = getState().driver;

    const res = await createNewNodes(driver, nodeNames, label);
    const nodeList: Node[] = res?.records.map((r) => r.get("nodes"))[0] || [];

    dispatch({ type: "SET_NODE_LIST", payload: nodeList });
    dispatch(getAllElementsDispatch());
  };
};

export const dispatchGetNodeList = (driver: Driver) => {
  return async (dispatch) => {
    const nodeList = await getNodeList(driver);

    dispatch({ type: "SET_NODE_LIST", payload: nodeList });
  };
};

export const getAllElementsDispatch = () => {
  return async (dispatch, getState) => {
    const driver = getState().driver;

    const { nodeList, relationshipList } = await queryAllElements(driver);
    const dataGraph = convertNeoToVis(nodeList, relationshipList);

    dispatch({ type: "SET_NODE_LIST", payload: nodeList });
    dispatch({ type: "SET_RELATIONSHIP_LIST", payload: relationshipList });
    dispatch({ type: "SET_DATA_GRAPH", payload: dataGraph });
  };
};
