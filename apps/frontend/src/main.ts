import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import './vue-core/plugins/pl-components';
import { LocalProjectRepository } from './adapters/local.project.repository';

new Vue({
  provide() {
    const projectRepository = new LocalProjectRepository();
    return { projectRepository };
  },

  render: (h) => h(App),
  router,
  vuetify,
}).$mount('#app');
