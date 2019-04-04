import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import DemoTable from '@/components/DemoTable';
import DemoCharts from '@/components/DemoCharts';
import Example from "@/components/Example";
import DataInputPage from "@/pages/DataInputPage"
import MethodsPage from "@/pages/MethodsPage"
import FuzzificationPage from "@/pages/FuzzificationPage"
import FuzzyClusteringPage from "@/pages/FuzzyClusteringPage"
import StatisticsPage from "@/pages/StatisticsPage"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/demoTable',
      name: 'DemoTable',
      component: DemoTable
    },
    {
      path: '/demoCharts',
      name: 'DemoCharts',
      component: DemoCharts
    },
    {
      path: '/example',
      name: 'Example',
      component: Example
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
      path: '/statistics',
      name: 'StatisticsPage',
      component: StatisticsPage
    }
  ]
});
