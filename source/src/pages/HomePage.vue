<template>
  <div>
    <b-container id="home-container">
      <b-row align-v="center" align-h="center">
        <b-col>
          <h3 class="welcomeText">Welcome! </h3>
        </b-col>
      </b-row>

      <b-row align-v="center" align-h="center">
        <b-col md="6">
          <h5>to the interactive visualization of data acquired from algorithms of fuzzification and fuzzy
            clustering. </h5>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col md="3">
          <router-link to="/dataInput">
            <b-button id="startButton" variant="success">Get Started!</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: "HomePage",
    data() {
      return {
        slide: 0,
        sliding: null,
      }
    },
    methods: {},
    mounted() {
      this.$store.dispatch('loadHeader', ' ');
      this.$store.dispatch("loadIsShownArrow", false);

    }
  }
</script>

<style scoped>
  .welcomeText:hover {
    color: red;
  }

  .welcomeText {
    cursor: context-menu;
    font-size: 25px;
    text-shadow: 2px 1px rgba(0, 0, 0, 0.41);
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 50px;
  }

  #home-container {
    margin: auto;
  }

  h5 {
    font-size: 18px;
  }

  #startButton {
    margin-top: 30px;
  }
</style>
