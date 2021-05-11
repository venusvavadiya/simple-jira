import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';

Vue.use(Vuetify);

new Vue({
  router,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
