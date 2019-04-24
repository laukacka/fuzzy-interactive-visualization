<template>
  <div>
    <div class="arrow-left">
      <router-link to="/dataInput"><i class="fas fa-angle-double-left fa-3x backArrow" title="Loading data"></i>
      </router-link>
    </div>
    <b-container class="methodsContainer">
      <b-row>
        <b-col>
          <h3>What do you want to do with the loaded data?</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <router-link to="/fuzzification">
            <b-button class="buttons" variant="secondary">Fuzzification</b-button>
          </router-link>
        </b-col>
        <b-col cols="4">
          <router-link to="/fuzzyClustering">
            <b-button class="buttons" variant="warning">Fuzzy clustering</b-button>
          </router-link>
        </b-col >
        <b-col cols="4">
          <router-link to="/statistics">
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
      this.$store.dispatch('loadHeader', 'Interactive visualization');
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
  .buttons {
    height: 100px;
    width: 100%;
    font-size: small;
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
