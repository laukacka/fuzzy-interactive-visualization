export const loadFile = {
  methods: {
    loadFile: function (data) {
      if (data) {
        let suffix = '';
        if (typeof data === 'string') {
          console.log(data.lastIndexOf('.'));
          let indexOfDot = data.lastIndexOf('.');
          suffix = data.slice(indexOfDot, data.length);
        } else {
          let indexOfDot = data.name.lastIndexOf('.');
          suffix = data.name.slice(indexOfDot, data.name.length);
        }
        if (suffix === '.arff' || suffix === '.csv' || suffix === '.json' || suffix === '.txt' || suffix === '.xls') {
          this.loadData(suffix);
          this.$swal({
              type: 'success',
              title: 'Súbor bol úspešne načítaný.'
            }).then((result) => {
              if (result.value) {
                this.$router.push("methods");
              }
          })
        } else {
          this.$swal({
            type: 'error',
            title: 'Súbor má nesprávny typ!'
          });
          this.file = null;
        }
      } else {
        this.$swal({
          type: 'warning',
          title: 'Nebol vložený žiadny súbor!'
        })
      }
    }
  }
};
