import axios from "axios";

'use strict'


const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/msg'
    : 'http://localhost:3000/api/msg';

function query() {
    return axios.get(`${BASE_URL}`).then(res => res.data)
}
function add(msg) {
    return axios.post(`${BASE_URL}`, msg)
}


export default {
    query,
    add
}