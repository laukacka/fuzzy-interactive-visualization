<template>
  <div>
    TODO
    <b-container>
      <b-row>
        <b-col>
          <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow" title="Metódy"></i>
          </router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="fuzzificationContainer">
      <b-row>
        <b-col md="6" class="coefficientContainer">
          <!-- <b-row> &lt;!&ndash;ak este nie he vykresleny graf&ndash;&gt;
             <b-col>
               <b-dropdown text="Vybrať stĺpec" dropright>
                 <b-dropdown-item v-for="column in this.$store.getters.getColumns" :key="column">{{column.label}}</b-dropdown-item>
               </b-dropdown>
             </b-col>
           </b-row>

           <b-row> &lt;!&ndash;ak uz je vykresleny graf&ndash;&gt;
             <b-col>
               <h5></h5>
             </b-col>
           </b-row>-->

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient a:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient b:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient c:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient d:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="2" style="padding: 0 0 0 5px">
              <h5 style="margin: 0">Min</h5>
              <h6>0</h6>
            </b-col>
            <b-col sm="7" style="padding: 0">
              <b-form-input v-model="value" type="range" min="0" max="69"></b-form-input>
            </b-col>
            <b-col sm="2" style="padding: 0 5px 0 0">
              <h5 style="margin: 0">Max</h5>
              <h6>69</h6>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <h4>Farba</h4>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <b-button>Vykresli</b-button>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="6">
          <fuzzification-line-chart></fuzzification-line-chart>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
  import FuzzificationTable from "@/components/Fuzzification/FuzzificationTable";
  import FuzzificationLineChart from "@/components/Fuzzification/FuzzificationLineChart";

  export default {
    name: "FuzzificationPage",
    components: {FuzzificationLineChart},
    data() {
      return {
        name: 'Fuzzification'
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Fuzzifikácia');
    }
  }
</script>

<style scoped>
  .fuzzificationContainer {
    margin-top: 100px;
  }

  .coefficientContainer {
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
  }

  .coefficientRow {
    margin-bottom: 5px;
  }
</style>
