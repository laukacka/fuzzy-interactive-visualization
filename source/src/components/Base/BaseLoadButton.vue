<template>
  <b-button @click="loadData" variant="success">Nahrať</b-button>
</template>

<script>
    export default {
        name: "BaseLoadButton",
      props: {
          showData: false
      }
    }
</script>

<style scoped>

</style>
