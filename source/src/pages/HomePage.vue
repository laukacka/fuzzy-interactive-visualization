<template>
  <div>
    <h3 class="welcomeText">Vitajte na stránke <br>
      pre interaktívnu vizualizáciu dát <br>
      získaných z algoritmov <br>
      fuzzifikácie a fuzzy zhlukovania.</h3>
    <router-link to="/dataInput">
      <b-button id="startButton" variant="success">Vizualizovať</b-button>
    </router-link>
    <!--<b-container class="homeCarousel">
      <b-row>
        <b-col offset-lg="2" offset-md="2" md="8" lg="8">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background=""
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #0f193c;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            &lt;!&ndash;TODO -> dokoncit rozumnejsie carousel (cez v-for)&ndash;&gt;
            <b-carousel-slide
              caption="Fuzzy zhlukovanie"
              text="Vizualizuj"
              img-src="https://picsum.photos/1024/480/?image=52"
            ></b-carousel-slide>
            <b-carousel-slide
              caption="Fuzzifikácia"
              text="Vizualizuj"
              img-src="https://picsum.photos/1024/480/?image=54"
            ></b-carousel-slide>
            <b-carousel-slide
              caption="Štatistika"
              text="Vizualizuj"
              img-src="https://picsum.photos/1024/480/?image=52"
            ></b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
    </b-container>-->
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
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', ' ');
    }
  }
</script>

<style scoped>
  h3{
    padding-top: 100px;
    margin-bottom: 50px;
  }

  #startButton {
    margin-bottom: 50px;
  }

  .welcomeText:hover {
    color: red;
  }

  .welcomeText {
    cursor: context-menu;
    font-size: 25px;
    margin-top: 10px;
    text-shadow: 2px 1px rgba(0, 0, 0, 0.41);
  }

  .homeCarousel {
    margin-bottom: 10px;
  }
</style>
