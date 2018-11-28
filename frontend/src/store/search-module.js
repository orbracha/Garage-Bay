'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import searchService from '../services/search-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        catagories:[]
    },
    mutations: {
        // setItems(state, { items }) {
        //     state.items = items;
        // },
        setCatagories(state, {catagories}){
            state.catagories=catagories;            
        }
    },
    actions: {
        getAllCatagories({commit}){
           return searchService.getCatagories()
             .then(catagories=>{
                 commit({type: 'setCatagories', catagories})
                 return catagories;
             })
            
        },
        filterItems({commit}, filter){
            console.log('filter in search module:', filter);
            searchService.query(filter)
        }
        // loadItems({ commit }) {
        //     itemService.query().then(items => {
        //         commit({ type: 'setItems', items })
        //         return items;
        //     })
        },
       
    getters: {
        
        getAllCatagories(state){
            return state.catagories;
        }
      
    }
}
