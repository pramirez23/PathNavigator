import Node from "./node";

export default class Tile {
  constructor(board, pos, type) {
    this.board = board;
    this.pos = pos;

    // Tile DOM element setup
    this.tileEle = document.createElement("div");
    this.tileEle.id = `${pos[0]}-${pos[1]}`;
    this.tileEle.classList.add('tile')

    let grid = document.getElementById("grid");
    grid.appendChild(this.tileEle);

    this.node = new Node(board, pos, type) 
    this.addEventListeners();
  }
  
  addEventListeners() {
    let board = this.board;

    // Create actual img elements so ghost image shows on drag/drop
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
    
    const handleDragStart = e => {
      if (board.algorithmStarted) return;
      
      let tileStartPos = e.target.id.split("-");
      let x = tileStartPos[0];
      let y = tileStartPos[1];
      let tile = board.grid[x][y];
      let tileType = tile.node.type;
      console.log("dragstart", e.target)
      let blankImg = new Image();
      blankImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

      if (!["root", "target"].includes(tileType)) {
        e.dataTransfer.setDragImage(blankImg, 0, 0)
      }
    }

    const handleDragEnter = e => {
      e.preventDefault();
      if (board.algorithmStarted) return;
      
      console.log("dragenter", e.target)
      board.root.reset();
      let tilePos = e.target.id.split("-");
      let x = tilePos[0];
      let y = tilePos[1];
      let tile = board.grid[x][y];

      if (tile.node.type === "wall") {
        tile.node.type = null;
        e.target.classList.add(null);
        e.target.classList.remove("wall");
      } else if (tile.node.type === null) {
        tile.node.type = "wall";
        e.target.classList.add("wall");
        e.target.classList.remove(null);
      }
    }
    
    const handleDragEnd = e => {
      e.preventDefault();
    }

    const handleDrop = e => {
      e.preventDefault();
    }

    if (["wall", null].includes(this.node.type)) {
      this.tileEle.addEventListener("click", handleClick)
      this.tileEle.addEventListener("dragenter", handleDragEnter)
      this.tileEle.addEventListener("drop", handleDrop)
      this.tileEle.addEventListener("dragover", e => {
        e.preventDefault();
      })
    }

    this.tileEle.addEventListener("dragstart", handleDragStart);
    this.tileEle.addEventListener("dragend", handleDragEnd);
  }
}