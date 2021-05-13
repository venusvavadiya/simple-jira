import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import './vue-core/plugins/pl-components';

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
}).$mount('#app');
