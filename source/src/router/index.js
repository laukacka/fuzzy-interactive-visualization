import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import DemoTable from '@/components/DemoTable';
import DemoCharts from '@/components/DemoCharts';
import Example from "@/components/Example";
import DataInputPage from "@/pages/DataInputPage"

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
    }
  ]
});
