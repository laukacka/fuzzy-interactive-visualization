<template>
  <div>
    <h1>{{ msg }}</h1>
    <router-link to="/demoTable">
      <b-button variant="warning">Demo table</b-button>
    </router-link>
    <!--<router-link to="/demoCharts">
      <b-button variant="success">Demo charts</b-button>
    </router-link>-->
    <router-link to="/example">
      <b-button variant="danger">Example</b-button>
    </router-link>
     <router-link to="/blbost">
      <b-button variant="primary">Blbost</b-button>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome on my page. Enjoy it :)'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-weight: normal;
    color: #0037ff;
  }
</style>
