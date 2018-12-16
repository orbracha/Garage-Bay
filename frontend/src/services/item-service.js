'use strict'
import axios from 'axios';
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
function remove(itemId, sellerId) {
  return axios.delete(`${BASE_URL}/${itemId}/${sellerId}`)
  .then(user=>user.data[0]);
  
  // return updatedUser
}
function edit(item) {
  if (item._id) {
    return axios.put(`${BASE_URL}/edit`, item).then(res =>
      {
        console.log('res.data:', res.data);
      
       return res.data
      }
      )
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