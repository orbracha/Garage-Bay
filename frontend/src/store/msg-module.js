'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import msgService from '../services/msg-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        msgs: []
    },
    mutations: {
        setMsgs(state, { msgs }) {
            state.msgs = msgs;
        }
    },
    actions: {
        loadMsgs({ commit }) {
            return msgService.query().then(msgs => {
                commit({ type: 'setMsgs', msgs })
                return msgs;
            })
        },
        getMsgsById({ commit }, msgId) {
            return msgService.getById(msgId).then(msgs => {
                return msgs;
            })
        }
    },
    getters: {
        msgsToDisplay: state => state.msgs,

        getMsgs(state) {
            return state.msgs;
        }
    }
};
