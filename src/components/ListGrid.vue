<template>
  <div class="grid-table">                
    <hr>
    <div id="draw-table">
      <table id="grid">
        <tr v-for="row in rows">
          <td v-for="column in columns" :key="column * row"></td>
        </tr>      
      </table>
  	</div>
		<hr>
  </div>
</template>

<script>
import EventBus from '../services/bus';

export default {
  name: 'Grid',
  data () {
    return {
      columns: '',
      rows: ''
    }
  },
  created() {
    EventBus.$on('size-change', (data) => {
      this.columns = data.columns;
      this.rows = data.rows;
    });
  },
}
</script>

<style>
.grid-table {
	margin: auto;
	align-content: center;
}

table {
	font-family: arial, sans-serif;
	width: 50%;
}

td, th {
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
}

#grid {
  border: 1px solid black;
}
</style>
