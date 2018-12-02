'use strict'
import eventBus, { GET_MSG, GET_DIBS, GET_ANS, GET_CANCLE } from '../services/eventBus-service.js'
import ioClient from 'socket.io-client'

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? process.env.NODE_ENV
    : 'http://localhost:3000';

var socket;
var gRoom;
function connectSocket(userId, userDest) {

    socket = ioClient(BASE_URL);
    // socket.heartbeatTimeout = 20000;
    if (userDest && userId) socket.emit('roomRequested', userId, userDest)
    socket.on('newMsg', function (msg) {
        if (msg.from._id !== userId) eventBus.$emit(GET_MSG, msg)
    });
    socket.on('got-dibs', function (fromUserId, item) {
        console.log('got dibs from', fromUserId, 'curr user', userId)
        if (userId === item.sellerId) {
            if (userId !== fromUserId) {
                console.log('got dibs from', fromUserId)
                eventBus.$emit(GET_DIBS, item, fromUserId)
            }

        }
    });
    socket.on('got-ans', function (ans) {
        if (userId === ans.dib.from) {
            console.log('got ans about', ans.dib.item.title,ans)
            eventBus.$emit(GET_ANS, ans)
        }
    });
    socket.on('got-cancle-dib', function (dib) {
        if (userId === dib.item.sellerId) {
            console.log('got cancle about', dib.item.title, 'from', dib.from)
            eventBus.$emit(GET_CANCLE, dib)
        }
    });
    socket.on('usersConnected', room => {
        gRoom = room;
        console.log('room is ready', room);
    });
    return Promise.resolve(gRoom)
}

function sendDibs(userId, item) {
    socket.emit('dibs', userId, item)

}
function sendMsg(msg) {
    socket.emit('chat-newMsg', msg, gRoom)
    return gRoom
}
function sendAns(ans) {
    socket.emit('sendAns', ans)
}
function cancelDibReq(dib) {
    socket.emit('cancelDibReq', dib)
}
export default {
    connectSocket,
    sendMsg,
    sendDibs,
    sendAns,
    cancelDibReq
}