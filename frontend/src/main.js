import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueSweetalert2 from 'vue-sweetalert2';
import * as VueGoogleMaps from "vue2-google-maps"
import VueCarousel from 'vue-carousel';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import './registerServiceWorker';
import './assets/scss/main.scss';
import Element from 'element-ui'
 
Vue.use(Element)


Vue.use(VueSweetalert2);

Vue.use(SuiVue);
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
  return moment(timestamp).format('L');
})
new Vue({
  router,
  store,
  VueCarousel,

  render: h => h(App),
}).$mount('#app');
