'use strict'
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
        addMsg(state, { msg }) {
            state.msgs.push(msg)
        },
        connectSocket(state, { userId, userDest }) {
            socketService.connectSocket(userId, userDest)
        },
        roomRequested(context, { userId, userDest }) {
            socketService.roomRequested(userId, userDest)
        }

    },
    actions: {
        loadMsgs({ commit }, { userId, userDest }) {
            return msgService.queryMsgs(userId, userDest).then(msgs => {
                commit({ type: 'setMsgs', msgs })
            })
        },
        loadRooms({ commit }, { userId }) {
            return msgService.queryRooms(userId).then(rooms => {
                commit({ type: 'setRooms', rooms })
                return rooms;
            })
        },
        sendMsg({ commit }, { msg, userId }) {
            socketService.sendMsg(msg, userId)
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
        },
        disconnectRoom(context, { userId }) {
            socketService.disconnectRoom(userId)
        },


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
