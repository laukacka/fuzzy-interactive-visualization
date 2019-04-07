<template>
  <div id="app">
    <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous">
      <router-link to="/"> <img src="./assets/logo.png" alt="logo"></router-link>

      <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return {
      msgCurrentPage: 'Domov'
    }
  }

}
</script>

<style>
  img {
    width: 30px;
    height: 30px;
  }
  img:hover {
    background-color: yellow;

  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: rgb(0, 0, 0);
  margin-top: 10px;
}
</style>
