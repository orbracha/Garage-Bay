'use strict'
import eventBus, { GET_MSG, DIBS } from '../services/eventBus-service.js'
import ioClient from 'socket.io-client'

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : 'http://localhost:3000';

var socket;
var gRoom;
function connectSocket(userId) {
    socket = ioClient(BASE_URL);
    socket.emit('inline', userId);
    socket.on('newMsg', function (msg) {
        console.log('new msg')
        eventBus.$emit(GET_MSG, msg)
    });
    socket.on('got-dibs', function (fromUserId, item) {
        if (userId === item.sellerId) {
            if (userId !== fromUserId) {
                eventBus.$emit(DIBS)
            }

        }
    });

    socket.on('got-ans', function (ans) {
        if (userId === ans.dib.from) {
            eventBus.$emit(DIBS)
        }
    });
    socket.on('got-cancle-dib', function (dib) {
        if (userId === dib.item.sellerId) {
            eventBus.$emit(DIBS)
        }
    });
    socket.on('usersConnected', room => {
        gRoom = room;
    });
    return Promise.resolve(gRoom)
}

function sendDibs(userId, item) {
    socket.emit('dibs', userId, item)

}
function sendMsg(msg, loggedInId) {
    socket.emit('chat-newMsg', msg, gRoom, loggedInId)
}
function sendAns(ans) {
    socket.emit('sendAns', ans)
}
function cancelDibReq(dib) {
    socket.emit('cancelDibReq', dib)
}

function disconnectRoom(userId) {
    socket.emit('disconnect-room', userId, gRoom)
}

function roomRequested(userId, userDest) {
    socket.emit('roomRequested', userId, userDest)
}
export default {
    connectSocket,
    sendMsg,
    sendDibs,
    sendAns,
    cancelDibReq,
    disconnectRoom,
    roomRequested
}