import "./styles/index.scss";
import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  let board = new Board();
  let root = board.root;
  let selectedAlgorithm = null;

  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const algoSelector = document.getElementById("algo-dropdown");

  algoSelector.addEventListener("change", e => {
    selectedAlgorithm = e.target.value
  }) 

  startButton.addEventListener("click", startAlgorithm)
  resetButton.addEventListener("click", reset)

  function reset() {
    root.reset();
  }

  function startAlgorithm() {
    if (board.algorithmStarted === true) return;
    reset();
    switch (selectedAlgorithm) {
      case "bfs":
        board.algorithmStarted = true;
        // Generate relationships between all tiles (set parents and children)
        root.generateTree();
        // Traverse the tree to find target node using bfs
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
        alert("Please select an algorithm before starting!")
    }
    
  }
})