<template>
  <div>
    <b-form-file class="dragAndDrop"
                 accept=".arff, .csv, .txt, .json"
                 size="lg"
                 :state="Boolean(file)"
                 browse-text='Browse'
                 v-bind:placeholder="nameOfPlaceHolder"
                 v-bind:drop-placeholder="nameOfDropPlaceHolder"
                 title=""
                 @change="loadTextFromFile"
    ></b-form-file>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dragAndDropCapable: false,
        nameOfPlaceHolder: 'Drag file here..',
        nameOfDropPlaceHolder: 'Drop file..',
        toParent: '',
        file: '',
      }
    },
    methods: {
      loadTextFromFile(ev) {
        const file = ev.target.files[0];
        this.file = file;
        const reader = new FileReader();
        this.toParent = file.name;
        this.emitToParent();
        reader.onload = e => this.$emit("load", e.target.result);
        reader.readAsText(file);
      },
      emitToParent() {
        this.$emit('childToParent', this.toParent);
      },
    }
  };
</script>

<style scoped>
  .dragAndDrop {
    margin: 0;
    width: 100%;
    text-align: left;
  }
</style>
