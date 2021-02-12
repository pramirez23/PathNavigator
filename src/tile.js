import Node from "./node";

export default class Tile {
  constructor(board, pos, type) {
    this.board = board;
    this.pos = pos;
    this.tileEle = document.createElement("div");
    this.tileEle.id = `${pos[0]}-${pos[1]}`;
    this.tileEle.classList.add('tile')
    this.node = new Node(board, pos, type) 
    this.addEventListeners();
    
    let grid = document.getElementById("grid");
    grid.appendChild(this.tileEle);
  }

  addEventListeners() {
    let board = this.board;

    const handleClick = e => {
      e.preventDefault();
      if (board.algorithmStarted) return;

      let tilePos = e.target.id.split("-");
      let x = tilePos[0];
      let y = tilePos[1];
      let tile = board.grid[x][y];

      if (tile.node.type === null) {
        tile.tileEle.classList.add("wall");
        tile.node.type = "wall";
      } else {
        tile.tileEle.classList.remove("wall");
        tile.node.type = null;
      }
    }

    if (["wall", null].includes(this.node.type)) {
      this.tileEle.addEventListener("click", handleClick)
    }
  }
}