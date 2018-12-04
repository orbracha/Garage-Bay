import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import './assets/scss/main.scss';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css'



import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA4fRJvLkBs3sem_ym7juIhLPuavgF9I08",
    
    libraries: "places" // necessary for places input
  }
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  SuiVue,
  render: h => h(App),
}).$mount('#app');
