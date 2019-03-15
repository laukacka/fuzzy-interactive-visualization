import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import DemoTable from '@/components/DemoTable';
import DemoCharts from '@/components/DemoCharts';
import BarChart from "@/components/charts/BarChart";
import BubbleChart from "@/components/charts/BubbleChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import RadarChart from "@/components/charts/RadarChart";
import Scatter from "@/components/charts/Scatter";

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
    },
    {
      path: '/pieChart',
      name: 'PieChart',
      component: PieChart
    },
    {
      path: '/barChart',
      name: 'BarChart',
      component: BarChart
    },
    {
      path: '/bubbleChart',
      name: 'BubbleChart',
      component: BubbleChart
    },
    {
      path: '/doughnutChart',
      name: 'DoughnutChart',
      component: DoughnutChart
    },
    {
      path: '/lineChart',
      name: 'LineChart ',
      component: LineChart
    },
    {
      path: '/polarAreaChart',
      name: 'PolarAreaChart',
      component: PolarAreaChart
    },{
      path: '/radarChart',
      name: 'RadarChart',
      component: RadarChart
    },{
      path: '/scatter',
      name: 'Scatter',
      component: Scatter
    }
  ]
});
