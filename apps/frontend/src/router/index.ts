import Vue from 'vue';
import VueRouter from 'vue-router';
import ProjectRoutes from '../domain-project/routes';

Vue.use(VueRouter);

const routes = [...ProjectRoutes];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;
