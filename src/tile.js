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

    const handleClick = e => {
      e.preventDefault();
      if (board.algorithmStarted) return;
      board.root.reset();
      let tilePos = e.target.id.split("-");
      let x = tilePos[0];
      let y = tilePos[1];
      let tile = board.grid[x][y];
      if (["root", "target"].includes(tile.node.type)) return;

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
      board.root.reset();

      let tileStartPos = e.target.id.split("-");
      let x = tileStartPos[0];
      let y = tileStartPos[1];
      let tile = board.grid[x][y];
      let tileType = tile.node.type;
      board.draggedTileType = tileType;

      // Set drag images
      let blankImg = new Image();
      let rootImg = new Image();
      let targetImg = new Image();
      blankImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      rootImg.src = "./src/images/root_node.png"
      targetImg.src = "./src/images/target_node.png"
 
      // Root/target drag image
      if (tileType === "root") {
        e.dataTransfer.setDragImage(rootImg, 10, 10);
      } else if (tileType === "target") {
        e.dataTransfer.setDragImage(targetImg, 10, 10);
      }

      // Blank drag image
      if (!["root", "target"].includes(tileType)) {
        e.dataTransfer.setDragImage(blankImg, 0, 0);
        return;
      }
      
      // Hide old root/target tile while dragging to new position
      if (["root", "target"].includes(tileType)) {
        board.grid[x][y].tileEle.classList.add("hide");
      }
    }

    const handleDragEnter = e => {
      e.preventDefault();

      if (board.algorithmStarted) return;
      // Prevent making new walls while dragging root or tile nodes
      if (["root", "target"].includes(board.draggedTileType)) return;
      board.root.reset();
      
      let tilePos = e.target.id.split("-");
      let x = tilePos[0];
      let y = tilePos[1];
      let tile = board.grid[x][y];

      if (tile.node.type === "wall") {
        tile.node.type = null;
        e.target.classList.remove("wall");
      } else if (tile.node.type === null) {
        tile.node.type = "wall";
        e.target.classList.add("wall");
      }
    }
    
    const handleDrop = e => {
      e.preventDefault();
      let invalidDropPos = [board.root.pos, board.target.pos]
      let tileDropPos = e.target.id.split("-").map(num => parseInt(num));
      let x = tileDropPos[0];
      let y = tileDropPos[1];

      if (invalidDropPos.includes(tileDropPos) || (board.grid[x][y].node.type === "wall")) {
        board.root.tile.classList.remove("hide");
        board.target.tile.classList.remove("hide");
        return;
      }
      
      if (board.draggedTileType === "root") {
        board.resetRoot(tileDropPos);
      } else if (board.draggedTileType === "target") {
        board.resetTarget(tileDropPos);
      } else {
        return;
      }
    }

    const handleDragEnd = e => {
      board.root.tile.classList.remove("hide");
      board.target.tile.classList.remove("hide");
    }

    this.tileEle.addEventListener("click", handleClick)
    this.tileEle.addEventListener("dragenter", handleDragEnter)
    this.tileEle.addEventListener("drop", handleDrop)
    this.tileEle.addEventListener("dragstart", handleDragStart);
    this.tileEle.addEventListener("dragend", handleDragEnd);
    this.tileEle.addEventListener("dragover", e => {
      e.preventDefault();
    })
  }
}