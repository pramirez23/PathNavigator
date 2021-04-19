export default class Node {
  constructor(board, pos, type) {
    this.board = board;
    this.grid = board.grid;
    this.pos = pos;
    this.type = type;
    this.weight = Infinity;
    this.parent = null;
    this.children = [];
    this.searched = []; // Keeps track of searched tiles starting at root node
    this.isVisited = false; // Keeps track of node being visited or not for Dijkstra's algorithm
    this.previousNode = null; // Pointer to previously visited node for Dijkstra's algorithm
    this.tile = document.getElementById(`${pos[0]}-${pos[1]}`);
    this.visualizeSearch.bind(this);
    this.visualizePath.bind(this);
    this.bfs.bind(this);
    this.dfs.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  reset() {
    // Reset searched and path tiles to null
    if (this.board.algorithmStarted) return;
  
    let grid = this.grid;
    for (let row of grid) {
      for (const tile of row) {
        tile.node.parent = null;
        tile.node.children = new Array();
        tile.node.weight = Infinity;
        tile.node.isVisited = false;
        document.getElementById(`${tile.pos.join("-")}`).classList.remove("searched")
        document.getElementById(`${tile.pos.join("-")}`).classList.remove("path")
      }
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
    let nodeQueue = [this];
    let nodes = new Set();
    nodes.add(this.pos.join("-"));

    while (!!nodeQueue.length) {
      let node = nodeQueue.shift();

      Node.MOVES.forEach(move => {
        let dx = move[0];
        let dy = move[1];

        let nextPos = [node.pos[0] + dx, node.pos[1] + dy];
        let nextPosX = nextPos[0];
        let nextPosY = nextPos[1];

        if (node.board.validMove(nextPos)) {
          let neighbor = this.grid[nextPosX][nextPosY].node;

          if (nodes.has(`${nextPosX}-${nextPosY}`)) {
            return;
          }

          nodes.add(nextPos.join("-"));
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
  
  dijkstra() {
    const visited = this.searched;
    const unvisited = this.fetchAllNodes(this.grid);
    this.board.root.weight = 0;

    while (unvisited.length > 0) {
      // Sort nodes by weight
      unvisited.sort((a, b) => a.node.weight - b.node.weight);
      const nextNode = unvisited.shift().node;

      if (nextNode.type === "wall") continue;

      if (nextNode.weight === Infinity) {
        alert("Uh oh! It looks like you blocked all possible paths to the target node. Remove some walls and try again!")
        this.board.algorithmStarted = false;
        return;
      }

      nextNode.isVisited = true;

      if (nextNode.type === "target") {
        let path = this.tracePath();
        this.visualizeSearch(this.board.root, this.board.grid, path, this.board.speed);
        return;
      } else if (!["root", "target"].includes(nextNode.type)) {
        visited.push(nextNode.pos);
      }

      this.updateUnvisitedChildren(nextNode); 
    }
  }

  fetchAllNodes(grid) {
    const nodes = []
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  fetchUnvisitedChildren(node) {
    // Used for Dijkstra's algorithm
    const children = [];

    Node.MOVES.forEach(move => {
      let dx = move[0];
      let dy = move[1];

      let nextPos = [node.pos[0] + dx, node.pos[1] + dy];
      let nextPosX = nextPos[0];
      let nextPosY = nextPos[1];

      if (node.board.validMove(nextPos)) {
        let neighbor = this.grid[nextPosX][nextPosY].node;
        children.push(neighbor);
      }
    })

    return children.filter(child => !child.isVisited);
  }

  updateUnvisitedChildren(node) {
    // Used for Dijkstra's algorithm
    const children = this.fetchUnvisitedChildren(node);
    for (const child of children) {
      if (child.type === "weight") {
        child.weight = node.weight + 20;
      } else {
        child.weight = node.weight + 1;
      }
      child.addParent(node);
    }
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