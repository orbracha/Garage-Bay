import axios from "axios";

'use strict'


const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/msg'
    : 'http://localhost:3000/api/msg';

//get msgs
function queryMsgs(userId, userDest) {
    return axios.get(`${BASE_URL}?userId=${userId}&userDest=${userDest}`).then(res => res.data)
}

//get room
function queryRooms(userId) {
    return axios.get(`${BASE_URL}?userId=${userId}`).then(res => res.data)
}


function disconnentChat(user) {
    return axios.post(`${BASE_URL}/chat/disconnect`, { user }).then(res => res.data[0])
}
function connentChat(user) {
    return axios.post(`${BASE_URL}/chat/connect`, { user }).then(res => res.data[0])
}


export default {
    queryMsgs,
    queryRooms,
    disconnentChat,
    connentChat
}