import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.keyCodes = {
  "arrow-keys": [37, 38, 39, 40]
};

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
