<template>

  <div id="app">
    <router-link to="/"> <img src="./assets/logo.png"></router-link>
    <p>tuto menis to ako to vyzera pr</p>
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
