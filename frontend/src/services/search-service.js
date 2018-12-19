'use strict'
import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')
  ? '/api/item'
  : 'http://localhost:3000/api/item';
export default {
  getCatagories,
  query
}

function getCatagories() {
  return axios.post(`${BASE_URL}/search`).then(res => res.data);
}
function query({ filter }) {
  if (!filter.byTxt && !filter.byType)
    return axios.get(`${BASE_URL}`)
      .then(res => res.data)
  let queryStr = `?`;
  queryStr += filter.byTxt ? `&text=${filter.byTxt}` : '';
  queryStr += filter.byType ? `&type=${filter.byType}` : '';

  return axios.post(`${BASE_URL}/filter${queryStr}`)
    .then(res => res.data)
}