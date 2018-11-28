'use strict'
import eventBus, { GET_MSG } from '../services/eventBus-service.js'
import ioClient from 'socket.io-client'

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? process.env.NODE_ENV
    : 'http://localhost:3000';

var socket;

var msgs = [];
function connectSocket() {
    socket = ioClient(BASE_URL);

    socket.on('newMsg', function (msg) {
        eventBus.$emit(GET_MSG, msg)
    });

    // socket.on('typing', () => {
    //     socket.broadcast.emit('typing', { typeUser: true })
    //     typing();
    // })
}

function sendMsg(msg) {
    socket.emit('chat-newMsg', msg)
    return Promise.resolve();
}
export default {

    connectSocket,
    sendMsg,
}