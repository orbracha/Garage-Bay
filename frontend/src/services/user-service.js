


import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api/User'
const BASE_URL = (process.env.NODE_ENV !== 'development')
  ? '/api/user'
  : 'http://localhost:3000/api/user';
export default {
  // getById,
  remove,
  edit,
  checkUser
}

function checkUser(user) {
  return axios.post(`${BASE_URL}`, { user }).then(res => {
    localStorage.setItem('loggedInUser', JSON.stringify(res.data))
    return res.data
  });
}

// function getById(userId) {
//   return axios.get(`${BASE_URL}/${userId}`).then(res => res.data)
// }
function remove(userId) {
  return axios.delete(`${BASE_URL}/${userId}`)
}
function edit(user) {
  if (user._id) {
    return axios.put(`${BASE_URL}`, user).then(res => res.data)
  }
  return axios.post(`${BASE_URL}`, user)
}
