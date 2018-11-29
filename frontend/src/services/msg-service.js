import axios from "axios";

'use strict'


const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/msg'
    : 'http://localhost:3000/api/msg';

function query(user) {
    return axios.get(`${BASE_URL}/${user._id}`).then(res => res.data)
}
function add(msg, user) {
    user.historyChat.push(msg)
    return axios.put(`${BASE_URL}`, user )
}


export default {
    query,
    add
}