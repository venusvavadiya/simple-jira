import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import PLCancelBtn from './vue-core/components/pl-cancel-btn.vue';
import PLCardTitle from './vue-core/components/pl-card-title.vue';
import PLDoneBtn from './vue-core/components/pl-done-btn.vue';
import PLMaxWidth from './vue-core/components/pl-max-width.vue';
import PLTextField from './vue-core/components/pl-text-field.vue';

Vue.use(Vuetify);

// PL Components Registration
Vue.component('pl-cancel-btn', PLCancelBtn);
Vue.component('pl-card-title', PLCardTitle);
Vue.component('pl-done-btn', PLDoneBtn);
Vue.component('pl-max-width', PLMaxWidth);
Vue.component('pl-text-field', PLTextField);

new Vue({
  router,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
