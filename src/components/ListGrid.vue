<template>
  <div class="grid-table">                
    <hr>

    <div id="draw-table">
		
  	</div>
		<hr>
  </div>
</template>

<script>
import EventBus from '../services/bus'

export default {
    name: 'ListGrid',
    data () {
        return {
            grids: [],
            numColumns: '',
            numRows: ''
        }
    },
    created: function() {
        EventBus.$on('add-grid', (fil, row) => {
            this.numColumns = fil;
            this.numRows = row;                        
            var codigoHTML="<table border=\"1\"><tbody>";
            for (var i = 0; i < this.numRows; i++) {
            codigoHTML+="<tr>";
            for (var j = 0; j < this.numColumns; j++) {
            codigoHTML+="<td WIDTH=\"55px\" HEIGHT=\"55px\"></td>";
            }
            codigoHTML+="</tr>";
            }
            codigoHTML+="</tbody></table>";
            document.getElementById("draw-table").innerHTML = codigoHTML;
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

tr:nth-child(even) {
	/* background-color: #dddddd; */
}

</style>
