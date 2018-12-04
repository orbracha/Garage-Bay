import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user-module.js'
import itemModule from './item-module.js'
import msgModule from './msg-module.js'
import searchModule from './search-module.js'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: 'true',
  modules: {
    itemModule,
    userModule,
    msgModule,
    searchModule
  },
  state: {
    isMenu: false,


  },
  mutations: {
    toggleMenu(state) {
      state.isMenu = !state.isMenu;
      console.log('state isMenu', state.isMenu);
      
    }

  },
  actions: {
    getLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            let loc = { lng: position.coords.longitude, lat: position.coords.latitude }
            resolve(loc);
          }, reject);
        } else {
          reject("no geolocation in navigator");
        }
      })
    },
  },
  getters:{
    isMenu(state){
      return state.isMenu
    },
    user(state){
      return state.loggedUser
    },
  }
});
