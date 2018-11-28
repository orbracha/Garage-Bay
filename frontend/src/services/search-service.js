'use strict'
import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')
  ? '/api/item'
  : 'http://localhost:3000/api';
export default {
  getCatagories,
  query
}

function getCatagories() {
  return axios.get(`${BASE_URL}/search`).then(res => res.data);
}
function query({filter}){
  let queryStr=`?`;
  queryStr += filter.byTxt? `&text=${filter.byTxt}` : '';
  queryStr += filter.byType? `&type=${filter.byType}` : '';

  console.log('filter str:', queryStr);
  return axios.get(`${BASE_URL}/filter/${queryStr}`)
    .then(res => res.data)
  
  
  // return axios.get(`${BASE_URL}/search`).then(res => res.data)
}