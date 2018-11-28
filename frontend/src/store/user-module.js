'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import userService from '../services/user-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        loggedUser: null
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user;
        }
    },
    actions: {

        // toggleWishlist({commit} , {itemId}){

        // }
        checkUser({ commit }, { user }) {
            return userService.checkUser(user).then(user => {
                commit({ type: 'setLoggedUser', user })
            })

        }
        // getUserById({ commit }, { userId }) {
        //     return userService.getById(userId).then(user => {
        //         commit({ type: 'setUser', user })
        //         return user;
        //     })
        // }
    },
    getters: {
        getLoggedUser(state) {
            if (!state.loggedUser) return JSON.parse(localStorage.getItem('loggedInUser'))
            return state.loggedUser;
        }
    }
};
