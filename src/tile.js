import PolyTreeNode from "./polytreenode";

export default class Tile {
  constructor(board, pos, val) {
    this.board = board;
    this.pos = pos;

    this.tile = document.createElement("div");
    this.tile.id = `${pos[0]}-${pos[1]}`;
    this.tile.classList.add('tile')

    let grid = document.getElementById("grid");
    grid.appendChild(this.tile);

    this.node = new PolyTreeNode(board, pos, val)
  }
}