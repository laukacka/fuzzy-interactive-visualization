<template>
  <div>
    <div class="arrow-left">
      <router-link to="/dataInput"><i class="fas fa-angle-double-left fa-3x backArrow" title="Loading data"></i>
      </router-link>
    </div>
    <b-container class="method-container">
      <b-row>
        <b-col>
          <h3>What do you want to do with the loaded data?</h3>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col md="3" cols="4" style="padding: 0 5px 0 10px">
          <router-link to="/fuzzification">
            <b-button class="buttons" variant="secondary">Fuzzification</b-button>
          </router-link>
        </b-col>
        <b-col md="3" cols="4" style="padding: 0 5px 0 10px">
          <router-link to="/fuzzyClustering">
            <b-button class="buttons" variant="warning">Fuzzy clustering</b-button>
          </router-link>
        </b-col >
        <b-col md="3" cols="4" style="padding: 0 10px 0 10px">
          <router-link to="/originalData">
            <b-button class="buttons" variant="secondary">Original data</b-button>
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
      this.$store.dispatch('loadHeader', ' ');
      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          allowOutsideClick: false,
          title: 'Please, try again.'
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
  .method-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 27%;
    margin: auto;
  }

  .buttons {
    height: 120px;
    width: 100%;
    padding: 0;
  }

  h3 {
    cursor: context-menu;
    margin-bottom: 50px;
  }

  h3:hover {
    color: #06aa19;
  }
</style>
