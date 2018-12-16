'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import itemService from '../services/item-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        items: [],
        newUrl: ''
    },
    mutations: {
        resetNewUrl(state) {
            state.newUrl = '';           
        },
        setItems(state, { items }) {
            state.items = items;
        },
        editItem(state, { updatedItem }) {
            var items = state.items;
            var itemIdx = items.findIndex(currItem => {
                return currItem._id === updatedItem._id
            });
            if (itemIdx !== -1) {
                return items.splice(itemIdx, 1, updatedItem);
            }
            items.unshift(updatedItem);
        },
        setNewUrl(state, { url }) {
            state.newUrl = url
        }
    },
    actions: {

        removeItem(context, { item }) {

            itemService.remove(item._id, item.sellerId)

                .then(user => {
                    context.commit({ type: 'updateUserLocally', user })
                })

        },

        loadItems({ commit }) {
            itemService.query().then(items => {
                commit({ type: 'setItems', items })
                return items;
            })
        },
        getItemById({ commit }, { itemId }) {
            return itemService.getById(itemId).then(item => {
                return item;
            })
        },
        editItem({ commit }, { item }) {
            return itemService.edit(item)
                .then(updatedItem => {
                    commit({ type: 'editItem', updatedItem })
                    return updatedItem;
                })
        },
        saveImage({ commit }, imageToSave) {
            return itemService.saveImage(imageToSave)
                .then(url => {
                    commit({ type: 'setNewUrl', url })
                })

        },
        addItem(context, { item }) {
            return itemService.addItem(item)
                .then(newItem => {
                    context.dispatch({ type: 'getUserById', userId: newItem.sellerId })
                        .then(user => {
                            context.commit({ type: 'updateUserLocally', user })
                        })
                    return newItem._id
                })
        },

    },
    getters: {
        itemsToDisplay: state => {
            return state.items
        },

        getItems(state) {
            return state.items;
        },
        getImageUrl(state) {
            return state.newUrl
        }
    }
};
