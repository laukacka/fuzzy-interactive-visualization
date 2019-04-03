<template>
  <div>
    <b-form-file class="dragAndDrop"
                 accept=".arff, .csv, .txt, .json"
                 v-model="file"
                 :state="Boolean(file)"
                 browse-text="Klikni sem"
                 v-bind:placeholder="nameOfPlaceHolder"
                 v-bind:drop-placeholder="nameOfDropPlaceHolder"
    ></b-form-file>
    <p>
      Načítané môžu byť len súbory .arff, .csv, .json, .txt a .xls.
    </p>
    <b-button class="loadButton" variant="danger" @click="file = null">Vymaž súbor</b-button>

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
        nameOfPlaceHolder: 'Potiahni súbor sem...',
        nameOfDropPlaceHolder: 'Pusti súbor...'
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

  .dragAndDrop {
    width: 100%;
  }

  .loadButton {
    margin-top: 10px;
  }
</style>
