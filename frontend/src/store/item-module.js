'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import itemService from '../services/item-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        items:[]
    },
    mutations: {
        setItems(state, { items }) {
            state.items = items;
        }
    },
    actions: {
        loadItems({ commit }) {
            itemService.query().then(items => {
                commit({ type: 'setItems', items })       
                return items;
            })
        },
        getItemById({ commit },  {itemId} ) {
            return itemService.getById(itemId).then(item => {              
                return item;
            })
        }
    },
    getters: {
        itemsToDisplay: state => state.items,

        getItems(state) {
            return state.items;
        }
    }
};
