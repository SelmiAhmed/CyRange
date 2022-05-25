import axios from "axios";
import request from 'api-request'//here we will use the axios package
export function getUsers() {
  return async (dispatch) => {
  try {
  let res = await request.get('users')//send request to retreivie all users from node.js
  if (res) {
  // console.log('actions ', res.data)
  dispatch(StoreUsersData(res.data))
  }
  } catch (e) {
  console.log(e)
  }
  }
  }
let axios = require('axios')
let instance = axios.create({
baseURL: process.env.REACT_APP_API_URL ,
headers: { 'x-access-token': localStorage.getItem('token') }//here we add header to each request
})

/*const API_URL = "http://localhost:3000/api/test/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user");
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}*/
export default instance;
