import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user-module.js'
import itemModule from './item-module.js'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: 'true',
  modules: {
    itemModule,
    userModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
