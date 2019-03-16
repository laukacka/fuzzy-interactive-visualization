import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import DemoTable from '@/components/DemoTable';
import DemoCharts from '@/components/DemoCharts';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    }
  ]
});
