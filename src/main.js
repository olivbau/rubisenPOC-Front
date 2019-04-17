import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
