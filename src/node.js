export default class Node {
  constructor(board, pos, type) {
    this.board = board;
    this.pos = pos;
    this.type = type;
    this.grid = board.grid;
    
    this.tile = document.getElementById(`${pos[0]}-${pos[1]}`);
    this.parent = null;
    this.children = [];

    this.searchedTiles = [];
    // this.searchedNodes = new Set();
    // this.searchedNodes.add(this.pos.join("-"));
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
    // Create relationships between nodes on board
    const moves = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ];

    // Using queue to evaluate each node individually
    let nodeQueue = [this];

    let searched = new Set();
    searched.add(this.pos.join("-"));

    while (!!nodeQueue.length) {
      let node = nodeQueue.shift(); 

      moves.forEach(move => {
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

  // fetchAllNodes(grid) {
  //   const nodes = [];
  //   for (let row of grid) {
  //     for (const node of row) 
  //     nodes.push(node)
  //   }
  //   return nodes;
  // }

  tracePath() {
    let path = []
    let node = this.board.target;
    while (node.type !== "root" && node.parent.type !== "root") {
      // Tracing path back by adding parent's position to front of path array
      // eventually will reach root node
      path.unshift(node.parent.pos)
      node = node.parent;
    }
    return path;
  }

  bfs() {
    let queue = [this];
    let searched = [];
    
    while (queue.length > 0) {
      let node = queue.shift();

      if (node.type === "target") {
        let path = this.tracePath();
        this.visualizeSearch(this.grid, searched, path);
        return;
      } else if (!["root", "target"].includes(node.type)) {
        searched.push(node.pos)
      }
      queue.push(...node.children)
    }
  }

  visualizeSearch(grid, searched, path) {
    let offset = 0
    let searchComplete = false

    while (searched.length > 0) {
      let pos = searched.shift();
      let tile = grid[pos[0]][pos[1]].tile;
      setTimeout(() => {
        tile.classList.add("searched")
      }, 100 + offset);
      offset += 3;
    }

    searched.length === 0 ? searchComplete = true : "";

    if (searchComplete) {
      this.visualizePath(path, grid);
    }
  }

  visualizePath(path, grid) {
    let offset = 0

    while (path.length > 0) {
      let pos = path.shift();
      let tile = grid[pos[0]][pos[1]].tile;
      setTimeout(() => {
        tile.classList.remove("searched")
        tile.classList.add("path")
      }, 300 + offset);
      offset += 100;
    }
  }
}