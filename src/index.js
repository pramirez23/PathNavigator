import "./styles/index.scss";
import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  let board = new Board();
  let root = board.root;
  let selectedAlgorithm = null;
  
  // Algorithm selector/controls
  const algoSelector = document.getElementById("algo-dropdown");
  const speedSelector = document.getElementById("speed-dropdown");
  const algoTitle = document.getElementById("algorithm-title");
  const algoInfo = document.getElementById("algorithm-info");

  // Wall control buttons
  const randomizeButton = document.getElementById("randomize-button");
  const clearButton = document.getElementById("clear-button");
  
  // Visualization buttons
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");

  algoSelector.addEventListener("change", e => {
    selectedAlgorithm = e.target.value

    switch (selectedAlgorithm) {
      case "bfs":
        algoTitle.innerHTML = "Breadth-First Search (BFS)"
        algoInfo.innerHTML = "An unweighted pathfinding algorithm that explores all of the root node's direct neighbors before moving onto the next level of neighbors. BFS uses a queue data structure (first in, first out) to evaluate nodes. This approach guarantees discovery of the shortest path to the target node."
        break;
      case "dfs":
        algoTitle.innerHTML = "Depth-First Search (DFS)"
        algoInfo.innerHTML = "An unweighted pathfinding algorithm that picks one of the root node's direct neighbors and explores as far down the tree as possible before searching the next neighbor and repeating the same process. DFS uses a stack data structure (last in, first out). This approach won’t guarantee the shortest path, but can use less memory than BFS."
        break;
      case "dijkstra":
        algoTitle.innerHTML = "Dijkstra's Algorithm"
        algoInfo.innerHTML = "Coming soon!"
        break;
    } 
  }) 
  
  speedSelector.addEventListener("change", e => {
      let selectedSpeed = e.target.value;  

      switch (selectedSpeed) {
        case "slow":
          board.speed = 30;
          break;
        case "medium":
          board.speed = 15;
          break;
        case "fast":
          board.speed = 5;
          break;
      }
    }
  );

  startButton.addEventListener("click", startAlgorithm);
  resetButton.addEventListener("click", reset);
  clearButton.addEventListener("click", clear);


  function reset() {
    root.reset();
  }

  function clear() {
    board.clearWalls();
  }

  function startAlgorithm() {
    if (board.algorithmStarted === true) return;
    let root = board.root;

    reset();
    switch (selectedAlgorithm) {
      case "bfs":
        board.algorithmStarted = true;
        // Generate relationships between all tiles (set parents and children)
        root.generateTree();
        // Traverse the tree to find target node
        root.bfs();
        break;
      case "dfs":
        board.algorithmStarted = true;
        root.generateTree();
        root.dfs();
        break;
      // case "dijkstra":
      //   board.algorithmStarted = true;
      //   root.dijkstra();
      //   break;
      default:
        alert("Don't forget to pick an algorithm!")
    }
  }
})