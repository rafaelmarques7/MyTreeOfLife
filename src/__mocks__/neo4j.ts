import { Node } from "neo4j-driver";

// export const list = [
//   {
//     identity: {
//       low: 0,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "new person",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:0",
//   },
//   {
//     identity: {
//       low: 23,
//       high: 0,
//     },
//     labels: ["Player"],
//     properties: {
//       name: "John Doe",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:23",
//   },
//   {
//     identity: {
//       low: 24,
//       high: 0,
//     },
//     labels: ["Team"],
//     properties: {
//       name: "New York Yankees",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:24",
//   },
//   {
//     identity: {
//       low: 27,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Rafael Marques",
//       dateOfBirth: {
//         year: {
//           low: 1994,
//           high: 0,
//         },
//         month: {
//           low: 6,
//           high: 0,
//         },
//         day: {
//           low: 8,
//           high: 0,
//         },
//       },
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//   },
//   {
//     identity: {
//       low: 28,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Luisa Marques",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:28",
//   },
//   {
//     identity: {
//       low: 29,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Claudio Marques",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:29",
//   },
//   {
//     identity: {
//       low: 32,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Miguel Seara",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:32",
//   },
//   {
//     identity: {
//       low: 33,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Joaquim Marques",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:33",
//   },
//   {
//     identity: {
//       low: 34,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Josh",
//       hobby: "wanking",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:34",
//   },
//   {
//     identity: {
//       low: 35,
//       high: 0,
//     },
//     labels: ["Company"],
//     properties: {
//       name: "AFonte",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:35",
//   },
//   {
//     identity: {
//       low: 36,
//       high: 0,
//     },
//     labels: ["Company"],
//     properties: {
//       name: "Accenture",
//       numberOfEmployees: {
//         low: 700000,
//         high: 0,
//       },
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:36",
//   },
//   {
//     identity: {
//       low: 43,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Diogo Silva",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:43",
//   },
//   {
//     identity: {
//       low: 44,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Margarida Gonçalves",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:44",
//   },
//   {
//     identity: {
//       low: 45,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Margarida Gonçalves 2",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:45",
//   },
//   {
//     identity: {
//       low: 46,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Margarida Gonçalves 3",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:46",
//   },
//   {
//     identity: {
//       low: 47,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Margarida Gonçalves 4",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:47",
//   },
//   {
//     identity: {
//       low: 54,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Jimmy McGill",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:54",
//   },
//   {
//     identity: {
//       low: 55,
//       high: 0,
//     },
//     labels: ["Person"],
//     properties: {
//       name: "Aaron Williams",
//     },
//     elementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:55",
//   },
// ];

// export const mockPersonList: Node[] = list.map((node) => {
//   const x = new Node(node.identity.low, node.labels, node.properties);

// });

// export const mockRelationshipList = [
//   {
//     identity: {
//       low: 6,
//       high: 0,
//     },
//     start: {
//       low: 23,
//       high: 0,
//     },
//     end: {
//       low: 24,
//       high: 0,
//     },
//     type: "PLAYS_FOR",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:6",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:23",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:24",
//   },
//   {
//     identity: {
//       low: 7,
//       high: 0,
//     },
//     start: {
//       low: 28,
//       high: 0,
//     },
//     end: {
//       low: 27,
//       high: 0,
//     },
//     type: "MotherOf",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:7",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:28",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//   },
//   {
//     identity: {
//       low: 8,
//       high: 0,
//     },
//     start: {
//       low: 28,
//       high: 0,
//     },
//     end: {
//       low: 29,
//       high: 0,
//     },
//     type: "MotherOf",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:8",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:28",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:29",
//   },
//   {
//     identity: {
//       low: 9,
//       high: 0,
//     },
//     start: {
//       low: 29,
//       high: 0,
//     },
//     end: {
//       low: 27,
//       high: 0,
//     },
//     type: "Brother",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:9",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:29",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//   },
//   {
//     identity: {
//       low: 10,
//       high: 0,
//     },
//     start: {
//       low: 27,
//       high: 0,
//     },
//     end: {
//       low: 29,
//       high: 0,
//     },
//     type: "Brother",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:10",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:29",
//   },
//   {
//     identity: {
//       low: 11,
//       high: 0,
//     },
//     start: {
//       low: 32,
//       high: 0,
//     },
//     end: {
//       low: 27,
//       high: 0,
//     },
//     type: "Friend",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:11",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:32",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//   },
//   {
//     identity: {
//       low: 12,
//       high: 0,
//     },
//     start: {
//       low: 27,
//       high: 0,
//     },
//     end: {
//       low: 32,
//       high: 0,
//     },
//     type: "Friend",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:12",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:32",
//   },
//   {
//     identity: {
//       low: 13,
//       high: 0,
//     },
//     start: {
//       low: 33,
//       high: 0,
//     },
//     end: {
//       low: 28,
//       high: 0,
//     },
//     type: "Husband",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:13",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:33",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:28",
//   },
//   {
//     identity: {
//       low: 14,
//       high: 0,
//     },
//     start: {
//       low: 28,
//       high: 0,
//     },
//     end: {
//       low: 33,
//       high: 0,
//     },
//     type: "Wife",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:14",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:28",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:33",
//   },
//   {
//     identity: {
//       low: 15,
//       high: 0,
//     },
//     start: {
//       low: 34,
//       high: 0,
//     },
//     end: {
//       low: 27,
//       high: 0,
//     },
//     type: "Friend",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:15",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:34",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//   },
//   {
//     identity: {
//       low: 16,
//       high: 0,
//     },
//     start: {
//       low: 27,
//       high: 0,
//     },
//     end: {
//       low: 34,
//       high: 0,
//     },
//     type: "Friend",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:16",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:34",
//   },
//   {
//     identity: {
//       low: 17,
//       high: 0,
//     },
//     start: {
//       low: 33,
//       high: 0,
//     },
//     end: {
//       low: 35,
//       high: 0,
//     },
//     type: "Owns",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:17",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:33",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:35",
//   },
//   {
//     identity: {
//       low: 18,
//       high: 0,
//     },
//     start: {
//       low: 27,
//       high: 0,
//     },
//     end: {
//       low: 36,
//       high: 0,
//     },
//     type: "WorksFor",
//     properties: {},
//     elementId: "5:7ac68888-66a8-43bb-9b8d-874e2a7961ed:18",
//     startNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:27",
//     endNodeElementId: "4:7ac68888-66a8-43bb-9b8d-874e2a7961ed:36",
//   },
// ];
