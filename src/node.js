 export default class Node {
  constructor(board, pos, type) {
    this.tile = document.getElementById(`${pos[0]}-${pos[1]}`);
    this.board = board;
    this.grid = board.grid;
    this.pos = pos;
    this.type = type;
    this.parent = null;
    this.children = [];
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
  
  tracePath() {
    let path = [];
    let node = this.board.target;
    while (node.type !== "root" && node.parent.type !== "root") {
      // Tracing path back by adding parent's position to front of path array
      path.unshift(node.parent.pos);
      node = node.parent;
    }
    return path;
  }

  generateTree() {
    // Create relationships between nodes on board
    // Using queue to evaluate each node individually
    let nodeQueue = [this];

    let searched = new Set();
    searched.add(this.pos.join("-"));

    while (!!nodeQueue.length) {
      let node = nodeQueue.shift(); 

      Node.MOVES.forEach(move => {
        let dx = move[0];
        let dy = move[1];

        let nextPos = [node.pos[0] + dx, node.pos[1] + dy];

        let nextPosX = nextPos[0];
        let nextPosY = nextPos[1];
        
        if (node.board.validMove(nextPos)) {
          let neighbor = this.grid[nextPosX][nextPosY].node

          if (searched.has(`${nextPosX}-${nextPosY}`)) {
            return;
          }

          searched.add(nextPos.join("-"));
          neighbor.addParent(node);
          nodeQueue.push(neighbor);
        }
      })
    }
  }

  reset() {
    let grid = this.grid;
    for (let row of grid) {
      for (const tile of row) {
        tile.node.parent = null;
        tile.node.children = new Array();
        document.getElementById(`${tile.pos.join("-")}`).classList.remove("searched")
        document.getElementById(`${tile.pos.join("-")}`).classList.remove("path")
      }
    }
  }

  bfs() {
    let queue = [this];
    let searched = [];
    
    while (queue.length > 0) {
      let node = queue.shift();

      if (node.type === "target") {
        let path = this.tracePath();
        this.visualizeSearch(this.grid, searched, path);
      } else if (!["root", "target"].includes(node.type)) {
        searched.push(node.pos);
      }
      queue.push(...node.children);
    }
  }

  dfs() {
    let stack = [this];
    let searched = [];
    
    while (stack.length > 0) {
      let node = stack.shift();

      if (node.type === "target") {
        let path = this.tracePath();
        this.visualizeSearch(this.grid, searched, path);
      } else if (!["root", "target"].includes(node.type)) {
        searched.push(node.pos);
      }
      stack.unshift(...node.children);
    }
  }

  visualizeSearch(grid, searched, path) {
    let offset = 0;
    
    while (searched.length > 0) {      
      let pos = searched.shift();
      let tile = grid[pos[0]][pos[1]].tile;

      setTimeout(() => {
        tile.classList.add("searched")
      }, offset);
      offset += 5;
    }

    if (searched.length === 0) {
      this.visualizePath(path, grid);
    }
  }

  visualizePath(path, grid) {
    let offset = 0;

    while (path.length > 0) {
      let pos = path.shift();
      let tile = grid[pos[0]][pos[1]].tile;

      setTimeout(() => {
        tile.classList.remove("searched");
        tile.classList.add("path");
      }, 4550 + offset);
      offset += 50;
    }
  }
}

Node.MOVES = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
]