export default class Node {
  constructor(board, pos, type) {
    this.board = board;
    this.pos = pos;
    this.type = type;
    this.grid = board.grid;
    
    this.tile = document.getElementById(`${pos[0]}-${pos[1]}`);
    this.parent = null;
    this.children = [];

    this.isVisited = false;
    this.path = [];

    this.visitedNodes = new Set();
    this.visitedNodes.add(this.pos.join("-"));
  }

  addParent(node) {
    if (!!this.parent) {
      let childIdx = this.parent.children.indexOf(this);
      this.parent.children.splice(childIdx, 1);
    }

    if (!!node) {
      this.parent = node;
      node.children.push(this)
    }
  }

  generateTree() {
    const moves = [
      [1, 0],
      [0, 1],
      [-1, 0]
      [0, -1],
    ];

    let tree = [this];

    while (!!tree.length) {
      let node = tree.shift(); 

      if (node.type === "target") {
        break
      }

      moves.forEach(move => {
        let dx = move[0];
        let dy = move[1];

        let nextPos = [node.pos[0] + dx, node.pos[1] + dy];
        let nextPosX = nextPost[0];
        let nextPosY = nextPost[1];
        
        if (node.board.validPos(newPos)) {
          let neighbor = this.grid[nextPosX][nextPosY].node

          this.visitedNodes.add(nextPos.join("-"));
          neighbor.addParent(this);
          tree.push(neighbor);
        }
      })

    }
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

  // bfs() {
  //   let queue = [this];
  //   let visited = new Set();
    
  //   while (queue.length > 0) {
  //     let node = queue.shift();

  //     if (node.type !== "root") {
  //       this.
  //     }
  //     if (node.type === "target") return node;
  //     queue.push(...node.children)
  //   }

  // }
}