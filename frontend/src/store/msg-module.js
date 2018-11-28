'use strict'
import eventBus, { GET_MSG } from '../services/eventBus-service.js'
import Vue from 'vue';
import Vuex from 'vuex';
import msgService from '../services/msg-service.js'
import socketService from '../services/socket-service.js'

Vue.use(Vuex);

export default {
    strict: true,
    state: {
        msgs: []
    },
    mutations: {
        setMsgs(state, { msgs }) {
            state.msgs = msgs;
        },
        sendMsg(state, { msg }) {
            socketService.sendMsg(msg)
        },
        addMsg(state, { msg }) {
            state.msgs.push(msg)
        },
        connectSocket(state) {
            this.commit({ type: 'getMsg' });
            socketService.connectSocket();
        },
        getMsg(state) {
            eventBus.$on(GET_MSG, (msg) => {
                this.commit({ type: 'addMsg', msg })
            })
        }
    },
    actions: {
        loadMsgs({ commit }) {
            return msgService.query().then(msgs => {
                commit({ type: 'setMsgs', msgs })
                return msgs;
            })
        },
        sendMsg({ commit }, { msg }) {
            msgService.add(msg).then(() => {
                commit({ type: 'sendMsg', msg })
            })
        }
    },
    getters: {
        getMsgs(state) {
            return state.msgs;
        }
    }
};
