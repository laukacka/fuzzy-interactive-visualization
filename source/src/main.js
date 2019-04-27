// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//defaultne importy:
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/store"

//importy pluginov:
import BootstrapVue from 'bootstrap-vue'
import VueNVD3 from 'vue-nvd3'
import VueGoodTablePlugin from 'vue-good-table';
import VueCarousel from '@chenfengyuan/vue-carousel';
import VueSweetalert2 from 'vue-sweetalert2';
import VueSlider from 'vue-slider-component';

//CSS importy pre pluginy:
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'
import 'vue-slider-component/theme/default.css'
import 'nvd3/build/nv.d3.min.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

//vlastne CSS importy
import './assets/css/style.css'

//defaultne nieco:
Vue.config.productionTip = false;

//pouzitie samotnych pluginov:
Vue.use(BootstrapVue);
Vue.use(VueNVD3);
Vue.use(VueGoodTablePlugin);
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);
Vue.component(VueCarousel.name, VueCarousel);
Vue.component('vue-slider', VueSlider);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
