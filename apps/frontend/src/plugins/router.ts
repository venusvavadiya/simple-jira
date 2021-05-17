import Vue from 'vue';
import VueRouter from 'vue-router';
import ProjectRoutes from '../domain-project/routes';

Vue.use(VueRouter);

const routes = [...ProjectRoutes];

export default new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});
