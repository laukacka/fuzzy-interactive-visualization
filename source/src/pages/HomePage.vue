<template>
  <div>
    <b-container class="">
      <b-row>
        <b-col offset-lg="2" offset-md="2" md="8" lg="8">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="2000"
            controls
            indicators
            background=""
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              caption="First slide"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              img-src="https://picsum.photos/1024/480/?image=52"
            ></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
              <h1>Hello world!</h1>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <b-carousel-slide>
              <img
                slot="img"
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="https://picsum.photos/1024/480/?image=55"
                alt="image slot"
              >
            </b-carousel-slide>

            <!-- Slide with blank fluid image to maintain slide aspect ratio -->
            <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
              </p>
            </b-carousel-slide>
          </b-carousel>
          <!--<p class="mt-4">
            Slide #: {{ slide }}<br>
            Sliding: {{ sliding }}
          </p>-->
        </b-col>
      </b-row>
    </b-container>

    <!--<img src="../assets/logo.png" alt="logo">-->
    <p class="welcomeText">Vitajte na stránke pre interaktívnu vizualizáciu dát získaných z algoritmov fuzzifikácie a
      fuzzy zhlukovania.</p>
    <router-link to="/dataInput">
      <b-button variant="success">Začni s vizualizáciou..</b-button>
    </router-link>
    <!--<b-button v-for='page in pages' v-on:click='currentPage = page' :key="page.id">
      {{ page.replace('Page', '') }}
    </b-button>
    <component v-bind:is='currentPage'></component>-->
  </div>
</template>

<script>
  import FuzzyClusteringPage from "@/pages/FuzzyClusteringPage";
  import HelpPage from "@/pages/HelpPage";
  import StatisticsPage from "@/pages/StatisticsPage";
  import DataInputPage from "@/pages/DataInputPage";
  import FuzzificationPage from "@/pages/FuzzificationPage";
  import MethodsPage from "@/pages/MethodsPage";

  export default {
    name: "HomePage",
    components: {MethodsPage, FuzzificationPage, DataInputPage, StatisticsPage, HelpPage, FuzzyClusteringPage},
    data() {
      return {
        slide: 0,
        sliding: null,
        currentPage: 'DataInputPage',
        pages: ['MethodsPage', 'FuzzificationPage', 'DataInputPage', 'StatisticsPage', 'HelpPage', 'FuzzyClusteringPage'],
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
  /*img {
    margin-top: 5%;
    width: 400px;
    height: 350px;
  }

  img:hover {
    opacity: 0.3;
  }*/

  .welcomeText:hover {
    color: red;
  }

  .welcomeText {
    font-size: 25px;
    margin-top: 10px;
    text-shadow: 2px 1px rgba(0, 0, 0, 0.41);
  }
</style>
