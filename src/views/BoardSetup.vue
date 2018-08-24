<template>
<div class="BoardSetup">
<div class="SetupDragula">
    <table class="table-style" >
      <tr v-for="(row, rowIndex) in rows" v-bind:key=row>
				<td 
          width="20px" 
          class="border-grid" 
          v-for="(col, colIndex) in cols" 
          :id="(rowIndex + 1)+'-'+(colIndex + 1)" 
          :key="(rowIndex + 1)+'-'+(colIndex + 1)" 
          v-on:click="rotateArea((rowIndex + 1)+'-'+(colIndex + 1))">
          
        </td>
			</tr>
    </table>
    <div class="space-table">

    </div>
    <div class="conteiner-ships">
      <span>TYPE SHIPS</span>
      <div class="row">
				<div class="wrapper-dragula">
					<div class="container-dragula" id="shipSetups">
            <div class="list-ships" v-cloak v-for="(competitor, index) in shipsArea" :id="competitor.id" :index="index" :key="competitor.id">
              <div class="list-ships img-ship">
                <img :src="require(`@/assets/${competitor.iconImage}`)" >
              </div>
		        </div>
          </div>
        </div>
      </div>
    </div>
    <button class="button button-rotate" v-on:click="SetRotate">{{rotate}} Rotate</button>
	  <button class="button button-save">Save</button>
  </div>
</div>
    
</template>

<script>
import EventBus from '../services/bus';
const UrlService = require("../config/Configuration").urlService;
const JoinPlayerGame = require("../services/JoinPlayerGame.js");
import * as dragula from "dragula";

var nameShips = JSON.parse(
  '[{"id":1,"name":"ss","iconImage": "ship2.png"},{"id":2,"name":"","iconImage": "ship3.png"},{"id":3,"name":"","iconImage": "ship3.png"},{"id":4,"name":"","iconImage": "ship4.png"},{"id":5,"name":"","iconImage": "ship5.png"}]'
);

export default {
  name: "BoardSetup",
  data() {
    return {
      shipsArea: nameShips,
      cols: 10,
      rows: 10,
      rotate: "↓",
      ships: new Map()
    };
  },
  mounted() {
    this.getBoard();      
    this.getShipsGrid();
  },
  methods: {
    getBoard() {      
      EventBus.$on("mapBoard-setup", data => {
        if (data === null) {
          JoinPlayerGame.getJoinGame().then(response => {
            EventBus.$emit("mapBoard-setup", response.data);
          });
        } else {
          this.cols = data.columns;
          this.rows = data.rows;
        }
      });
    },
    getShipsGrid() {
      const listCase = [];
      listCase.push(document.getElementById("shipSetups"));
      for (let i = 1; i <= this.rows; i++) {
        for (let j = 1; j <= this.cols; j++) {
          listCase.push(document.getElementById(`${i}-${j}`));
        }
      }

      dragula(listCase)
        .on("drag", function(el) {
          el.className = el.className.replace("ex-moved", "");
        })
        .on("drop", function(el) {
          el.className += " ex-moved";
        })
        .on("over", function(el, container) {
          container.className += " ex-over";
        })
        .on("out", function(el, container) {
          container.className = container.className.replace("ex-over", "");
        });
    },
    rotateArea(idRegion) {
      if (
        document.getElementById(idRegion).style.transform === "rotateZ(90deg)"
      ) {
        document.getElementById(idRegion).style.transform = "rotateZ(0deg)";
      } else {
        document.getElementById(idRegion).style.transform = "rotateZ(90deg)";
      }
    },
    SetRotate() {
      if (this.rotate === "↓") {
        this.rotate = "→";
      } else {
        this.rotate = "↓";
      }
    }
  }
};
</script>

<style>
.space-table {
  height: 50px;
}

.border-grid {
  border: 1px solid rgba(21, 6, 75, 0.945) !important;
  height: 20px;
  width: 20px;
  flex: 0 0 20px;
  position: relative;
  top: 0;
}

.border-grid .list-ships .img-ship {
  height: 20px;
}

.border-grid .list-ships .img-ship img {
  height: 100%;
  position: absolute;
}

.border-grid:hover {
  background-color: yellowgreen;
  opacity: 0.5;
  border-color: teal;
}

.img-ship {
  height: 36px;
  position: absolute;
  top: 0;
  left: 0;
}

img {
  height: 36px;
}

.table-style {
  font-family: arial, sans-serif;
  width: auto;
}
td {
  max-width: 20px;
}
.list-ships {
  position: relative;
}

.container-dragula {
  display: block;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  min-height: 50px;
  min-width: 250px;
  width: 300px;
  align-content: center;
  border: 1px solid yellowgreen;
}
.container-dragula:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.03);
}
.container-dragula div,
.gu-mirror {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s ease-in-out;
}
.container-dragula div {
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  margin-bottom: 10px !important;
  border-radius: 6px;
}
.container-dragula div:last-child {
  margin-bottom: 0 !important;
}
.gu-mirror {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
.container-dragula .ex-moved {
  background-color: #e74c3c;
}
.container-dragula.ex-over {
  background-color: rgba(255, 255, 255, 0.3);
}
.handle {
  padding: 0 5px;
  margin-right: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: move;
}
.container-dragula .scale-transition {
  overflow: hidden;
  height: 40px;
  transition: height 0.2s;
}
.container-dragula .scale-enter {
  height: 0px;
}
.container-dragula .scale-leave {
  height: 0px;
}
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}
.gu-hide {
  display: none !important;
}
.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
.gu-transit {
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}

.border-grid {
  position: relative;
  padding: 0px;
  top: 0px;
}

.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button-rotate {
  background-color: #4caf50;
  color: white;
  border: 2px solid white;
}

.button-rotate:hover {
  background-color: rgb(9, 114, 36);
  color: black;
}

.button-save {
  background-color: #4caf50;
  color: white;
  border: 2px solid white;
}

.button-save:hover {
  background-color: rgb(9, 114, 36);
  color: black;
}
</style>
