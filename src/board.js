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
    // Keep track of what type of tile is being dragged
    this.draggedTileType = null;
    this.resetRoot = this.resetRoot.bind(this);
    this.resetTarget = this.resetTarget.bind(this);
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
    // if (this.algorithmStarted) return;
    
    // let oldX = this.root.pos[0];
    // let oldY = this.root.pos[1];
    // let oldRootTile = this.grid[oldX][oldY];

    // oldRootTile.node.type = null;
    // oldRootTile.tileEle.classList.remove("hide");
    // oldRootTile.tileEle.classList.remove("root");
    
    // let newX = pos[0];
    // let newY = pos[1];
    // // debugger
    // let newRootTile = this.grid[newX][newY];
    // this.root = newRootTile.node
    // newRootTile.node.type = "root";
    // newRootTile.tileEle.classList.add("root");
    // newRootTile.addEventListeners();
    // oldRootTile.addEventListeners();
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
