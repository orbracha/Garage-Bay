'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import userService from '../services/user-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        user:{
            _id:"5bfd7083baca8c22a4bb1b70"
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user;
        }
    },
    actions: {
        getUserById({ commit }, { userId }) {
            // return userService.getById(userId).then(user => {
            //     commit({ type: 'setUser', user })
            //     return user;
            // })
        }
    },
    getters: {
        getUser(state) {
            return state.user; 
        }
    }
};
