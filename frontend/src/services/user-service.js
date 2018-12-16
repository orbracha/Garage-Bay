


import axios from 'axios';
import storageService, { LOGGEDIN_USER_KEY } from './storage-service'

const BASE_URL = (process.env.NODE_ENV !== 'development')
  ? '/api/user'
  : 'http://localhost:3000/api/user';
export default {
  getById,
  getByName,
  remove,
  edit,
  checkUser,
  loadFromLocalStorage,
  loadDibs,
  getUserWishlist,
  updateUser,
  logout,
  getUsers
}
function logout() {
  return axios.post(`${BASE_URL}/logout`)
}
function updateUser(user) {
  storageService.save(LOGGEDIN_USER_KEY, user)
}
function checkUser(user) {
  return axios.post(`${BASE_URL}`, { user }).then(res => {
    storageService.save(LOGGEDIN_USER_KEY, res.data.token)
    return res.data.user
  });
}

function loadFromLocalStorage() {
  const userFromLS = storageService.load(LOGGEDIN_USER_KEY);
  return userFromLS ? userFromLS : null;
}
function loadDibs(userId) {
  return axios.get(`${BASE_URL}/dibs/${userId}`).then(res => res.data)
}
function getById(userId) {
  return axios.get(`${BASE_URL}/${userId}`).then(res => res.data[0])
}

function getByName(userName) {
  return axios.post(`${BASE_URL}/sign/user`, { userName }).then(res => res.data)
}

function getUsers() {
  return axios.get(`${BASE_URL}`).then(res => res.data)
}

function getUserWishlist(userId) {
  return axios.get(`${BASE_URL}/wishlist/${userId}`).then(res => res.data[0])
}

function remove(userId) {
  return axios.delete(`${BASE_URL}/${userId}`)
}
function edit(user) {
  if (user._id) {
    storageService.save(LOGGEDIN_USER_KEY, user)
    return axios.put(`${BASE_URL}`, user).then(res => res.data)
  }
  return axios.post(`${BASE_URL}/sign`, user)
}
