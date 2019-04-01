<template>
  <div>
  <div id="file-drag-drop">
    <form ref="fileForm">
      <span class="dropFiles">Premiestni  súbor sem!</span>
    </form>

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
      determineDragAndDropCapable(){
        /*
          Create a test element to see if certain events
          are present that let us do drag and drop.
        */
        let div = document.createElement('div');
        /*
          Check to see if the `draggable` event is in the element
          or the `ondragstart` and `ondrop` events are in the element. If
          they are, then we have what we need for dragging and dropping files.

          We also check to see if the window has `FormData` and `FileReader` objects
          present so we can do our AJAX uploading
        */
        return (( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div )) && 'FormData' in window && 'FileReader' in window;
      }
    },
    mounted(){
      /*
        Determine if drag and drop functionality is capable in the browser
      */
      this.dragAndDropCapable = this.determineDragAndDropCapable();

      /*
        If drag and drop capable, then we continue to bind events to our elements.
      */
      if (this.dragAndDropCapable) {
        /*
          Listen to all of the drag events and bind an event listener to each
          for the fileform.
        */
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach (function (evt) {
          /*
            For each event add an event listener that prevents the default action
            (opening the file in the browser) and stop the propagation of the event (so
            no other elements open the file in the browser)
          */
          this.$refs.fileForm.addEventListener(evt, function(e) {
            e.preventDefault();
            e.stopPropagation();
          }.bind(this), false);
        }.bind(this));
        /*
          Add an event listener for drop to the form
        */
        this.$refs.fileForm.addEventListener('drop', function(e) {
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

  div.file-listing{
    width: 400px;
    margin: auto;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  div.file-listing img{
    height: 100px;
  }
</style>
