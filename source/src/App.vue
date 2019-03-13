<template>

  <div id="app">
    <router-link to="/"> <img src="./assets/logo.png"></router-link>
    <h1>Interactive visualizations fuzzy </h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #041;
  margin-top: 10px;
}
</style>
