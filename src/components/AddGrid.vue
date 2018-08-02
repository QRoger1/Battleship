<template>
    <div>
      <div class="form-table"> 
        <div>
          <span>number of columns</span>
        </div>       
        <div>
          <input type="text" name="" value=""  id="numColumms">
        </div>
        <div>
          <span>number of rows</span>
        </div>       
        <div>
          <input type="text" name="" value=""  id="numRows">
        </div>
        
        <div>
          <button type="button" name="button" v-on:click="addGrid">Insert Grid</button>        
        </div>        
      </div>

      <hr>
      <div class="form-table">
        <div>
          <span>number of rows</span>
        </div>       
        <div>
          <input class="inputResponse" type="text" name="" value=""  id="TokenPlayer">
        </div>
        <div>
          <button type="button" name="buttonJoin" v-on:click="GameJoin">Join</button>        
        </div>
      </div>             
    </div>
</template>

<script>
import EventBus from "../services/bus";
import ServicesGame from '../services/game-create.js';

export default {
  name: "AddGrid",
  data() {
    return {
      grid: "",
      newGame : ''      
    };
  },
  methods: {
    addGrid: function() {
      var numColumn=parseInt(document.getElementById("numColumms").value);
      var numRow=parseInt(document.getElementById("numRows").value);
      // alert(numColumn);

      if(isNaN(numColumn) || isNaN(numRow)) {
        alert("Ingrese rangos mayores a 0");
        return;
      }
      EventBus.$emit("add-grid", numColumn, numRow);
      this.grid = "";

      ServicesGame.getCreateGame(numColumn, numRow)
		    .then(data => {
		      console.log(data);
		      if(data['Success'] === true) {
		        console.log(data['Message']);		        
            this.newGame = data.Game;
            document.getElementById("TokenPlayer").value = this.newGame.Player2;
		      } else {
		        console.log(data['Message']);
		        alert(data['Message']);
		      }
		    })
		    .catch(error => {
		      console.log(error);
		      alert(error);
		    })

    }
  }
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
