<template>
  <div class="GridSetup">
    <div class = "form-table">
      <div>
        <span>number of columns</span>
      </div>
      <div>
        <input type="number" v-model.number="columns" id="numColumms" @keyup="updateGridValue()" @change="updateGridValue()">
      </div>
      <div>
        <span>number of rows</span>
      </div>
      <div>
        <input type="number" v-model.number="rows" id="numRows" @keyup="updateGridValue()" @change="updateGridValue()">
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
        <button type="button" name="buttonJoin"  v-on:click="JoinPlayer">Join</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../services/bus';
import GameService from '../services/game';

export default {
  name: 'GridSetup',
  data() {
    return {
      columns: 10,
      rows: 10,
      tokenPlayer: '',
    };
  },
  methods: {
    updateGridValue() {
      if (
        parseInt(this.columns, 10) >= 10 &&
        parseInt(this.columns, 10) <= 30 &&
        parseInt(this.rows, 10) >= 10 &&
        parseInt(this.rows, 10) <= 30
      ) {
        EventBus.$emit('size-change', {
          columns: this.columns,
          rows: this.rows,
        });
      } else {
        if (parseInt(this.columns, 10) <= 10 || parseInt(this.columns, 10) >= 30) {
          this.columns = 10;
        }
        if (parseInt(this.rows, 10) <= 10 || parseInt(this.rows, 10) >= 30) {
          this.rows = 10;
        }
      }
    },
    addGrid() {
      EventBus.$emit('size-change', {
        columns: this.columns,
        rows: this.rows,
      });

      GameService.getCreateGame(this.columns, this.rows)
        .then((response) => {
          console.log(response);
          this.tokenPlayer = response.data.session;
          EventBus.$emit('mapBoard-setup', {
            id: response.data.Id,
            playerId: response.data.playerId,
            rows: this.rows,
            columns: this.columns,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    JoinPlayer() {},
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
