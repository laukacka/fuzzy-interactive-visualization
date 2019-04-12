<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <router-link to="/dataInput"><i class="fas fa-angle-double-left fa-3x backArrow" title="Načítanie dát"></i>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="methodsContainer">
      <b-row>
        <b-col>
          <h3>Čo si prajete vykonať s načítanými dátami? </h3>
        </b-col>
      </b-row>
      <b-row>
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
            <b-button class="buttons" variant="secondary">Štatistika</b-button>
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
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Interaktívna vizualizácia');
      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          title: 'Znovu načítaj dáta.'
        }).then((result) => {
          if (result.value) {
            this.$router.push("dataInput");
          }
        })
      }
    }
  }
</script>

<style scoped>
  .buttons {
    margin: 5px;
    height: 120px;
    width: 120px;
  }

  .methodsContainer {
    margin-top: 100px;
  }

  h3 {
    cursor: context-menu;
    margin-bottom: 50px;
  }

  h3:hover {
    color: #06aa19;
  }
</style>
