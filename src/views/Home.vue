<template>
  <div class="home">  	
  	<h1>BATTLESHIP VUE-JS</h1>  	
    <div>
      <router-view/>
    </div>    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
};
</script>

<style>
.home {
  background-color: #e4e1e1;
  min-height: 500px;
  margin: 0;
}

h1 {
  margin: 0;
  padding: 25px;
}
</style>
