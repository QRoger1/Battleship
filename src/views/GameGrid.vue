<template>
  <div class="GameGrid">
    <div class="view-grid">
      <grid></grid>
    </div>
    <div class="form-grid">
      <grid-setup></grid-setup>
    </div>
  </div>
</template>

<script>
import GridSetup  from '../components/GridSetup';
import Grid from '../components/ListGrid';

export default {
  name: 'GameGrid',
  components: {
    GridSetup,
    Grid,
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
