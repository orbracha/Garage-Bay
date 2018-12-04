'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import userService from '../services/user-service.js'
import storageService, { LOGGEDIN_USER_KEY } from '../services/storage-service.js'


Vue.use(Vuex);

export default {
    strict: true,
    state: {
        loggedUser: null
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user;
        },
        toggleWishlist(state, itemId) {
            const id = new ObjectId(itemId)

            const wishlistItemIdx = state.loggedUser.wishList.indexOf(id)


            if (wishlistItemIdx === -1) {
                state.loggedUser.wishList.push(id)
            } else {
                state.loggedUser.wishList.splice(wishlistItemIdx, 1)
            }
            return userService.edit(state.loggedUser).then(user => {
                console.log(user);
            })
        },
        updateUserLocally(state, { user }) {
            state.loggedUser = user;
            userService.updateUser(user);
        }

    },
    actions: {
        toggleWishlist(contex, { itemId }) {
            contex.commit('toggleWishlist', itemId)
            return userService.edit(contex.state.loggedUser).then(user => {
            })
        },
        loadDibs(contex) {
            userService.getById(contex.state.loggedUser._id).then(user => {
                storageService.save(LOGGEDIN_USER_KEY, user)
                contex.commit({ type: 'setLoggedUser', user })
            })
        },
        checkUser({ commit }, { user }) {
            return userService.checkUser(user)
                .then(user => {
                    commit({ type: 'setLoggedUser', user })
                })
        },
        getUserById({ commit }, { userId }) {
            return userService.getById(userId)
                .then(user => { 
                    return user})
        },
        getUserWhishlist({commit}, {userId}){
            return userService.getUserWhishlist(userId)
            .then(user => user)
        },
        addUser({ commit }, { user }) {
            return userService.edit(user)
                .then(user => user)
        },
        getUserByName({ commit }, { userName }) {
            return userService.getByName(userName)
                .then(user => user)
        },
        updateUser({ commit }, { user }) {
            return userService.edit(user).then(user => {
                commit({ type: 'updateUserLocally', user })
            })
        },
      
    },
    getters: {
        getLoggedUser(state) {
            return state.loggedUser;
        }
    },
};
