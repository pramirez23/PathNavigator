import "./styles/index.scss";
import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  let board = new Board();
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", executeBfs)

  function executeBfs() {
    let root = board.root;
    // console.log(board.root)
    // Generate relationships between all tiles (set parents and children)
    root.generateTree();
    // Traverse the tree to find target node using bfs
    root.bfs();
    console.log(root)
  }
})