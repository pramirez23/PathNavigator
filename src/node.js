export default class Node {
  constructor(board, pos, type) {
    this.board = board;
    this.grid = board.grid;
    this.pos = pos;
    this.type = type;
    this.parent = null;
    this.children = [];
    this.searched = []; // Keeps track of searched tiles starting at root node
    this.tile = document.getElementById(`${pos[0]}-${pos[1]}`);
    this.visualizeSearch.bind(this);
    this.visualizePath.bind(this);
    this.bfs.bind(this);
    this.dfs.bind(this);
  }
  
  reset() {
    // Reset searched and path tiles to null
    if (this.board.algorithmStarted) return;
  
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
  
  tracePath() {
    let path = [];
    let node = this.board.target;
    debugger
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
  
  bfs() {
    let queue = [this];
    
    while (queue.length > 0) {
      let node = queue.shift();
      if (node.type === "target") {
        let path = this.tracePath();
        this.visualizeSearch(this, this.grid, path, this.board.speed);
        return;
      } else if (!["root", "target"].includes(node.type)) {
        this.searched.push(node.pos);
      }

      queue.push(...node.children);
    }
    this.board.algorithmStarted = false;
    alert("Uh oh! It looks like you blocked all possible paths to the target node. Remove some walls and try again!")
  }

  dfs() {
    let stack = [this];
    
    while (stack.length > 0) {
      let node = stack.shift();
      if (node.type === "target") {
        let path = this.tracePath();
        this.visualizeSearch(this, this.grid, path, this.board.speed);
        return;
      } else if (!["root", "target"].includes(node.type)) {
        this.searched.push(node.pos);
      }

      stack.unshift(...node.children);
    }
    this.board.algorithmStarted = false;
    alert("Uh oh! It looks like you blocked all possible paths to the target node. Remove some walls and try again!")
  }
  
  visualizeSearch(root, grid, path, speed) {
    if (root.searched.length === 0) {
      this.visualizePath(root, grid, path);
    } else if (root.searched.length > 0) {      
      setTimeout(() => {
        let pos = root.searched.shift();
        let tile = grid[pos[0]][pos[1]].tileEle;
        tile.classList.add("searched");
        this.visualizeSearch(root, grid, path, speed);
      }, speed);
    }
  }
  
  visualizePath(root, grid, path) {
    if (path.length === 0) {
      root.board.algorithmStarted = false;
    } else if (path.length > 0) {
      let pos = path.shift();
      let tile = grid[pos[0]][pos[1]].tileEle;
      setTimeout(() => {
        tile.classList.remove("searched");
        tile.classList.add("path");
        this.visualizePath(root, grid, path)
      }, 30)
    }
  }
}

Node.MOVES = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
]