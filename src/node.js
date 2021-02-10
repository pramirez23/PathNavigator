export default class Node {
  constructor(board, pos, type) {
    this.board = board;
    this.pos = pos;
    this.type = type;
    this.grid = board.grid;
    
    this.tile = document.getElementById(`${pos[0]}-${pos[1]}`);
    this.parent = null;
    this.children = [];

    this.visitedTiles = [];
    this.path = [];
    // this.visitedNodes = new Set();
    // this.visitedNodes.add(this.pos.join("-"));
  }

  addParent(node) {
    if (!!this.parent) {
      // If there's a parent, grab index of child node in parent's array
      let childIdx = this.parent.children.indexOf(this);
      // Remove node from parent's array of children
      this.parent.children.splice(childIdx, 1);
    }

    if (!!node) {
      this.parent = node;
      node.children.push(this)
    }
  }

  generateTree() {
    // Assign parents to nodes on board
    const moves = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ];

    let tree = [this];
    let visited = new Set();
    visited.add(this.pos.join("-"));

    while (!!tree.length) {
      let node = tree.shift(); 

      if (node.type === "target") {
        break
      }

      moves.forEach(move => {
        let dx = move[0];
        let dy = move[1];

        let nextPos = [node.pos[0] + dx, node.pos[1] + dy];
        let nextPosX = nextPos[0];
        let nextPosY = nextPos[1];
        
        if (node.board.validMove(nextPos)) {
          let neighbor = this.grid[nextPosX][nextPosY].node

          if (visited.has(nextPos.join("-"))) {
            return;
          }

          visited.add(nextPos.join("-"));
          neighbor.addParent(node);
          tree.push(neighbor);
        }
      })
    }

    console.log(visited)
  }

  fetchAllNodes(grid) {
    const nodes = [];
    for (let row of grid) {
      for (const node of row) 
      nodes.push(node)
    }
    return nodes;
  }

  tracePath() {
    let node = this.board.target;

    while (node.type !== "root" && node.parent.type !== "root") {
      this.path.unshift(node.parent.pos)
      node = node.parent;
    }
  }

  bfs() {
    let queue = [this];
    let visited = new Set();
    
    while (queue.length > 0) {
      let node = queue.shift();

      if (node.type === "target") return node;
      queue.push(...node.children)
    }

  }
}