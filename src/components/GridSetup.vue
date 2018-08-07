<template>
  <div class="GridSetup">
    <div class = "form-table">
      <div>
        <span>number of columns</span>
      </div>       
      <div>
        <input type="number" v-model.number="columns" id="numColumms">
      </div>
      <div>
        <span>number of rows</span>
      </div>       
      <div>
        <input type="number" v-model.number="rows" id="numRows">
      </div>        
      <div>
        <button type="button" name="button" v-on:click="addGrid">Insert Grid</button>        
      </div>        
    </div>
    <hr>
    <div class="form-table">
      <div>          
        <span>Token player two</span>
      </div>       
      <div>
        <span>{{tokenPlayer}}</span>
      </div>
      <div>
        <button type="button" name="buttonJoin">Join</button>        
      </div>
    </div>             
  </div>
</template>

<script>
import EventBus from "../services/bus";
import GameService from '../services/game.js';

export default {
  name: "GridSetup",
  data() {
    return {
      columns: '0',
      rows: '0',
      tokenPlayer: '',      
    };
  },
  methods: {
    addGrid() {
      EventBus.$emit("size-change", {
        columns : this.columns,
        rows : this.rows
      });

      GameService.getCreateGame(
        this.columns,
        this.rows,
      )
		  .then(data => {
        if(data['Success'] === true) {		        
          this.tokenPlayer = data.Game.Player2;
		    } else {		        
		      alert(data['Message']);
		    }
		  })
		  .catch(error => {
        alert(error);
      });      
    },    
  },
};
</script>

<style>

.form-table {
  margin-top: 50px;
}

spam {
  margin-top: 15px;
  margin-bottom: 15px;
}

input {
  margin-top: 15px;
  margin-bottom: 15px;
}

.inputResponse {
  width: 80%;
  color: green;
}

</style>
