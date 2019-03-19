import axios from "axios"
import QS from "qs"
let token = JSON.parse(localStorage.getItem("user")).token
axios.defaults.headers.common['token'] = token
axios.defaults.baseURL = 'http://192.168.10.64:3000/api';
//登录验证
export const login = (username,password) => axios.post("/login",{username,password})
//token验证
export const hasToken = () => axios.get("/verify")