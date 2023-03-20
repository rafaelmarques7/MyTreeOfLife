import { Driver, Node } from "neo4j-driver";
import { EventGraphClick, GraphElement } from "../interfaces";
import {
  createNewNodes,
  deleteNode,
  deleteNodes,
  queryAllElements,
  queryNodeList,
} from "../utils/dbFunctions";
import { convertNeoToVis } from "../utils/graphLib";
import { extractEdgeFromGraph, extractNodeFromGraph } from "./helpers";
import { StateApp } from "./reducers";

export const addNode = (nodeNames: string[], label: string) => {
  return async (dispatch, getState) => {
    const driver = getState().driver;

    const res = await createNewNodes(driver, nodeNames, label);
    const nodeList: Node[] = res?.records.map((r) => r.get("nodes"))[0] || [];

    dispatch({ type: "SET_NODE_LIST", payload: nodeList });
    dispatch(getAllElements());
  };
};

export const getNodeList = (driver: Driver) => {
  return async (dispatch) => {
    const nodeList = await queryNodeList(driver);

    dispatch({ type: "SET_NODE_LIST", payload: nodeList });
  };
};

export const getAllElements = () => {
  return async (dispatch, getState) => {
    const driver = getState().driver;

    const { nodeList, relationshipList } = await queryAllElements(driver);
    const dataGraph = convertNeoToVis(nodeList, relationshipList);

    dispatch({ type: "SET_NODE_LIST", payload: nodeList });
    dispatch({ type: "SET_RELATIONSHIP_LIST", payload: relationshipList });
    dispatch({ type: "SET_DATA_GRAPH", payload: dataGraph });
  };
};

export const handleGraphClick = (event: EventGraphClick) => {
  return async (dispatch, getState) => {
    console.log("handleGraphClick", event);

    const isRelevantClick = event.nodes.length > 0 || event.edges.length > 0;
    if (!isRelevantClick) return () => {};

    const { nodeList, relationshipList, dataGraph, selectedElements } =
      getState() as StateApp;

    const elementType = event.nodes.length > 0 ? "node" : "relationship";

    const element =
      elementType === "node"
        ? extractNodeFromGraph(event, nodeList)
        : extractEdgeFromGraph(event, dataGraph, relationshipList, nodeList);

    // check if element exists and don't re-add it if it does
    const elementExists = selectedElements.some(
      (se) => se?.elementId === element?.elementId
    );

    if (!elementExists) {
      dispatch({
        type: "SET_SELECTED_ELEMENTS",
        payload: [...selectedElements, element],
      });
    } else {
      console.log("element already exists in selectedElements");
    }
  };
};

export const handleDeleteSelection = () => {
  return async (dispatch, getState) => {
    const { driver, selectedElements, nodeList } = getState() as StateApp;
    console.log("selectedElements", selectedElements);

    // extract the nodes and relationships from the selected elements
    const nodesToDelete = selectedElements.map((e) =>
      nodeList.find((n) => n.elementId === e.elementId)
    ) as unknown as Node[];
    // const relationshipsToDelete = selectedElements.filter(
    // (e) => {
    // co
    // });
    //
    await deleteNodes(driver, nodesToDelete);
    dispatch({ type: "SET_SELECTED_ELEMENTS", payload: [] });
    dispatch(getAllElements());
  };
};

export const handleRemoveFromSelection = (element: GraphElement) => {
  return async (dispatch, getState) => {
    const { selectedElements } = getState() as StateApp;

    const newSelectedElements = selectedElements.filter(
      (el) => el.elementId !== element.elementId
    );

    dispatch({ type: "SET_SELECTED_ELEMENTS", payload: newSelectedElements });
    dispatch(getAllElements());
  };
};
