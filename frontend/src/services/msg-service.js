import axios from "axios";

'use strict'


const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/msg'
    : 'http://localhost:3000/api/msg';

function queryMsgs(userId, userDest) {
    return axios.get(`${BASE_URL}?userId=${userId}&userDest=${userDest}`).then(res => res.data)
}
function queryRooms(userId) {
    return axios.get(`${BASE_URL}?userId=${userId}`).then(res => res.data)
}
function add(msg, user) {
    console.log('add by service')
    return Promise.resolve();
}

function disconnent() {
    return axios.post(`${BASE_URL}/disconnent`)
}


export default {
    queryMsgs,
    queryRooms,
    add,
    disconnent
}