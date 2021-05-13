import { RouteConfig } from 'vue-router';
import Index from '../views/index.vue';

export default [
  {
    component: Index,
    name: 'Index',
    path: '/',
  },
] as RouteConfig[];
