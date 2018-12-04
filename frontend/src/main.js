import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import './registerServiceWorker';
import './assets/scss/main.scss';
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueMoment, {
  moment,
})



Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA4fRJvLkBs3sem_ym7juIhLPuavgF9I08",

    libraries: "places" // necessary for places input
  }
});


Vue.config.productionTip = false;
Vue.filter('relativeTime', timestamp => {
  return moment(timestamp).fromNow();
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
