export default class PolyTreeNode {
  constructor(board, pos, val) {
    this.board = board;
    this.pos = pos;
    this.val = val;
    this.grid = board.grid;
    
    this.tile = document.getElementById(`${pos[0]}-${pos[1]}`);
    this.parent = null;
    this.children = [];

    this.visitedNodes = [];
    this.shortestPath = [];

    this.nodeTree = new Set();
    this.nodeTree.add(this.pos.join("-"));
  }
}