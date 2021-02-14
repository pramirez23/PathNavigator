import Tile from "./tile";

export default class Board {
  constructor() {
    this.grid = [];
    this.root;
    this.target;
    this.generateGrid();
    this.validMove = this.validMove.bind(this);
    this.algorithmStarted = false;
    this.speed = 5;
    this.draggedTileType = null; // Keep track of what type of tile is being dragged
    
    this.resetRoot = this.resetRoot.bind(this);
    this.resetTarget = this.resetTarget.bind(this);
    this.randomizeWalls = this.randomizeWalls.bind(this);
  }

  generateGrid() {
    for (let r = 0; r < 27; r++) {
      this.grid.push([]);

      for (let c = 0; c < 50; c++) {
        if (r === 13 && c === 9) {

          let root = new Tile(this, [13, 9], "root");
          root.tileEle.classList.add("root")
          root.tileEle.setAttribute("draggable", "true")
          this.root = root.node;
          this.grid[r].push(root);

        } else if (r === 13 && c === 41) {

          let target = new Tile(this, [13, 41], "target");
          target.tileEle.classList.add("target")
          target.tileEle.setAttribute("draggable", "true")
          this.target = target.node;
          this.grid[r].push(target);

        } else {

          let tile = new Tile(this, [r, c], null);
          tile.tileEle.setAttribute("draggable", "true")
          this.grid[r].push(tile);
          
        }
      }
    }
  }

  randomizeWalls() {
    if (this.algorithmStarted) return;

    const moves = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ]

    this.clearWalls();
    
    for (let i = 0; i < 550; i++) {
      let x = Math.floor(Math.random() * 27);
      let y = Math.floor(Math.random() * 50);      
      let currentNode = this.grid[x][y].node;
      let invalidNodes = new Array();
      
      // Make sure wall does not block root or target
      moves.forEach(move => {
        let dx = move[0];
        let dy = move[1];

        invalidNodes.push(`${this.root.pos[0] + dx}-${this.root.pos[1] + dy}`);
        invalidNodes.push(`${this.target.pos[0] + dx}-${this.target.pos[1] + dy}`);
      })
  
      if (invalidNodes.includes(currentNode.tile.id)) {
        continue;
      } else if (currentNode.type === null) {
        currentNode.type = "wall";
        currentNode.tile.classList.add("wall");
      }
    }
  }

  clearWalls() {
    if (this.algorithmStarted) return;

    let grid = this.grid;
    for (let row of grid) {
      for (const tile of row) {
        if (!["root", "target"].includes(tile.node.type)) {
          tile.node.type = null;
          document.getElementById(`${tile.pos.join("-")}`).classList.remove("wall");
        }
      }
    }
  }

  resetRoot(pos) {
    if (this.algorithmStarted) return;

    let x = pos[0];
    let y = pos[1];

    this.root.type = null;
    this.root.tile.classList.remove("hide");
    this.root.tile.classList.remove("root");

    this.root = this.grid[x][y].node;
    this.root.type = "root";
    this.root.tile.classList.add("root");
  }

  resetTarget(pos) {
    if (this.algorithmStarted) return;

    let x = pos[0];
    let y = pos[1];

    this.target.type = null;
    this.target.tile.classList.remove("hide");
    this.target.tile.classList.remove("target");

    this.target = this.grid[x][y].node;
    this.target.type = "target";
    this.target.tile.classList.add("target");
  }

  validMove(pos) {
    let x = pos[0];
    let y = pos[1];
    return (x >= 0 && x < 27) && (y >= 0 && y < 50) && (this.grid[x][y].node.type !== "wall");
  }
}
