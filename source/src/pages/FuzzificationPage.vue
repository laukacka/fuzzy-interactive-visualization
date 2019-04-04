<template>

  <div>
   <!-- <b-container>
      <b-row>
        <b-col>
          <fuzzification-table v-if="kjljlk"></fuzzification-table>
        </b-col>
        <b-col>
          <fuzzification-line-graph-item></fuzzification-line-graph-item>
        </b-col>
      </b-row>
    </b-container>-->
    TODO {{name}}
  </div>
</template>

<script>
    import FuzzificationTable from "@/components/Fuzzification/FuzzificationTable";
    import FuzzificationLineGraphItem from "@/components/Fuzzification/FuzzificationLineGraphItem";
    export default {
        name: "FuzzificationPage",
      components: {FuzzificationLineGraphItem, FuzzificationTable},
      data () {
        return {
          kjljlk: true,
          name: 'Fuzzification'
        }
      }
    }
</script>

<style scoped>

</style>
