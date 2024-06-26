"use client";
import { useState } from "react";

// Define type for graph
type Graph = {
  [key: string]: { [key: string]: number };
};

function downloadJSON(data: any, filename: string) {
  // convert to json and download
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const ShortestPath = () => {
  // State for input fields
  const [graph, setGraph] = useState<string>("");
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");

  // State for displaying result
  const [result, setResult] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);

  // Function to find shortest path
  const findShortestPath = () => {
    try {
      // Parse graph input into a JavaScript object
      const parsedGraph: Graph = JSON.parse(graph);

      // Dijkstra's Algorithm implementation
      const nodes: any = Object.keys(parsedGraph);
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
        // console.log(distances[smallest]);
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

        for (let neighbor in parsedGraph[smallest]) {
          let alt = distances[smallest] + parsedGraph[smallest][neighbor];
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
      <textarea
        className="xl:w-[900px] lg:w-[800px] sm:w-[40px] md:w-[800px] lg:h-[320px] sm:h-[140px] md:h-[340px] md:text-2xl border-black border-2 rounded mt-6 p-12"
        placeholder="Enter graph as JSON"
        value={graph}
        onChange={(e) => setGraph(e.target.value)}
      />
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

export default ShortestPath;
