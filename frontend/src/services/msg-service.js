import axios from "axios";

'use strict'


const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/msg'
    : 'http://localhost:3000/api/msg';

function query(userId, userDest) {
    return axios.get(`${BASE_URL}?userId=${userId}&userDest=${userDest}`).then(res => res.data)
}
function add(msg, user) {
    console.log('add by service')
    return Promise.resolve();
}


export default {
    query,
    add
}