import axios from "axios"
import Qs from "qs"
let token = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).token:''
axios.defaults.baseURL = 'http://192.168.10.64:3000/api';
axios.interceptors.request.use(function (config) {
    config.data = Qs.stringify(config.data)
    if(token){
        config.headers['Authorization'] = "Bearer " + token
    } 
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
//登录验证
export const login = (username,password) => axios.post("/login",{username,password})
//token验证
export const hasToken = () => axios.get("/verify")
//获取图片列表
export const getImageList = (amount) => axios.get(`/img/list?count=${amount}`)
//打分
export const sendScore = (pid,score,isBeforeRetouch,img_number_id) => axios.post('/img/grade',{pid,score,isBeforeRetouch,img_number_id})