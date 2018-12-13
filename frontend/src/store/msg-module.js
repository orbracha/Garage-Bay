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
        msgs: [],
        rooms: []
    },
    mutations: {
        setMsgs(state, { msgs }) {
            state.msgs = msgs;
        },
        setRooms(state, { rooms }) {
            state.rooms = rooms;
        },
        sendMsg(state, { msg }) {
            socketService.sendMsg(msg)
        },
        addMsg(state, { msg }) {
            state.msgs.push(msg)
        },
        connectSocket(state, { userId, userDest }) {
            this.commit({ type: 'gotMsg' });
            socketService.connectSocket(userId, userDest)
        },
        gotMsg(state) {
            eventBus.$on(GET_MSG, (msg) => {
                this.commit({ type: 'addMsg', msg })
            })
        }
    },
    actions: {
        loadMsgs({ commit }, { userId, userDest }) {
            msgService.queryMsgs(userId, userDest).then(msgs => {
                commit({ type: 'setMsgs', msgs })
            })
        },
        loadRooms({ commit }, { userId }) {
            return msgService.queryRooms(userId).then(rooms => {
                commit({ type: 'setRooms', rooms })
                return rooms;
            })
        },
        sendMsg({ commit }, { msg, user }) {
            msgService.add(msg, user).then(() => {
                commit({ type: 'sendMsg', msg })
                commit({ type: 'addMsg', msg })
            })
        },
        sendDibs({ commit }, { userId, item }) {
            socketService.sendDibs(userId, item);
        },
        sendAns({ commit }, { ans }) {
            socketService.sendAns(ans);
        },
        cancelDibReq({ }, { dib }) {
            socketService.cancelDibReq(dib)
        },
        disconnentChat(context, { user }) {
            return msgService.disconnentChat(user)
        },
        connentChat(context, { user }) {
            return msgService.connentChat(user).then(user => {
                context.commit({ type: 'setLoggedUser', user })
            })
        }

    },
    getters: {
        getMsgs(state) {
            return state.msgs;
        },
        getRooms(state) {
            return state.rooms;
        }
    }
};
