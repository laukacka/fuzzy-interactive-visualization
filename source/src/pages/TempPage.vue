<template>
    <div>
      <b-textarea rows="10" v-model="text"></b-textarea>
      <br>
      <file-reader @load="text = $event"></file-reader>

      {{text.split('@DATA')[1].split('\n')[1].split(',')}}
    </div>
</template>

<script>
  import FileReader from "./FileReader";

  export default {
    data: () => ({ text: "" }),
    components: {
      FileReader
    }
  };
</script>
