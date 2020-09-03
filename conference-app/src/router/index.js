import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import temp from '../views/temp.vue';

Vue.use(VueRouter);

const routes = [
  {
    title: 'Conference Converter - Home',
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    title: 'Conference Converter - Build',
    path: '/build',
    name: 'Build',
    component: () => import('@/views/Build.vue'),
  },
  {
    title: 'Conference Converter - temp',
    path: '/temp',
    name: 'temp',
    component: temp,
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  routes,
});

export default router;
