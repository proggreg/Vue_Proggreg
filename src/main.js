import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LoadScript from 'vue-plugin-load-script';
import store from './store'
import vuetify from './plugins/vuetify';

Vue.use(LoadScript);

Vue.config.keyCodes = {
  "arrow-keys": [37, 38, 39, 40]
};

Vue.config.productionTip = false



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
