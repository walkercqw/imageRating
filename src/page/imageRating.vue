<template>
  <div class="imageRating">
    <div class="imageRating-title">
      <div class="imageRating-title-nickname">
        <p>昵称:{{user.nickname}}</p>
      </div>
      <a href="#" @click="goOut">退出登录</a>
    </div>
    <div v-for="(item,i) in dataList" :key="i" class="imageRating-imagebox" v-show="i == showCount">
      <img :src="item.src" alt="" @click="openBigImage(i)">
    </div>
    <div class="imageRating-imagebox" v-show="showCount == -1">

    </div>
    <div class="imageRating-footer">
      <p>分值可选</p>
      <ul>
        <li v-for="(item,i) in countList" :key="item" 
        @mousedown="getit(i)"
        @mouseup="unget(i)" 
        :class="{'active':i == get}">
          {{item}}
        </li>
      </ul>
    </div>
    <big-image 
        v-if="isOpenBigImage"
        :isOpenBigImage="isOpenBigImage"
        :data="dataList"
        @closeBigImage="closeBigImage" 
        :index="bigImageIndex"
        >
    </big-image>
  </div>
</template>
<script>
import bigImage from "./bigimage.vue"
import bigImgParse from "../tool/bigImg.js"
import tipBox from "../tool/tipBox.js"
import { getImageList,sendScore,hasToken } from "../service/getData.js"
export default {
  data() {
    return {
      countList:[0,1,2,3,4,5,6,7,8,9],
      oneShow:true,
      twoShow:false,
      get:-1,
      count:0,
      firstSend:1,
      dataList: [],
      showCount:-1,
      user:'',
      isOpenBigImage: false,
      bigImgData:[],
      bigImageIndex:0
    };
  },
  created(){
    this.user = JSON.parse(localStorage.getItem("user"))
    if(!this.user){
      tipBox("请重新登录")
      this.$router.push({name:"login"})
    }
    getImageList(10).then(res => {
      if(res.status == 200){
        this.showCount = 0
        this.dataList = res.data.data
        if(this.dataList == ''){
          tipBox("已经任务完成，已经没有图片啦")
          this.showCount = -1
        }
      } else {
        tipBox("请求错误")
      }
    })
  },
  mounted(){
    document.onkeyup = () => {
      this.firstSend = 1
      this.get = -1
    }
    document.onkeydown =  (event) => {
      if(this.isOpenBigImage){
        return;
      } 
      if(this.dataList == ""){
        tipBox('任务完成，已经没有图片啦')
        this.showCount = -1
        return;
      }
        var e = event || window.event;
        switch(e.keyCode){
          case 48:
          case 96:
            this.count = 0
            if(this.firstSend++ == 1){
              this.send()
            }
            this.bigImageIndex = 1
            break;
          case 49:
          case 97:
            this.count = 1
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 50:
          case 98:
            this.count = 2
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 51:
          case 99:
            this.count = 3
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 52:
          case 100:
            this.count = 4
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 53:
          case 101:
            this.count = 5
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 54:
          case 102: 
            this.count = 6
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 55:
          case 103: 
            this.count = 7
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 56:
          case 104:
            this.count = 8
            if(this.firstSend++ == 1){
              this.send()
            }
            break;
          case 57:
          case 105:
            this.count = 9
            if(this.firstSend++ == 1){
              this.send()
            }
            break; 
        }
    }; 
  },
  methods:{
    goOut(){
      this.$router.push({name:'login'})
    },
    openBigImage(i){
      this.isOpenBigImage = true
      this.bigImageIndex = i
    },
    closeBigImage() {
      this.isOpenBigImage = false;
    },
    getit(i){
      this.get = i
      this.count = i
    },
    unget(){
      if(this.dataList == ""){
        tipBox("任务完成，已经没有图片啦")
        this.showCount = -1
        return;
      }
      this.send()
      this.get = -1
    },
    send(){
      sendScore(this.dataList[this.showCount].id,this.count).then(res => {
        if(res.status == 200){
          tipBox(`打分成功，当前分数为${this.count}`)
          if(this.showCount == this.dataList.length - 1){
            getImageList(10).then(res => {
              if(res.status == 200){
                this.dataList = res.data.data
              } else {
                tipBox("请求错误")
              }
            })
            this.showCount = 0;
          } else {
            this.showCount++
          }
          this.get = this.count
        } else {
          tipBox("打分失败")
        } 
      })
    }
  },
  components:{
    bigImage
  }
  
}
</script>
<style lang="less" scoped>
  .imageRating{
    box-sizing: border-box;
    overflow: hidden;
    background-color: #000;
    &-title{
      height: 5vh;
      background-color: rgba(0,0,0,.5);
      margin-bottom: 10px;
      a{
          color: #fff;
          float: right;
          margin: -30px 300px;
          &:hover{
            color: skyblue;
          }
        }
        
      &-nickname{
        margin-left: 200px;
        p{
          margin:0;
          line-height: 50px;
          color: #fff;
          font-size: 18px;
        }
      }
    }
    &-imagebox{
      box-sizing: border-box;
      height: 80vh;
      width: 100vw;
      position:relative;
      img{
        margin: auto;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
      }
    }
    &-footer{
      box-sizing: border-box;
      height: 13.9vh;
      color:#fff;
      p{
        text-align: center;
        margin: 0 200px;
      }
      ul{
        list-style: none;
        width: 30%;
        margin: 0 auto;
        display:flex;
        justify-content: space-around;
        margin-top: 20px;
        .active{
            background-color: #1e76e2;
          }
        li{
          width: 50px;
          height: 50px;
          border:1px solid #fff;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          
        }
      }
    }
  }
</style>