<template>
  <div id="app">
    <router-link to="/"> <img src="./assets/logo.png"></router-link>
    <h1>Interactive fuzzy visualizations</h1>
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
  color: rgb(0, 0, 0);
  margin-top: 10px;
}
</style>
<!-- COMMENT
  background-image: url('./assets/background.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
 -->
