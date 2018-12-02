


import axios from 'axios';
import storageService, { LOGGEDIN_USER_KEY } from './storage-service'
import { log } from 'util';

// const BASE_URL = 'http://localhost:3000/api/User'
const BASE_URL = (process.env.NODE_ENV !== 'development')
  ? '/api/user'
  : 'http://localhost:3000/api/user';
export default {
  getById,
  remove,
  edit,
  checkUser,
  loadFromLocalStorage
}

function checkUser(user) {
  return axios.post(`${BASE_URL}`, { user }).then(res => {
    // console.log('user in  user servive',user);
    
    storageService.save(LOGGEDIN_USER_KEY, res.data)
    console.log('user returned from server:', res.data)
    return res.data
  });
}

function loadFromLocalStorage() {
  const userFromLS = storageService.load(LOGGEDIN_USER_KEY);
  return userFromLS ? userFromLS : null;
}

function getById(userId) {
  return axios.get(`${BASE_URL}/${userId}`).then(res =>res.data[0])
}
function remove(userId) {
  return axios.delete(`${BASE_URL}/${userId}`)
}
function edit(user) {
  if (user._id) {
    console.log('user to update', user)
    storageService.save(LOGGEDIN_USER_KEY, user)
    return axios.put(`${BASE_URL}`, user).then(res => res.data)
  }
  return axios.post(`${BASE_URL}`, user)
}
