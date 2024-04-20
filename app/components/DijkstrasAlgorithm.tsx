"use client";
import React, { useState } from "react";

// Define type for graph
type Graph = {
  [key: string]: { [key: string]: number };
};

const Change = () => {
  // State for input fields
  const [edges, setEdges] = useState<[string, string, number][]>([]);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");

  // State for displaying result
  const [result, setResult] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);

  const handleEdgeChange = (
    index: number,
    fieldIndex: number,
    value: string | number,
  ) => {
    const updatedEdges = [...edges];
    updatedEdges[index][fieldIndex] = value;

    // If modifying source or target node
    if (fieldIndex === 0 || fieldIndex === 1) {
      const [source, target, weight] = updatedEdges[index];

      // Check if source node is not empty before adding edge
      if (source.trim() !== "") {
        // Check if target node is not empty before adding edge
        if (target.trim() !== "") {
          const reverseEdgeIndex = updatedEdges.findIndex(
            ([revSource, revTarget]) =>
              revSource === target && revTarget === source,
          );
          if (reverseEdgeIndex !== -1) {
            // Update weight for existing reverse edge
            updatedEdges[reverseEdgeIndex][2] = weight;
          } else {
            // Add reverse edge with weight
            updatedEdges.push([target, source, weight]);
          }
        }
      }
    }

    setEdges(updatedEdges);
  };

  // const handleEdgeChange = (
  //   index: number,
  //   fieldIndex: number,
  //   value: string | number,
  // ) => {
  //   const updatedEdges = [...edges];
  //   updatedEdges[index][fieldIndex] = value;
  //
  //   // If modifying source or target node
  //   if (fieldIndex === 0 || fieldIndex === 1) {
  //     const [source, target, weight] = updatedEdges[index];
  //
  //     // Check if both source and target nodes are not empty
  //     if (source.trim() !== "" && target.trim() !== "") {
  //       const reverseEdgeIndex = updatedEdges.findIndex(
  //         ([revSource, revTarget]) =>
  //           revSource === target && revTarget === source,
  //       );
  //       if (reverseEdgeIndex !== -1) {
  //         // Update weight for existing reverse edge
  //         updatedEdges[reverseEdgeIndex][2] = weight;
  //       } else {
  //         // Add reverse edge with weight
  //         updatedEdges.push([target, source, weight]);
  //       }
  //     }
  //   }
  //
  //   setEdges(updatedEdges);
  // };

  // Function to find shortest path
  const findShortestPath = () => {
    try {
      // Create graph from edges
      const graph: Graph = {};
      edges.forEach(([source, target, weight]) => {
        if (!graph[source]) {
          graph[source] = {};
        }
        graph[source][target] = weight;
      });

      // Dijkstra's Algorithm implementation
      const nodes: any = Object.keys(graph);
      const visited: any = {};
      const distances: any = {};
      const parents: any = {};
      let path: any = [];

      // Initialize distances and parents
      for (let i = 0; i < nodes.length; i++) {
        distances[nodes[i]] = Infinity;
        parents[nodes[i]] = null;
      }

      distances[startNode] = 0;

      // Find shortest path
      while (nodes.length) {
        let smallest = nodes[0];
        nodes.forEach((node: string) => {
          if (distances[node] < distances[smallest]) {
            smallest = node;
          }
        });

        const smallestIndex = nodes.indexOf(smallest);
        nodes.splice(smallestIndex, 1);
        if (smallest === endNode) {
          path = [];
          let temp = smallest;
          while (temp !== null) {
            path.unshift(temp);
            temp = parents[temp];
          }
          break;
        }

        if (distances[smallest] === Infinity) {
          break;
        }

        for (let neighbor in graph[smallest]) {
          let alt = distances[smallest] + graph[smallest][neighbor];
          if (alt < distances[neighbor]) {
            distances[neighbor] = alt;
            parents[neighbor] = smallest;
          }
        }
      }

      setResult(`Shortest path: ${path.join(" -> ")}`);
      setDistance(distances[endNode]);
    } catch (error) {
      console.error("Error parsing graph:", error);
      setResult("Error parsing graph. Please check your input.");
    }
  };

  // Function to add a new edge
  const addEdge = () => {
    setEdges([...edges, ["", "", 0]]);
  };

  // Function to remove an edge
  const removeEdge = (index: number) => {
    const updatedEdges = [...edges];
    updatedEdges.splice(index, 1);
    setEdges(updatedEdges);
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen w-full">
      <h1 className="md:mx-2.5 text-4xl text-center lg:text-4xl md:text-6xl">
        {"Dijkstra's Algorithm"}
      </h1>
      <p className="lg:w-full lg:px-0 px-8 sm:w-1/3 md:w-full md:mx-12 text-center md:text-2xl lg:text-2xl xl:text-xl xl:w-1/2 lg:text-center">
        {
          "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a weighted graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later."
        }
      </p>
      <p>
        Tutorial{" "}
        <a
          className="underline-offset-2 underline"
          href="https://github.com/warmdev17/Find-a-shortest-path"
        >
          here
        </a>
      </p>
      {edges.map((edge, index) => (
        <div key={index}>
          <input
            className="border-2 border-black m-2 p-2 h-12 rounded"
            type="text"
            placeholder="Source Node"
            value={edge[0]}
            onChange={(e) => handleEdgeChange(index, 0, e.target.value)}
          />
          <input
            className="border-2 border-black m-2 p-2 h-12 rounded"
            type="text"
            placeholder="Target Node"
            value={edge[1]}
            onChange={(e) => handleEdgeChange(index, 1, e.target.value)}
          />
          <input
            className="border-2 border-black m-2 p-2 h-12 rounded"
            type="number"
            placeholder="Weight"
            value={edge[2]}
            onChange={(e) =>
              handleEdgeChange(index, 2, parseInt(e.target.value))
            }
          />
          <button
            className="border-2 border-black rounded w-24 h-12"
            onClick={() => removeEdge(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="hover:bg-black bg-transparent text-black hover:text-white border-2 border-black rounded w-24 h-12"
        onClick={addEdge}
      >
        Add Edge
      </button>
      <br />
      <input
        className="md:text-xl md:w-[384px] text-black border-2 border-black rounded w-52 h-12 p-2 mb-2"
        type="text"
        placeholder="Start Node"
        value={startNode}
        onChange={(e) => setStartNode(e.target.value)}
      />
      <input
        className="md:text-xl md:w-[384px] text-black border-2 border-black rounded w-52 h-12 p-2 mb-2"
        type="text"
        placeholder="End Node"
        value={endNode}
        onChange={(e) => setEndNode(e.target.value)}
      />
      <br />
      <button
        className="md:h-80px md:text-xl md:w-[384px] text-black border-2 border-black rounded h-[64px] w-[256px] hover:bg-black hover:text-white duration-300"
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

export default Change;
