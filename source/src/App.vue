<template>
  <div id="app">
    <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous">
    <router-link to="/">
      <img src="./assets/logo.png" alt="logo" title="Domov">
    </router-link>
    <h4>{{ this.$store.getters.getHeader }}</h4>
    <router-view/>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {
    }
  }
</script>

<style>
  img {
    margin-top: 10px;
    width: 30px;
    height: 30px;
  }

  h4:hover {
    text-shadow: 2px 1px rgba(0, 0, 0, 0.41);
    font-size: 25px;
  }

  h4 {
    margin-top: 5px;
    cursor: context-menu;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: rgb(0, 0, 0);
    margin-top: 10px;
  }
</style>
