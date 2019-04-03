<template>
  <div>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Pretiahni súbor alebo klikni sem!"
      drop-placeholder="Pretiahni súbor sem!"
    ></b-form-file>
    <p>
      Načítané môžu byť len súbory typu arff, csv, txt a json.
    </p>
    <b-button variant="success" @click="loadFile" class="loadButton">
      Načítaj súbor
    </b-button>
  </div>
</template>

<script>
  export default {
    name: "LoadFromFile",
    data() {
      return {
        successfullyLoad: false,
        file: null,
        dragAndDropCapable: false,
      }
    },
    methods: {
      loadFile() {
        if (this.file) {
          this.$swal('Súbor ' + this.file.name + ' bol úspešne načítaný!');
          console.log(this.file);
        } else {
          this.$swal({
            type: 'error',
            title: 'Uups..',
            text: 'Niečo sa pokazilo :('
          })
        }
      }
    }
  }
</script>

<style scoped>
  p {
    margin: 0;
    margin-top: 10px;
  }

  .loadButton {
    margin-top: 10px;
  }
</style>
