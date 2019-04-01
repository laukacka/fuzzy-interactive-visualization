<template>
  <div>
    <div id="file-drag-drop">
      <form ref="fileForm">
        <span class="dropFiles">Premiestni  súbor sem!</span>
      </form>

      <b-form-file
        v-model="ourFileToLoad"
        :state="Boolean(file)"
        placeholder="Choose a file... or drag your file"
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <b-button @click="loadFileours">
        Nacitaj subor
      </b-button>
      <span v-if="!determineDragAndDropCapable">

    </span>

    </div>
    <div v-for="(file, key) in files" class="file-listing">
      <img class="preview" v-bind:ref="'preview'+parseInt( key )"/>
      {{ file.name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoadFromFile",
    data() {
      return {
        successfullyLoad: false,
        ourFileToLoad: null,
        dragAndDropCapable: false,
        files: []
      }
    },
    methods: {
      loadFileours() {
        if(this.ourFileToLoad){
          this.$swal('Mame subor!!! More - ' + this.ourFileToLoad.name);
          console.log(this.ourFileToLoad);
        }else{
          this.$swal({   type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        })
        }

      },
      determineDragAndDropCapable() {
        let div = document.createElement('div');

        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
      }
    },
    mounted() {
      this.dragAndDropCapable = this.determineDragAndDropCapable();
      if (this.dragAndDropCapable) {
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
          this.$refs.fileForm.addEventListener(evt, function (e) {
            e.preventDefault();
            e.stopPropagation();
          }.bind(this), false);
        }.bind(this));
        this.$refs.fileForm.addEventListener('drop', function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            this.files.push(e.dataTransfer.files[i]);
          }
        }.bind(this));
      }
    },
  }
</script>

<style scoped>
  form {
    display: block;
    height: 300px;
    width: 400px;
    background: #afcc99;
    margin: auto;
    text-align: center;
    line-height: 300px;
    border-radius: 4px;
  }

  div.file-listing {
    width: 400px;
    margin: auto;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  div.file-listing img {
    height: 100px;
  }
</style>
