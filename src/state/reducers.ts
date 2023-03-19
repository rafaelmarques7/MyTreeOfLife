import { Driver, Node } from "neo4j-driver";
import { createNewNodes, getNodeList } from "../utils/dbFunctions";

interface StateApp {
  nodeList: Node[]
}

const initialState = {
  nodeList: []
};

export default function rootReducer(state: StateApp = initialState, action) {
  switch (action.type) {
    case 'SET_NODE_LIST':
      return { nodeList: action.payload?.nodeList };
    default:
      return state;
  }
}

export const addNode = (driver: Driver, nodeNames: string[], label: string) => {
  return async (dispatch) => {
    await createNewNodes(driver, nodeNames, label)
    const nodeList = await getNodeList(driver)

    dispatch({ type: 'SET_NODE_LIST', payload: { nodeList } });
  };
};