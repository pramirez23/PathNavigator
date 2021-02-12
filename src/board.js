import Tile from "./tile";

export default class Board {
  constructor() {
    this.grid = [];
    this.root;
    this.target;
    this.generateGrid();
    this.validMove = this.validMove.bind(this);
    this.algorithmStarted = false;
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

    let grid = this.grid
    for (let row of grid) {
      for (const tile of row) {
        document.getElementById(`${tile.pos.join("-")}`).classList.remove("wall")
      }
    }
  }

  validMove(pos) {
    let x = pos[0];
    let y = pos[1];
    return (x >= 0 && x < 27) && (y >= 0 && y < 50) && (this.grid[x][y].node.type !== "wall");
  }
}
