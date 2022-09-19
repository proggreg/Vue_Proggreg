import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vue2TouchEvents from 'vue2-touch-events';
import VueGtm from '@gtm-support/vue2-gtm';
import Hotjar from 'vue-hotjar';
import * as dotenv from 'dotenv'

dotenv.config();

Vue.use(VueGtm, {
  id: process.env.GTM,
  defer: false, 
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: process.env.NODE_ENV !== 'production', // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
});

Vue.use (Hotjar, {
  id: process.env.HOTJAR,
  isProduction: process.env.NODE_ENV === 'production'
})

Vue.config.productionTip = false;
Vue.use(Vue2TouchEvents)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");