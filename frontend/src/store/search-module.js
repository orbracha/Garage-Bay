'use strict'
import Vue from 'vue';
import Vuex from 'vuex';
import searchService from '../services/search-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        catagories: [],
        itemsToDisplay: [],
        txt: ''
    },
    mutations: {
        setCatagories(state, { catagories }) {
            state.catagories = catagories;
        },
        setItemsToDisplay(state, { itemsToDisplay }) {
            state.itemsToDisplay = itemsToDisplay
        },
        setFilterTxt(state, { txt }) {
            state.txt = txt;
        }
    },
    actions: {
        getAllCatagories({ commit }) {
            return searchService.getCatagories()
                .then(catagories => {
                    commit({ type: 'setCatagories', catagories })
                    return catagories;
                })

        },
        filterItems({ commit }, filter) {
            return searchService.query(filter)
                .then(itemsToDisplay => {
                    commit({ type: 'setItemsToDisplay', itemsToDisplay })
                    return itemsToDisplay
                })
        }
    },

    getters: {
        getAllCatagories(state) {
            return state.catagories;
        },
        getItemsToDisplay(state) {
            return state.itemsToDisplay;
        },
        getFilterTxt(state) {
            return state.txt;
        }

    }
}
