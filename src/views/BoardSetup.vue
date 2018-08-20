<template>
	<div class="BoardSetup">
		<div class="content" id="dragula_tops">		
			<div class="board-containers">
				<table class="border-grid">
          <tr v-for="(row, rowIndex) in rows">
						<td class="border-grid spacess" v-for="(col, colIndex) in cols" :id="(rowIndex + 1)+'-'+(colIndex + 1)">
              <div class="container-drag" v-dragula="copyOne" :team-id="(rowIndex + 1)+'-'+(colIndex + 1)" bag="third-bag"  service="first">
                <div class="container-drop" v-cloak v-for="(competitor, index) in copyOne" :id="competitors.id" :index="index">
                  <img :src="require(`@/assets/${competitor.iconImage}`)" >
								</div>
							</div>
						</td>
					</tr>
				</table>
				<div class="row">
					<div class="panel-body">
						<h2 align="center">SHIPS</h2>
						<div class="row">
							<div class="wrapper-dragula">
								<div class="container-dragula" v-dragula="shipsArea" bag="third-bag" service="first">
									<div v-cloak v-for="(competitor, index) in shipsArea" :id="competitor.id" :index="index" :key="competitor.id">{{competitor.name}}
                    <img :src="require(`@/assets/${competitor.iconImage}`)" >
									</div>
								</div>
							</div>
						</div>
					</div>
			  </div>
		  </div>
	  </div>
	  <button>Rotate</button>
	  <button>Save</button>
	</div>
</template>
<script>
const UrlService = require("../config/Configuration").urlService;
const JoinPlayerGame = require("../services/JoinPlayerGame.js");

var names = JSON.parse(
  '[{"id":1,"name":"","iconImage": "ship2.png"},{"id":2,"name":"","iconImage": "ship3.png"},{"id":3,"name":"","iconImage": "ship3.png"},{"id":4,"name":"","iconImage": "ship4.png"},{"id":5,"name":"","iconImage": "ship5.png"}]'
);

export default {
  name: "BoardSetup",
  data() {
    return {
      team_id: 0,
      shipsArea: names,
      copyOne: [],
      cols: 5,
      rows: 5
    };
  },
  created() {    
    let dragula = this.$dragula;

    let service = dragula.createService({
      name: "first",
      drake: {
        copy: false
      }
    });
  },
  mounted() {
    this.getBoard().then(board => {
      this.cols = board.cols;
      this.rows = board.rows;
    });
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
    }
  }
};
</script>

<style>
.content {
  background-color: #242e42;
}

li {
  list-style-type: none;
}
.container-dragula {
  position: absolute;
  display: block;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  min-height: 50px;
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
  border: 1px solid red;
  position: relative;
  /* padding: 8px; */
  top: 0px;
}
img {
  height: 10px;
}

.spacess {
  height: 20px;
  width: 20px;
}

.container-drag {
  position: absolute;

  padding: 1px;
  top: 0px;
}
.container-drop {
  height: 25px;
  width: 25px;
}

.container-drag img {
  height: 20px;
  /* width: 20px; */
}
</style>
