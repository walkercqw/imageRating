<template>
  <div class="login">
    <div class="login-contain">
      <h1>喔图图片打分</h1>
      <div class="login-box">
        <p><span>账号:</span><input type="text" v-model="userName"></p>
        <p><span>密码:</span><input type="password" v-model="pwd"></p>
      </div>
      <div class="login-btn" @click="login">登录</div>
      <div class="login-autoLogin" @click="autoLogin">
        <input type="checkbox" :checked="isAutoLogin" id="checkbox"><span>下次自动登录</span>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import {login,hasToken} from "../service/getData.js"
import tipBox from '../tool/tipBox.js';
export default {
  name: 'login',
  data () {
    return {
      userName:"",
      pwd:"",
      isAutoLogin:true,
    }
  },
  methods:{
    autoLogin(){
      this.isAutoLogin = !this.isAutoLogin;
    },
    login(){
      if(!this.userName || !this.pwd){
        alert('请输入用户名和密码')
        return;
      }
      if(this.isAutoLogin){
        localStorage.setItem("userInfo",JSON.stringify({name:this.userName,pwd:this.pwd}))
      }
      login(this.userName,this.pwd).then(res => {
        if(res.data.status == 200){
          console.log(res)
          tipBox("登陆成功")
          localStorage.setItem("user",JSON.stringify(res.data.data))
          this.$router.push({name:"imageRating"})
        } else {
          tipBox(`登录失败，${res.data.msg}`)
        }
      })
    }
  },
  created(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if(userInfo){
      this.userName = userInfo.name
      this.pwd = userInfo.pwd
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    min-width: 1440px;
    min-height: 100vh;
    box-sizing: border-box;
    background: url('https://sr.alltuu.com/vue-pc/images/register/background.jpg');
    .login-contain{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      box-sizing: border-box;
      background:url("https://sr.alltuu.com/vue-pc/images/register/contentBg.png");
      width: 1040px;
      height: 720px;
      background-size: cover;
      border-radius: 5px;
      h1 {
        color:rgb(53, 124, 252);
        text-align:center;
        margin-top: 100px;
      }
      .login-box{
      display: flex;
      flex-flow: wrap column;
      align-items: center;
      margin-top:70px;
        span{
          color:#fff
        }
        input{
          height: 40px;
          width: 300px;
          font-size: 16px;
          border-radius: 3px;
          border:none;
          padding-left: 5px;
          box-sizing: border-box;
        }
      }
      .login-btn{
        height: 40px;
        width: 300px;
        background: linear-gradient(90deg, rgb(41, 150, 255) 0%, rgb(41, 97, 255) 100%);
        margin: 30px auto 0px;
        transform:translate(19px);
        text-align: center;
        line-height: 40px;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
      }
      .login-autoLogin{
        color: #fff;
        position:relative;
        top:10px;
        left: 37%;
        width: 150px;
        font-size: 14px;
        cursor:pointer;
      }
    }
    
  }
</style>
