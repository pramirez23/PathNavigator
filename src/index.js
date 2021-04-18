import "./styles/index.scss";
import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  let board = new Board();
  let root = board.root;
  let selectedAlgorithm = null;
  let modalPage = 1;
  // Algorithm selector/controls
  const algoSelector = document.getElementById("algo-dropdown");
  const speedSelector = document.getElementById("speed-dropdown");
  const algoTitle = document.getElementById("algorithm-title");
  const algoInfo = document.getElementById("algorithm-info");

  // Wall control buttons
  const randomizeButton = document.getElementById("randomize-button");
  const clearButton = document.getElementById("clear-button");
  
  // Visualization buttons
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");

  // Modal buttons, modal elements
  const modal = document.getElementById("modal");
  const helpButton = document.getElementById("help-button");
  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");
  const exitButton = document.getElementById("exit-button");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalText = document.getElementById("modal-text");
  const modalPageNum = document.getElementById("modal-page-num")
  let gif1 = document.getElementById("gif1")
  let gif2 = document.getElementById("gif2")
  let gif3 = document.getElementById("gif3")

  // Remove weighted walls (only used if selected algorithm is not Dijkstra's)
  function removeWeights() {
    let weights = document.getElementsByClassName("weight");

    Array.from(weights).forEach(weight => {
      let tilePos = weight.id.split("-");
      let x = tilePos[0];
      let y = tilePos[1];
      let tile = board.grid[x][y];

      tile.tileEle.classList.remove("weight");
      tile.node.type = null;
      tile.node.weight = Infinity;
    });
  }


  // Visualization control/wall button event listeners
  algoSelector.addEventListener("change", e => {
    selectedAlgorithm = e.target.value

    switch (selectedAlgorithm) {
      case "bfs":
        removeWeights();
        board.selectedAlgorithm = "bfs";
        algoTitle.innerHTML = "Breadth-First Search (BFS)"
        algoInfo.innerHTML = "An unweighted pathfinding algorithm that explores all of the root node's direct neighbors before moving onto the next level of neighbors. BFS uses a queue data structure (first in, first out) to evaluate nodes. This approach guarantees discovery of the shortest path to the target node."
        break;
      case "dfs":
        removeWeights();
        board.selectedAlgorithm = "dfs";
        algoTitle.innerHTML = "Depth-First Search (DFS)"
        algoInfo.innerHTML = "An unweighted pathfinding algorithm that picks one of the root node's direct neighbors and explores as far down the tree as possible before searching the next neighbor and repeating the same process. DFS uses a stack data structure (last in, first out). This approach won’t guarantee the shortest path, but can use less memory than BFS and is better suited for far away targets."
        break;
      case "dijkstra":
        board.selectedAlgorithm = "dijkstra";
        algoTitle.innerHTML = "Dijkstra's Algorithm"
        algoInfo.innerHTML = "Coming soon!"
        break;
    } 
  });
  
  speedSelector.addEventListener("change", e => {
      let selectedSpeed = e.target.value;  

      switch (selectedSpeed) {
        case "slow":
          board.speed = 30;
          break;
        case "medium":
          board.speed = 15;
          break;
        case "fast":
          board.speed = 5;
          break;
      }
    }
  );

  startButton.addEventListener("click", startAlgorithm);
  resetButton.addEventListener("click", reset);
  clearButton.addEventListener("click", clear);
  randomizeButton.addEventListener("click", randomizeWalls);
  
  // Visualization button/wall button functions
  function startAlgorithm() {
    if (board.algorithmStarted === true) return;
    let root = board.root;

    reset();
    switch (selectedAlgorithm) {
      case "bfs":
        board.algorithmStarted = true;
        // Generate relationships between all tiles (set parents and children)
        root.generateTree();
        // Traverse the tree to find target node
        root.bfs();
        break;
      case "dfs":
        board.algorithmStarted = true;
        root.generateTree();
        root.dfs();
        break;
      // case "dijkstra":
      //   board.algorithmStarted = true;
      //   root.generateTree();
      //   root.dijkstra();
      //   break;
      default:
        alert("Don't forget to pick an algorithm!")
    }
  }

  function reset() {
    root.reset();
  }

  function clear() {
    board.clearWalls();
    removeWeights();
    reset();
  }

  function randomizeWalls() {
    reset();
    board.randomizeWalls();
  }

  // Modal event listeners
  helpButton.addEventListener("click", openModal);
  nextButton.addEventListener("click", nextPage);
  backButton.addEventListener("click", prevPage);
  exitButton.addEventListener("click", closeModal)

  function openModal() {
    modal.style.display = "flex";
    modalPage = 1;
    updateModal();
  }
  
  function nextPage() {
    modalPage++
    updateModal();
  }
  
  function prevPage() {
    modalPage--
    updateModal();
  }

  // const modalTitle
  // const modalImage
  // const modalText
  // const modalPageNum
  
  function updateModal() {
    switch(modalPage) {
      case 1:
        backButton.classList.add("hide-button");
        nextButton.classList.remove("hide-button");

        modalTitle.innerHTML = "Pick an algorithm and speed";

        gif1.style.display = "block";
        gif2.style.display = "none";
        gif3.style.display = "none";
        gif4.style.display = "none";
        gif5.style.display = "none";

        modalText.innerHTML = "Welcome to PathNavigator! Let's get started by selecting an algorithm and visualization speed from the dropdown menus at the bottom of the page (Fast is selected by default).";
        modalPageNum.innerHTML = "1/4"
        break;
      case 2:
        backButton.classList.remove("hide-button");
        nextButton.classList.remove("hide-button");

        modalTitle.innerHTML = "Draw or randomly generate walls";
        
        gif1.style.display = "none";
        gif2.style.display = "block";
        gif3.style.display = "block";
        gif4.style.display = "none";
        gif5.style.display = "none";

        modalText.innerHTML = "You can click or drag over blank tiles to place walls for the search algorithm to avoid. <br/> <br/> Alternatively, you can use the <b>RANDOMIZE</b> button to generate random walls.* <br/> <br/> <i>*Pro tip: Use the <b>CLEAR</b> button to clear all of the walls on the board.</i>" 
        modalPageNum.innerHTML = "2/4"
        break;
      case 3:
        backButton.classList.remove("hide-button");
        nextButton.classList.remove("hide-button");

        modalTitle.innerHTML = "Reposition the root and target nodes";
        
        gif1.style.display = "none";
        gif2.style.display = "none";
        gif3.style.display = "none";
        gif4.style.display = "block";
        gif5.style.display = "none";

        modalText.innerHTML = "Shake things up! Reposition the root and target nodes by clicking and dragging them to any empty tile on the board."
        modalPageNum.innerHTML = "3/4"
        break;
      case 4:
        nextButton.classList.add("hide-button");

        modalTitle.innerHTML = "Visualize the search algorithm";

        gif1.style.display = "none";
        gif2.style.display = "none";
        gif3.style.display = "none";
        gif4.style.display = "none";
        gif5.style.display = "block";
        modalText.innerHTML = "It's time to watch the magic of search algorithms in action! Click <start>START</start> to begin the visualization animation.* <br/> <br/> <i>*Pro tip: Click <reset>RESET</reset> to clear the visualization tiles once the algorithm is finished running (this won't remove any of the walls you've placed).</i>"

        modalPageNum.innerHTML = "4/4"
        break;
    }
  }

  
  function closeModal() {
    // modal.classList.remove("show-modal");
    modal.style.display = "none";
  }
  
  // Show page one of modal when page first loads
  updateModal()
})

