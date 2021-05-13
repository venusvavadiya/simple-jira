import Vue, { VueConstructor } from 'vue';
import PLCancelBtn from '../components/pl-cancel-btn.vue';
import PLCardTitle from '../components/pl-card-title.vue';
import PLDoneBtn from '../components/pl-done-btn.vue';
import PLMaxWidth from '../components/pl-max-width.vue';
import PLTextField from '../components/pl-text-field.vue';

class PLComponentPlugin {
  static install(vue: VueConstructor): void {
    vue.component('pl-cancel-btn', PLCancelBtn);
    vue.component('pl-card-title', PLCardTitle);
    vue.component('pl-done-btn', PLDoneBtn);
    vue.component('pl-max-width', PLMaxWidth);
    vue.component('pl-text-field', PLTextField);
  }
}

Vue.use(PLComponentPlugin);
