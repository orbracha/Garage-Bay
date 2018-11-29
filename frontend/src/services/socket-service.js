'use strict'
import eventBus, { GET_MSG } from '../services/eventBus-service.js'
import ioClient from 'socket.io-client'

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? process.env.NODE_ENV
    : 'http://localhost:3000';

var socket;
var gRoom;
function connectSocket(userId, userDest) {
    socket = ioClient(BASE_URL);
    socket.emit('roomRequested', userId, userDest)
    socket.on('newMsg', function (msg) {
        if (msg.from._id !== userId) eventBus.$emit(GET_MSG, msg)
    });
    socket.on('usersConnected', room => {
        gRoom = room;
        console.log('room is ready', room);
    });
    return Promise.resolve(gRoom)
}

function sendMsg(msg) {
    socket.emit('chat-newMsg', msg, gRoom)
    return gRoom
}
export default {

    connectSocket,
    sendMsg,
}