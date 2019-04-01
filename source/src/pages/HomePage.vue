<template>
  <div>
    <h3 class="welcomeText">Vitajte na stránke <br>
      pre interaktívnu vizualizáciu dát <br>
      získaných z algoritmov <br>
      fuzzifikácie a fuzzy zhlukovania.</h3>

    <router-link  to="/dataInput">
      <b-button id="tlacidko" variant="success">Začni s vizualizáciou..</b-button>
    </router-link>
    <b-container class="">
      <b-row>
        <b-col offset-lg="2" offset-md="2" md="8" lg="8">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="5000"
            controls
            indicators
            background=""
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #f31af3;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide
              caption="Vizualizuj"
              text="Fuzzy zhlukovanie"
              img-src="https://picsum.photos/1024/480/?image=52"
            ></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
              <h1>Fuzzifikacia!</h1>
            </b-carousel-slide>


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
          </b-carousel>
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
  h3{
    padding-top: 50px;
    margin-bottom: 70px;
  }
  #tlacidko{
    margin-bottom: 50px;
  }
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
