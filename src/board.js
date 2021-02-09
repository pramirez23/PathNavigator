import Tile from "./tile";

export default class Board {
  constructor() {
    this.grid = [];
    this.generateGrid();

    this.root;
    this.target;
    this.previousNodeType;

    this.validMove = this.validMove.bind(this);
  }

  generateGrid() {
    for (let r = 0; r < 30; r++) {
      this.grid.push([]);

      for (let c = 0; c < 50; c++) {
        let tile = new Tile(this, [r, c], null);
        this.grid[r].push(tile);
      }
    }
  }

  validMove(pos) {
    return (pos[0] >= 0 && pos[0] < 30) && (pos[1] >= 0 && pos[1] < 50);
  }
}
