'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import userService from '../services/user-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        loggedUser: userService.loadFromLocalStorage()
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user;
        },
        toggleWishlist(state, itemId) {
            console.log('item Id', itemId);
            const wishlistItemIdx = state.loggedUser.wishList.indexOf(item => {
                return item === itemId
            })
            if (wishlistItemIdx === -1) {
                state.loggedUser.wishList.push(itemId)
            } else {
                state.loggedUser.wishList.splice(wishlistItemIdx, 1)


            }
        },

    },
    actions: {
        toggleWishlist(contex, { itemId }) {
            contex.commit('toggleWishlist', itemId)
            return userService.edit(contex.state.loggedUser).then(user => {
                console.log(user);
            })
        },
        checkUser({ commit }, { user }) {
            console.log('IN CHECK USER ***************************************************');
            
            return userService.checkUser(user)
             

        },
        getUserById({ commit }, { userId }) {
            return userService.getById(userId)
                .then(user => user)
        }
    },
    getters: {
        getLoggedUser(state) {
            console.log('current user:', state.loggedUser);
            
            return state.loggedUser;
        }
    },
};
