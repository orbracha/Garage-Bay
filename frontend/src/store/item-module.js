'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import itemService from '../services/item-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        items: [],
        newUrl:''
    },
    mutations: {
        setItems(state, { items }) {
            state.items = items;
        },
        editItem(state, { item }) {
            var items = state.items;
            var itemIdx = items.findIndex(currItem => currItem._id === item._id);
            if (itemIdx) return items.splice(itemIdx, 1, item);
            items.unshift(item);
        },
        setNewUrl(state, {url}){
            state.newUrl=url
        }
    },
    actions: {
        loadItems({ commit }) {
            itemService.query().then(items => {
                console.log('inside loaditems in store', items);
                
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
            return itemService.edit(item).then(item => {
                commit({ type: 'editItem', item });
            })
        },
        saveImage({ commit }, imageToSave) {
           return itemService.saveImage(imageToSave)
            .then(url=>{
                commit({type: 'setNewUrl',url })
            })
          
        },
        addItem({comiit}, {item}){
            // console.log('item in store', item);
            itemService.addItem(item)
        },
      
    },
    getters: {
        itemsToDisplay: state => {
            console.log(state.items)
            return state.items
        },

        getItems(state) {
            return state.items;
        },
        getImageUrl(state){
            return state.newUrl
        }
    }
};
