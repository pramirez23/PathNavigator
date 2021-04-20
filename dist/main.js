!function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=1)}([function(e,t,i){},function(e,t,i){"use strict";i.r(t);i(0);function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=a(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,l=!1;return{s:function(){i=e[Symbol.iterator]()},n:function(){var e=i.next();return s=e.done,e},e:function(e){l=!0,o=e},f:function(){try{s||null==i.return||i.return()}finally{if(l)throw o}}}}function a(e,t){if(e){if("string"==typeof e)return o(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function s(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,i,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.board=t,this.grid=t.grid,this.pos=i,this.type=r,this.weight=1/0,this.parent=null,this.children=[],this.searched=[],this.isVisited=!1,this.previousNode=null,this.tile=document.getElementById("".concat(i[0],"-").concat(i[1])),this.visualizeSearch.bind(this),this.visualizePath.bind(this),this.bfs.bind(this),this.dfs.bind(this),this.reset=this.reset.bind(this)}var t,i,a;return t=e,(i=[{key:"reset",value:function(){if(!this.board.algorithmStarted){var e,t=n(this.grid);try{for(t.s();!(e=t.n()).done;){var i,r=n(e.value);try{for(r.s();!(i=r.n()).done;){var a=i.value;a.node.parent=null,a.node.children=new Array,a.node.weight=1/0,a.node.isVisited=!1,document.getElementById("".concat(a.pos.join("-"))).classList.remove("searched"),document.getElementById("".concat(a.pos.join("-"))).classList.remove("path")}}catch(e){r.e(e)}finally{r.f()}}}catch(e){t.e(e)}finally{t.f()}}}},{key:"tracePath",value:function(){for(var e=[],t=this.board.target;"root"!==t.type&&"root"!==t.parent.type;)e.unshift(t.parent.pos),t=t.parent;return e}},{key:"generateTree",value:function(){var t=this,i=[this],r=new Set;r.add(this.pos.join("-"));for(var n=function(){var n=i.shift();e.MOVES.forEach((function(e){var a=e[0],o=e[1],s=[n.pos[0]+a,n.pos[1]+o],l=s[0],d=s[1];if(n.board.validMove(s)){var h=t.grid[l][d].node;if(r.has("".concat(l,"-").concat(d)))return;r.add(s.join("-")),h.addParent(n),i.push(h)}}))};i.length;)n()}},{key:"addParent",value:function(e){if(this.parent){var t=this.parent.children.indexOf(this);this.parent.children.splice(t,1)}e&&(this.parent=e,e.children.push(this))}},{key:"bfs",value:function(){for(var e=[this];e.length>0;){var t=e.shift();if("target"===t.type){var i=this.tracePath();return void this.visualizeSearch(this,this.grid,i,this.board.speed)}["root","target"].includes(t.type)||this.searched.push(t.pos),e.push.apply(e,r(t.children))}this.board.algorithmStarted=!1,alert("Uh oh! It looks like you blocked all possible paths to the target node. Remove some walls and try again!")}},{key:"dfs",value:function(){for(var e=[this];e.length>0;){var t=e.shift();if("target"===t.type){var i=this.tracePath();return void this.visualizeSearch(this,this.grid,i,this.board.speed)}["root","target"].includes(t.type)||this.searched.push(t.pos),e.unshift.apply(e,r(t.children))}this.board.algorithmStarted=!1,alert("Uh oh! It looks like you blocked all possible paths to the target node. Remove some walls and try again!")}},{key:"dijkstra",value:function(){var e=this.searched,t=this.fetchAllNodes(this.grid);for(this.board.root.weight=0;t.length>0;){t.sort((function(e,t){return e.node.weight-t.node.weight}));var i=t.shift().node;if("wall"!==i.type){if(i.weight===1/0)return alert("Uh oh! It looks like you blocked all possible paths to the target node. Remove some walls and try again!"),void(this.board.algorithmStarted=!1);if(i.isVisited=!0,"target"===i.type){var r=this.tracePath();return void this.visualizeSearch(this.board.root,this.board.grid,r,this.board.speed)}["root","target"].includes(i.type)||e.push(i.pos),this.updateUnvisitedChildren(i)}}}},{key:"fetchAllNodes",value:function(e){var t,i=[],r=n(e);try{for(r.s();!(t=r.n()).done;){var a,o=n(t.value);try{for(o.s();!(a=o.n()).done;){var s=a.value;i.push(s)}}catch(e){o.e(e)}finally{o.f()}}}catch(e){r.e(e)}finally{r.f()}return i}},{key:"fetchUnvisitedChildren",value:function(t){var i=this,r=[];return e.MOVES.forEach((function(e){var n=e[0],a=e[1],o=[t.pos[0]+n,t.pos[1]+a],s=o[0],l=o[1];if(t.board.validMove(o)){var d=i.grid[s][l].node;r.push(d)}})),r.filter((function(e){return!e.isVisited}))}},{key:"updateUnvisitedChildren",value:function(e){var t,i=n(this.fetchUnvisitedChildren(e));try{for(i.s();!(t=i.n()).done;){var r=t.value;"weight"===r.type?r.weight=e.weight+20:r.weight=e.weight+1,r.addParent(e)}}catch(e){i.e(e)}finally{i.f()}}},{key:"visualizeSearch",value:function(e,t,i,r){var n=this;0===e.searched.length?this.visualizePath(e,t,i):e.searched.length>0&&setTimeout((function(){var a=e.searched.shift();t[a[0]][a[1]].tileEle.classList.add("searched"),n.visualizeSearch(e,t,i,r)}),r)}},{key:"visualizePath",value:function(e,t,i){var r=this;if(0===i.length)e.board.algorithmStarted=!1;else if(i.length>0){var n=i.shift(),a=t[n[0]][n[1]].tileEle;setTimeout((function(){a.classList.remove("searched"),a.classList.add("path"),r.visualizePath(e,t,i)}),30)}}}])&&s(t.prototype,i),a&&s(t,a),e}();function d(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}l.MOVES=[[0,1],[1,0],[0,-1],[-1,0]];var h=function(){function e(t,i,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.board=t,this.pos=i,this.tileEle=document.createElement("div"),this.tileEle.id="".concat(i[0],"-").concat(i[1]),this.tileEle.classList.add("tile"),document.getElementById("grid").appendChild(this.tileEle),this.node=new l(t,i,r),this.addEventListeners()}var t,i,r;return t=e,(i=[{key:"addEventListeners",value:function(){var e=this,t=this.board;this.tileEle.addEventListener("click",(function(i){if(i.preventDefault(),!t.algorithmStarted){t.root.reset();var r=i.target.id.split("-"),n=r[0],a=r[1],o=t.grid[n][a];if(!["root","target"].includes(o.node.type)){if(i.shiftKey&&"dijkstra"===e.board.selectedAlgorithm){if("weight"===o.node.type)return o.tileEle.classList.remove("wall"),o.tileEle.classList.remove("weight"),o.node.type=null,void(o.node.weight=1/0);if("wall"===o.node.type||null==o.node.type)return o.tileEle.classList.remove("wall"),o.tileEle.classList.add("weight"),void(o.node.type="weight")}null===o.node.type||"weight"===o.node.type?(o.tileEle.classList.remove("weight"),o.tileEle.classList.add("wall"),o.node.type="wall",o.node.weight=1/0):(o.tileEle.classList.remove("wall"),o.tileEle.classList.remove("weight"),o.node.type=null,o.node.weight=1/0)}}})),this.tileEle.addEventListener("dragenter",(function(i){if(i.preventDefault(),!t.algorithmStarted&&!["root","target"].includes(t.draggedTileType)){t.root.reset();var r=i.target.id.split("-"),n=r[0],a=r[1],o=t.grid[n][a];if(i.shiftKey&&"dijkstra"===e.board.selectedAlgorithm){if("weight"===o.node.type)return o.tileEle.classList.remove("wall"),o.tileEle.classList.remove("weight"),o.node.type=null,void(o.node.weight=1/0);if("wall"===o.node.type||null==o.node.type)return o.tileEle.classList.remove("wall"),o.tileEle.classList.add("weight"),void(o.node.type="weight")}"wall"===o.node.type?(o.tileEle.classList.remove("wall"),o.tileEle.classList.remove("weight"),o.node.type=null,o.node.weight=1/0):null!==o.node.type&&"weight"!==o.node.type||(o.tileEle.classList.remove("weight"),o.tileEle.classList.add("wall"),o.node.type="wall",o.node.weight=1/0)}})),this.tileEle.addEventListener("drop",(function(e){e.preventDefault();var i=[t.root.pos,t.target.pos],r=e.target.id.split("-").map((function(e){return parseInt(e)})),n=r[0],a=r[1];if(i.includes(r)||["wall","weight"].includes(t.grid[n][a].node.type))return t.root.tile.classList.remove("hide"),void t.target.tile.classList.remove("hide");if("root"===t.draggedTileType)t.resetRoot(r);else{if("target"!==t.draggedTileType)return;t.resetTarget(r)}})),this.tileEle.addEventListener("dragstart",(function(e){if(!t.algorithmStarted){t.root.reset();var i=e.target.id.split("-"),r=i[0],n=i[1],a=t.grid[r][n].node.type;t.draggedTileType=a;var o=new Image,s=new Image,l=new Image;o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",s.src="./src/images/root_node.png",l.src="./src/images/target_node.png","root"===a?e.dataTransfer.setDragImage(s,10,10):"target"===a&&e.dataTransfer.setDragImage(l,10,10),["root","target"].includes(a)?["root","target"].includes(a)&&t.grid[r][n].tileEle.classList.add("hide"):e.dataTransfer.setDragImage(o,0,0)}})),this.tileEle.addEventListener("dragend",(function(e){t.root.tile.classList.remove("hide"),t.target.tile.classList.remove("hide")})),this.tileEle.addEventListener("dragover",(function(e){e.preventDefault()}))}}])&&d(t.prototype,i),r&&d(t,r),e}();function c(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return u(e,t)}(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,s=!1;return{s:function(){i=e[Symbol.iterator]()},n:function(){var e=i.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||null==i.return||i.return()}finally{if(s)throw a}}}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function g(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.grid=[],this.root,this.target,this.generateGrid(),this.validMove=this.validMove.bind(this),this.algorithmStarted=!1,this.selectedAlgorithm=null,this.speed=5,this.draggedTileType=null,this.resetRoot=this.resetRoot.bind(this),this.resetTarget=this.resetTarget.bind(this),this.randomizeWalls=this.randomizeWalls.bind(this)}var t,i,r;return t=e,(i=[{key:"generateGrid",value:function(){for(var e=0;e<27;e++){this.grid.push([]);for(var t=0;t<50;t++)if(13===e&&9===t){var i=new h(this,[13,9],"root");i.tileEle.classList.add("root"),i.tileEle.setAttribute("draggable","true"),i.node.weight=0,this.root=i.node,this.grid[e].push(i)}else if(13===e&&41===t){var r=new h(this,[13,41],"target");r.tileEle.classList.add("target"),r.tileEle.setAttribute("draggable","true"),this.target=r.node,this.grid[e].push(r)}else{var n=new h(this,[e,t],null);n.tileEle.setAttribute("draggable","true"),this.grid[e].push(n)}}}},{key:"randomizeWalls",value:function(){var e=this;if(!this.algorithmStarted){var t=[[0,1],[1,0],[0,-1],[-1,0]];this.clearWalls();for(var i=function(i){var r=Math.floor(27*Math.random()),n=Math.floor(50*Math.random()),a=e.grid[r][n].node,o=new Array;if(t.forEach((function(t){var i=t[0],r=t[1];o.push("".concat(e.root.pos[0]+i,"-").concat(e.root.pos[1]+r)),o.push("".concat(e.target.pos[0]+i,"-").concat(e.target.pos[1]+r))})),o.includes(a.tile.id))return"continue";null===a.type&&(a.type="wall",a.tile.classList.add("wall"))},r=0;r<550;r++)i()}}},{key:"clearWalls",value:function(){if(!this.algorithmStarted){var e,t=c(this.grid);try{for(t.s();!(e=t.n()).done;){var i,r=c(e.value);try{for(r.s();!(i=r.n()).done;){var n=i.value;["root","target"].includes(n.node.type)||(n.node.type=null,n.node.weight=1/0,document.getElementById("".concat(n.pos.join("-"))).classList.remove("wall"))}}catch(e){r.e(e)}finally{r.f()}}}catch(e){t.e(e)}finally{t.f()}}}},{key:"resetRoot",value:function(e){if(!this.algorithmStarted){var t=e[0],i=e[1];this.root.type=null,this.root.tile.classList.remove("hide"),this.root.tile.classList.remove("root"),this.root=this.grid[t][i].node,this.root.weight=0,this.root.type="root",this.root.tile.classList.add("root")}}},{key:"resetTarget",value:function(e){if(!this.algorithmStarted){var t=e[0],i=e[1];this.target.type=null,this.target.tile.classList.remove("hide"),this.target.tile.classList.remove("target"),this.target=this.grid[t][i].node,this.target.type="target",this.target.tile.classList.add("target")}}},{key:"validMove",value:function(e){var t=e[0],i=e[1];return t>=0&&t<27&&i>=0&&i<50&&"wall"!==this.grid[t][i].node.type}}])&&g(t.prototype,i),r&&g(t,r),e}();document.addEventListener("DOMContentLoaded",(function(){var e=new f,t=e.root,i=null,r=1,n=document.getElementById("algo-dropdown"),a=document.getElementById("speed-dropdown"),o=document.getElementById("algorithm-title"),s=document.getElementById("algorithm-info"),l=document.getElementById("randomize-button"),d=document.getElementById("clear-button"),h=document.getElementById("start-button"),c=document.getElementById("reset-button"),u=document.getElementById("modal"),g=document.getElementById("help-button"),y=document.getElementById("next-button"),p=document.getElementById("back-button"),v=document.getElementById("exit-button"),m=document.getElementById("modal-title"),b=(document.getElementById("modal-image"),document.getElementById("modal-text")),w=document.getElementById("modal-page-num"),E=document.getElementById("gif1"),L=document.getElementById("gif2"),k=document.getElementById("gif3");function A(){var t=document.getElementsByClassName("weight");Array.from(t).forEach((function(t){var i=t.id.split("-"),r=i[0],n=i[1],a=e.grid[r][n];a.tileEle.classList.remove("weight"),a.node.type=null,a.node.weight=1/0}))}function S(){t.reset()}function T(){switch(r){case 1:p.classList.add("hide-button"),y.classList.remove("hide-button"),m.innerHTML="Pick an algorithm and speed",E.style.display="block",L.style.display="none",k.style.display="none",gif4.style.display="none",gif5.style.display="none",b.innerHTML="Welcome to PathNavigator! Let's get started by selecting an algorithm and visualization speed from the dropdown menus at the bottom of the page (Fast is selected by default).",w.innerHTML="1/4";break;case 2:p.classList.remove("hide-button"),y.classList.remove("hide-button"),m.innerHTML="Draw or randomly generate walls",E.style.display="none",L.style.display="block",k.style.display="block",gif4.style.display="none",gif5.style.display="none",b.innerHTML="You can click or drag over blank tiles to place walls for the search algorithm to avoid. <br/> <br/> When using Dijkstra's Algorithm, hold down SHIFT while clicking and dragging to place weighted walls. <br/> <br/> Alternatively, you can use the <b>RANDOMIZE</b> button to generate random walls.* <br/> <br/> <i>*Pro tip: Use the <b>CLEAR</b> button to clear all of the walls on the board.</i>",w.innerHTML="2/4";break;case 3:p.classList.remove("hide-button"),y.classList.remove("hide-button"),m.innerHTML="Reposition the root and target nodes",E.style.display="none",L.style.display="none",k.style.display="none",gif4.style.display="block",gif5.style.display="none",b.innerHTML="Shake things up! Reposition the root and target nodes by clicking and dragging them to any empty tile on the board.",w.innerHTML="3/4";break;case 4:y.classList.add("hide-button"),m.innerHTML="Visualize the search algorithm",E.style.display="none",L.style.display="none",k.style.display="none",gif4.style.display="none",gif5.style.display="block",b.innerHTML="It's time to watch the magic of search algorithms in action! Click <start>START</start> to begin the visualization animation.* <br/> <br/> <i>*Pro tip: Click <reset>RESET</reset> to clear the visualization tiles once the algorithm is finished running (this won't remove any of the walls you've placed).</i>",w.innerHTML="4/4"}}n.addEventListener("change",(function(t){switch(i=t.target.value){case"bfs":A(),e.selectedAlgorithm="bfs",o.innerHTML="Breadth-First Search (BFS)",s.innerHTML="An unweighted pathfinding algorithm that explores all of the root node's direct neighbors before moving onto the next level of neighbors. BFS uses a queue data structure (first in, first out) to evaluate nodes. This approach guarantees discovery of the shortest path to the target node.";break;case"dfs":A(),e.selectedAlgorithm="dfs",o.innerHTML="Depth-First Search (DFS)",s.innerHTML="An unweighted pathfinding algorithm that picks one of the root node's direct neighbors and explores as far down the tree as possible before searching the next neighbor and repeating the same process. DFS uses a stack data structure (last in, first out). This approach won’t guarantee the shortest path, but can use less memory than BFS and is better suited for far away targets.";break;case"dijkstra":e.selectedAlgorithm="dijkstra",o.innerHTML="Dijkstra's Algorithm",s.innerHTML="<i>(Hold SHIFT and click/drag to place weighted walls)</i> <br></br> A weighted pathfinding algorithm that guarantees the shortest path from a source node to all other nodes in a graph with a shortest-path tree. It explores every neighbor and calculates their distance to the source node. Weighted walls have a higher cost (distance) to navigate through (think of them like high-traffic roads on a GPS), and are prioritized less when finding the shortest possible path with Dijkstra's algorithm."}})),a.addEventListener("change",(function(t){switch(t.target.value){case"slow":e.speed=30;break;case"medium":e.speed=15;break;case"fast":e.speed=5}})),h.addEventListener("click",(function(){if(!0===e.algorithmStarted)return;var t=e.root;switch(S(),i){case"bfs":e.algorithmStarted=!0,t.generateTree(),t.bfs();break;case"dfs":e.algorithmStarted=!0,t.generateTree(),t.dfs();break;case"dijkstra":e.algorithmStarted=!0,t.dijkstra();break;default:alert("Don't forget to pick an algorithm!")}})),c.addEventListener("click",S),d.addEventListener("click",(function(){e.clearWalls(),A(),S()})),l.addEventListener("click",(function(){S(),e.randomizeWalls()})),g.addEventListener("click",(function(){u.style.display="flex",r=1,T()})),y.addEventListener("click",(function(){r++,T()})),p.addEventListener("click",(function(){r--,T()})),v.addEventListener("click",(function(){u.style.display="none"})),T()}))}]);
//# sourceMappingURL=main.js.map