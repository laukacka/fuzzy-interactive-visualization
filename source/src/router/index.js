import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage';
import DataInputPage from "../pages/DataInputPage"
import MethodsPage from "../pages/MethodsPage"
import FuzzificationPage from "../pages/FuzzificationPage"
import FuzzyClusteringPage from "../pages/FuzzyClusteringPage"
import OriginalDataPage from "../pages/OriginalDataPage"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/dataInput',
      name: 'DataInputPage',
      component: DataInputPage
    },
    {
      path: '/methods',
      name: 'MethodsPage',
      component: MethodsPage
    },
    {
      path: '/fuzzification',
      name: 'FuzzificationPage',
      component: FuzzificationPage
    },
    {
      path: '/fuzzyClustering',
      name: 'FuzzyClusteringPage',
      component: FuzzyClusteringPage
    },
    {
      path: '/originalData',
      name: 'OriginalDataPage',
      component: OriginalDataPage
    }
  ]
});
