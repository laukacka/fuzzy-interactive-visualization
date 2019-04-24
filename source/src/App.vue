<template>
  <div id="app">
    <div class="header">
      <link rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossorigin="anonymous">
      <router-link to="/">
        <img src="./assets/logo.png" alt="logo" title="Home">
      </router-link>
      <h4 class="header-text">{{ this.$store.getters.getHeader }}</h4>
    </div>

    <div class="my-body">
      <span>
        <router-view/>
      </span>
    </div>

    <p class="footer">
      Created by: <a href="mailto:jana.laukova5@gmail.com">Laukova</a>, Supervisor: <a href="https://chovancova.sk">Chovancova</a>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    }
  }
</script>

<style>
  body, html {
    height: 100%;
    display: grid;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: rgb(0, 0, 0);
    margin-top: 10px;
  }

  .header {
    position: fixed;
    top: 0;
    width: 100%;
  }

  .header-text {
    margin-top: 20px;
  }

  img {
    margin-top: 10px;
    width: 200px;
  }

  .my-body {
    height: 100%;
    display: grid;
  }

  span {
    margin-top: auto;
    margin-bottom: auto;
  }

  h4 {
    margin-top: 5px;
    cursor: context-menu;
  }

  h4:hover {
    text-shadow: 2px 1px rgba(0, 0, 0, 0.41);
    font-size: 25px;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
</style>
