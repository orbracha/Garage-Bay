'use strict'
import axios from 'axios';
import storageService from './storage-service'
// const BASE_URL = 'http://localhost:3000/api/Item'
const BASE_URL = (process.env.NODE_ENV !== 'development')
  ? '/api/item'
  : 'http://localhost:3000/api/item';
export default {
  query,
  getById,
  remove,
  edit,
  saveImage,
  addItem,
  remove
}

function query() {
  return axios.get(`${BASE_URL}`).then(res => res.data);
}

function getById(itemId) {
  return axios.get(`${BASE_URL}/${itemId}`).then(res => res.data)
}
function remove(itemId) {
  return axios.delete(`${BASE_URL}/${itemId}`)
}
function edit(item) {
  if (item._id) {
    return axios.put(`${BASE_URL}`, item).then(res => res.data)
  }
  return axios.post(`${BASE_URL}`, item)
}
function saveImage(img){
return axios.post(`${BASE_URL}/add-image`, img)
.then(res=>res.data)
}
function addItem(item){
  
  return axios.post(`${BASE_URL}/add-item`, item)
  .then(res=>res.data)
}