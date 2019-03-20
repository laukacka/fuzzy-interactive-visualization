// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//defaultne importy:
import Vue from 'vue'
import App from './App'
import router from './router'

//importy pluginov:
import BootstrapVue from 'bootstrap-vue'
import VueNVD3 from 'vue-nvd3'
import VueGoodTablePlugin from 'vue-good-table'; //moja demo tabulka

//CSS importy pre pluginy:
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


//clastne CSS importy
import './assets/css/style.css'

//defaultne nieco:
Vue.config.productionTip = false;

//pouzitie samotnych pluginov:
Vue.use(BootstrapVue);
Vue.use(VueNVD3);
Vue.use(VueGoodTablePlugin);
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
