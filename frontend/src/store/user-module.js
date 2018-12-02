'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import userService from '../services/user-service.js'
import storageService, { LOGGEDIN_USER_KEY } from '../services/storage-service.js'


Vue.use(Vuex);

export default {
    strict: true,
    state: {
        loggedUser: userService.loadFromLocalStorage()
    },
    mutations: {
        setLoggedUser(state, user) {
            state.loggedUser = user;
        },
        toggleWishlist(state, itemId) {
            const id = new ObjectId(itemId)

            const wishlistItemIdx = state.loggedUser.wishList.indexOf(id)
            console.log('wish list item index', wishlistItemIdx);


            if (wishlistItemIdx === -1) {
                state.loggedUser.wishList.push(id)
            } else {
                state.loggedUser.wishList.splice(wishlistItemIdx, 1)
            }
            return userService.edit(state.loggedUser).then(user => {
                console.log(user);
                
            })
        },
        updateUser(state, { user }) {
            state.loggedUser = user;
        }

    },
    actions: {
        toggleWishlist(contex, { itemId }) {
            contex.commit('toggleWishlist', itemId)
            return userService.edit(contex.state.loggedUser).then(user => {
            })
        },
        checkUser({ commit }, { user }) {
            return userService.checkUser(user)
                .then(user => {
                    commit('setLoggedUser', user)
                })

        },
        getUserById({ commit }, { userId }) {
            console.log('inside user module', userId);
            return userService.getById(userId)
                .then(user => {
                    console.log('user in stor', user);
                    
                    return user})
        },
        getUserWhishlist({commit}, {userId}){
            console.log('inside user module, getting wishlis', userId);
            return userService.getUserWhishlist(userId)
            .then(user => user)
        },
        
        updateUser({ commit }, { user }) {
            return userService.edit(user).then(user => {
                // storageService.save(LOGGEDIN_USER_KEY, user)
                commit({ type: 'updateUser', user })
                // return Promise.resolve()
            })
        },
    },
    getters: {
        getLoggedUser(state) {
            console.log('current user:', state.loggedUser);
            return state.loggedUser;
        }
    },
};
