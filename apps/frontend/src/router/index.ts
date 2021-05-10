import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Index from '../views/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    component: Index,
    name: 'Index',
    path: '/',
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;
