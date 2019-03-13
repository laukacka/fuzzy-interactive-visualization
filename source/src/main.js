// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
// tuto su importy pluginov
import BootstrapVue from 'bootstrap-vue'
import VueNVD3 from 'vue-nvd3'
import VueGoodTablePlugin from 'vue-good-table';

//tuto su importy css pre plaginy
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'

//tuto bude import vlastnych css stylov

//defaltne nieco
Vue.config.productionTip = false;

// pouzitie pluginov

Vue.use(BootstrapVue);
Vue.use(VueNVD3);
Vue.use(VueGoodTablePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, BootstrapVue,  VueGoodTablePlugin},
  template: '<App/>'
});


