import "./styles/index.scss";
import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  let board = new Board();
  let root = board.root;
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const algorithmButton = document.getElementById("algorithm-btn");
  startButton.addEventListener("click", executeBfs)
  resetButton.addEventListener("click", reset)
  algorithmButton.addEventListener("click", showDropdown)

  function reset() {
    root.reset();
  }

  function executeBfs() {
    // Generate relationships between all tiles (set parents and children)
    root.generateTree();
    // Traverse the tree to find target node using bfs
    root.bfs();
  }

  function showDropdown() {
    document.getElementById("algorithm-dropdown").classList.toggle("show");
  }
})