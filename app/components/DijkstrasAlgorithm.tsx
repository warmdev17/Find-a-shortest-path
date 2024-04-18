"use client";
import React, { useState } from "react";

// Define type for graph
type Graph = {
  [key: string]: { [key: string]: number };
};

// create graph
function createGraph(input: [string, string, number][]): Graph {
  const graph: Graph = {};

  input.forEach(([source, target, weight]) => {
    if (!graph[source]) {
      graph[source] = {};
    }
    graph[source][target] = weight;
  });

  return graph;
}

const ShortestPathImprove = () => {
  // State for input fields
  const [numNodes, setNumNodes] = useState<number>(0);
  const [nodeConnections, setNodeConnections] = useState<
    [string, string, number][]
  >([]);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");

  // State for displaying result
  const [result, setResult] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);

  // Function to handle adding node connections
  const addNodeConnection = () => {
    setNodeConnections([...nodeConnections, ["", "", 0]]);
  };

  // updatge
  // Function to handle updating node connections
  // const updateNodeConnection = (
  //   index: number,
  //   value: string,
  //   field: "source" | "target" | "weight",
  // ) => {
  //   const updatedConnections = [...nodeConnections];
  //   updatedConnections[index] = {
  //     ...updatedConnections[index],
  //     [field]: value,
  //   };
  //   setNodeConnections(updatedConnections);
  // };
  //
  //
  //
  const updateNodeConnection = (
    index: number,
    value: string,
    field: "source" | "target" | "weight",
  ) => {
    const updatedConnections = [...nodeConnections];
    updatedConnections[index] = {
      ...updatedConnections[index],
      [field]: field === "weight" ? Number(value) : value,
    };
    setNodeConnections(updatedConnections);
  };

  // Function to remove a node connection
  const removeNodeConnection = (index: number) => {
    const updatedConnections = [...nodeConnections];
    updatedConnections.splice(index, 1);
    setNodeConnections(updatedConnections);
  };

  // Function to find shortest path
  const findShortestPath = () => {
    try {
      // Create graph from user input
      const graph: Graph = createGraph(nodeConnections);

      // Dijkstra's Algorithm implementation...
    } catch (error) {
      console.error("Error parsing graph:", error);
      setResult("Error parsing graph. Please check your input.");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen w-full">
      <h1 className="text-4xl text-center">{"Dijkstra's Algorithm"}</h1>
      <p className="w-1/2 text-center">
        {
          "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a weighted graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later."
        }
      </p>
      <label className="block mt-4">
        Number of Nodes:
        <input
          className="text-black border-2 border-black rounded w-52 h-12 p-2"
          type="number"
          value={numNodes}
          onChange={(e) => setNumNodes(Number(e.target.value))}
        />
      </label>
      {Array.from({ length: numNodes }).map((_, index) => (
        <div key={index} className="flex items-center mt-4">
          <label className="block mr-2">
            Source Node:
            <input
              className="text-black border-2 border-black rounded w-32 h-12 p-2 ml-2"
              type="text"
              // value={nodeConnections[index]?.[0] || ""}
              value={nodeConnections[index] ? nodeConnections[index][0] : ""}
              onChange={(e) =>
                updateNodeConnection(index, e.target.value, "source")
              }
            />
          </label>
          <label className="block mr-2">
            Target Node:
            <input
              className="text-black border-2 border-black rounded w-32 h-12 p-2 ml-2"
              type="text"
              // value={nodeConnections[index]?.[1] || ""}
              value={nodeConnections[index] ? nodeConnections[index][0] : ""}
              onChange={(e) =>
                updateNodeConnection(index, e.target.value, "target")
              }
            />
          </label>
          <label className="block mr-2">
            Weight:
            <input
              className="text-black border-2 border-black rounded w-20 h-12 p-2 ml-2"
              type="number"
              value={nodeConnections[index]?.[2] || 0}
              onChange={(e) =>
                updateNodeConnection(index, e.target.value, "weight")
              }
            />
          </label>
          <button
            className="text-black border-2 border-black rounded h-12 p-2 ml-2"
            onClick={() => removeNodeConnection(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="text-black border-2 border-black rounded h-12 p-2 mt-4"
        onClick={addNodeConnection}
      >
        Add Node Connection
      </button>
      <br />
      <input
        className="text-black border-2 border-black rounded w-52 h-12 p-2 mt-4 mb-2"
        type="text"
        placeholder="Start Node"
        value={startNode}
        onChange={(e) => setStartNode(e.target.value)}
      />
      <input
        className="text-black border-2 border-black rounded w-52 h-12 p-2 mb-2"
        type="text"
        placeholder="End Node"
        value={endNode}
        onChange={(e) => setEndNode(e.target.value)}
      />
      <br />
      <button
        className="text-black border-2 border-black rounded h-[64px] w-[256px] hover:bg-black hover:text-white duration-300"
        onClick={findShortestPath}
      >
        Find Shortest Path
      </button>
      <br />
      <div>{result}</div>
      <div>{`Distance: ${distance}`}</div>
    </div>
  );
};

export default ShortestPathImprove;
