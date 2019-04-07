<template>
  <div>
    <div class="backArrowWrapper">
      <router-link to="/dataInput"><i class="fas fa-angle-double-left fa-3x backArrow"></i></router-link>
    </div>
    <!--class="containerFluid"-->
    <b-container class="methodsContainer">
      <b-row>
        <b-col>
          <h3>Čo si prajete vykonať s načítanými dátami? </h3>
        </b-col>
      </b-row>
      <b-row>
        <!--<b-col offset-md="1" md="10" >
              <b-button>xxxx</b-button>
          <b-button>xsssssxxx</b-button>
          <b-button>xxxaaaaax</b-button>
        </b-col>-->
        <!--TODO -> buttony dokoncit nejak rozumne.. a centrovanie na stred!!-->
        <b-col offset-md="1" md="2">
          <router-link to="/fuzzification">
            <b-button class="buttons" variant="secondary">Fuzzifikácia</b-button>
          </router-link>
        </b-col>
        <b-col offset-md="2" md="2">
          <router-link to="/fuzzyClustering">
            <b-button class="buttons" variant="warning">Fuzzy zhlukovanie</b-button>
          </router-link>
        </b-col>
        <b-col offset-md="2" md="2">
          <router-link to="/statistics">
            <b-button class="buttons" variant="dark">Štatistika</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: "MethodsPage",
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .buttons {
    margin: 5px;
    height: 100px;
    width: 120px;
    /*background-color: red;*/
  }

  .methodsContainer {
    margin-top: 10%;
  }

  h3 {
    margin-bottom: 50px;
  }

  h3:hover {
    color: #06aa19;
  }
</style>
