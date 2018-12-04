import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import './assets/scss/main.scss';
import VueCarousel from 'vue-carousel';




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
  VueCarousel,
  
  render: h => h(App),
}).$mount('#app');
