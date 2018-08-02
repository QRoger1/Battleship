<template>
    <div id="app">
      
      <div class="view-grid">
        <list-grid></list-grid>
      </div>
      <div class="form-grid">
        <add-grid></add-grid>        
      </div>              
    </div>
</template>

<script>
import AddGrid  from '../components/AddGrid'
import ListGrid from '../components/ListGrid'

export default {
    name: 'App',
    components: {
        AddGrid, ListGrid
    }
}
</script>

<style>
.form-grid {
  width: 30%;
  float: left;
  background-color: #cccccd;
  min-height: 600px;
}

.view-grid {
  width: 70%;
  float: left;
  background-color: #dbd063;
  min-height: 600px;
}

</style>

