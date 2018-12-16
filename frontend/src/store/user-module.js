'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import userService from '../services/user-service.js'
import storageService, { LOGGEDIN_USER_KEY } from '../services/storage-service.js'


Vue.use(Vuex);

export default {
    strict: true,
    state: {
        loggedUser: null,
        bestSellers:null,
        editUser:null
    },
    mutations: {
        setEditUser(state, {editUser}){
            state.editUser=editUser;
        },
        resetEditedUser(state){
            state.editUser=null;
        },
        setLoggedUser(state, { user }) {
            state.loggedUser = user;
        },
        setBestSellers(state, {users}){
            state.bestSellers = users
        },
        toggleWishlist(state, id) {
            const wishlistItemIdx = state.loggedUser.wishList.indexOf(id)
            if (wishlistItemIdx === -1) {
                state.loggedUser.wishList.push(id)
            } else {
                state.loggedUser.wishList.splice(wishlistItemIdx, 1)
            }
            return userService.edit(state.loggedUser).then(user => {
                
            })
        },
        updateUserLocally(state, { user }) {
            state.loggedUser = user;
            userService.updateUser(user);
        },
        logoutUser(state) {
            state.loggedUser = null
        }

    },
    actions: {
        toggleWishlist(contex, {id}) {
            contex.commit('toggleWishlist', id)
            return userService.edit(contex.state.loggedUser).then(user => {
            })
        },
        loadChange(contex) {
            userService.getById(contex.state.loggedUser._id).then(user => {
                storageService.save(LOGGEDIN_USER_KEY, user)
                contex.commit({ type: 'setLoggedUser', user })
            })
        },
        checkUser(context, { user }) {
            return userService.checkUser(user)
                .then(retUser => {
                    return context.dispatch({ type: 'getLocation' })
                       .then(loc=>{
                           retUser.location=loc;
                           return retUser;
                       })
                       .catch(()=>{
                        let loc={lng: 34.803139, lat: 32.088032}
                        retUser.location=loc;
                        return retUser;
                       })
                })
                .then(user => {
                    context.commit({ type: 'setLoggedUser', user })
                })
        },
        getUserById({ commit }, { userId }) {
            return userService.getById(userId)
                .then(user => {

                    return user
                })
        },
        getUserWishlist({ commit }, { userId }) {
            return userService.getUserWishlist(userId)
                .then(user => user)
        },
        addUser({ commit }, { user }) {
            return userService.edit(user)
                .then(user => user)
        },
        getBestSellers({ commit },) {
            return userService.getUsers()
                .then(users => {
                    commit({type: 'setBestSellers', users})
                    return users
                })
        },
        getUserByName({ commit }, { userName }) {
            return userService.getByName(userName)
                .then(user => user)
        },
        updateUser({ commit }, { user }) {
            return userService.edit(user).then(user => {
                commit({ type: 'updateUserLocally', user })
                return user
            })
        },
        logout({ commit }) {
            return userService.logout()
                .then(() => {
                    storageService.clear(LOGGEDIN_USER_KEY)
                    commit({ type: 'logoutUser' })
                })
        }
    },
    getters: {
        getLoggedUser(state) {
            return state.loggedUser;
        },
       bestSellers(state){
           if(state.bestSellers)
        return state.bestSellers.filter(seller =>{
            return 'header' in seller
        })

       },

        getEditUser(state) {
            return state.editUser;
        }
    },
};
